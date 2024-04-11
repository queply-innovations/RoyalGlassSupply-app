<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Http\Resources\InvoiceCollection;
use App\Http\Resources\InvoiceResource;
use App\Models\InventoryProduct;
use App\Models\InvoiceItem;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //return all invoices in json
        return new InvoiceCollection(Invoice::all());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $invoice_items = $request->invoice_items;
        $invoice = Invoice::create($request->except(['invoice_items', 'reference_no']));
        $invoice->update([
            'code' => 'IVC-'.$request->warehouse_id.Carbon::now()->format('Y').$invoice->id,
            'reference_no' => $request->warehouse_id.Carbon::now()->format('mdY').$invoice->id,
            'or_no' => Carbon::now()->format('mdY').$invoice->id.Auth::id(),
        ]);

        foreach($invoice_items as $index =>$invoice_item){
            $invoice_items[$index]["invoice_id"] = $invoice->id;
            $invoice_items[$index]["unit"] = 'pcs';
            $invoice_items[$index]["source_inventory"] = InventoryProduct::find($invoice_items[$index]["product_id"])->id;
        }
        //return response()->json($invoice_items);
        $invoice_items = InvoiceItem::insert($invoice_items);
        
        return new InvoiceResource($invoice);
    }

    /**
     * Display the specified resource.
     */
    public function show(Invoice $invoice)
    {
        return new InvoiceResource($invoice);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Invoice $invoice)
    {
        return new InvoiceResource($invoice);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Invoice $invoice)
    {
        $invoice->update($request->all());

        return new InvoiceResource($invoice);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invoice $invoice)
    {
        $invoice->delete();

        return new InvoiceCollection(Invoice::all());
    }

    /**
     * Display the specified resource.
     */
    public function showItems($id)
    {
        return new InvoiceResource(Invoice::with(['invoiceItems', 'invoiceDiscounts', 'invoiceTaxes'])->findOrFail($id));
    }

    /**
     * Display a listing of the filtered collection.
     */
    public function searchFilterAndSort(Request $request)
    {
        $query = Invoice::whereNotNull('id');

        if(!empty($request->search)){
            foreach($request->search as $search_key => $search_value){
                $query->where($search_key, 'like', '%'.$search_value.'%');
            }
        }
        
        if(!empty($request->filter)){
            foreach($request->filter as $filter_key => $filter_value){
                $query->where($filter_key, $filter_value);
            }
        }

        if(!empty($request->date_range)){
            foreach($request->date_range as $date_range_key => $date_range_value){
                $query->whereBetween($date_range_key, [$date_range_value['from'].' 00:00:00', $date_range_value['to'].' 23:59:59']);
            }
        }

        if(!empty($request->sort)){
            foreach($request->sort as $sort_key => $sort_value){
                $query->orderBy($sort_key, $sort_value);
            }
        }

        return new InvoiceCollection($query->get());
    }

    /**
     * Search code
     */
    public function searchCode(Request $request) 
    {
        $query = Invoice::with('invoiceItems')->where('code', $request->search)->first();

        if(!$query) {
            return response()->json([ 'message' => 'Code not found. Please try again.' ], 422);
        }

        return new InvoiceResource($query);
    }
}
