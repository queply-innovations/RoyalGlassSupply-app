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
use Illuminate\Support\Facades\DB;

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
        try {
            DB::beginTransaction();

            if($request->payment_method == 'balance_payment') {
                $invoice = $this->invoiceBalancePayment($request);
            } else {
                $invoice = $this->storeInvoice($request);
            }
            
            DB::commit();
            return new InvoiceResource($invoice);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendError($e->getMessage());
        }
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
        $query = Invoice::query()->with(['invoiceItems.inventoryProduct']);

        if(!empty($request->search)){
            foreach($request->search as $search_key => $search_value){
                $query->where($search_key, 'like', '%'.$search_value.'%');
            }
        }
        
        if(!empty($request->filter)){
            foreach($request->filter as $filter_key => $filter_value) {
                if($filter_key == 'created_at') {
                    $query->where(DB::raw("DATE_FORMAT(created_at, '%Y-%m-%d')"), $filter_value);
                } else {
                    $query->where($filter_key, $filter_value);
                }
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

    public function storeInvoice($request) {
        $invoice_items = $request->invoice_items;
        $invoice = Invoice::create($request->except(['invoice_items', 'is_paid', 'balance_amount']));
        $invoice->update([
            'code' => 'IVC'.str_pad($request->warehouse_id, 2, 0, STR_PAD_LEFT).'-'.Carbon::now()->format('y').'-'.str_pad($invoice->id, 6, 0, STR_PAD_LEFT),
            // 'reference_no' => $request->warehouse_id.Carbon::now()->format('mdY').$invoice->id,
            'or_no' => Carbon::now()->format('mdY').$invoice->id.Auth::id(),
        ]);

        if($invoice->payment_method == 'purchase_order') {
            $balance = $invoice->total_amount_due - $invoice->paid_amount;
            $invoice->update([
                'balance_amount' => $balance > 0 ? $balance : 0,
                'is_paid' => $balance <= 0 
            ]);
        }

        foreach($invoice_items as $invoice_item){
            $inventoryProduct =  InventoryProduct::where('product_id', $invoice_item["product_id"])
                ->where('product_price_id', $invoice_item['product_price_id'])
                ->first();

            $createInvoiceItem = InvoiceItem::create([
                ...$invoice_item,
                'invoice_id' => $invoice->id,
                'unit' => 'pcs',
                'source_inventory' => $inventoryProduct->id
            ]);

            $inventoryProduct->update([
                'purchased_stocks' => $inventoryProduct->purchased_stocks + $createInvoiceItem->quantity
            ]);
        }

        return $invoice;
    }

    private function invoiceBalancePayment($request) {
        $invoices = Invoice::where('customer_id', $request->customer_id)
            ->where('payment_method', 'purchase_order')
            ->where('is_paid', false)
            ->orWhere('balance_amount', '>', 0)
            ->get();

        if($invoices->count() == 0) {
            throw new \Exception('No Purchase orders found.');
        }

        $payableAmount = $request->paid_amount;

        foreach($invoices as $invoice) {
            if($payableAmount <= 0) {
                break;
            }
            
            $balance = $invoice->balance_amount;
            if($payableAmount >= $balance) {
                $payableAmount = $payableAmount - $balance;

                $invoice->update([
                    'balance_amount' => 0,
                    'change_amount' => 0,
                    'is_paid' => true
                ]);
            } else {
                $balanceDeduction = $balance - $payableAmount;

                $invoice->update([
                    'balance_amount' => $balanceDeduction,
                    'change_amount' => 0,
                    'is_paid' => false
                ]);

                $payableAmount = 0;
            }
        }
    
        $store = Invoice::create($request->except(['invoice_items', 'is_paid', 'balance_amount']));
        $store->update([
            'code' => 'IVC'.str_pad($request->warehouse_id, 2, 0, STR_PAD_LEFT).'-'.Carbon::now()->format('y').'-'.str_pad($store->id, 6, 0, STR_PAD_LEFT),
            'or_no' => Carbon::now()->format('mdY').$store->id.Auth::id(),
        ]);

        return $store;
    }
}
