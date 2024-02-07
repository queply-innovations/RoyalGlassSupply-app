<?php

namespace App\Http\Controllers;

use App\Models\InvoiceDiscount;
use App\Http\Resources\InvoiceDiscountCollection;
use App\Http\Resources\InvoiceDiscountResource;
use Illuminate\Http\Request;

class InvoiceDiscountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //return all invoice discounts in json
        return new InvoiceDiscountCollection(InvoiceDiscount::all());
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
        $invoiceDiscount = InvoiceDiscount::create($request->all());

        return new InvoiceDiscountResource($invoiceDiscount);
    }

    /**
     * Display the specified resource.
     */
    public function show(InvoiceDiscount $invoiceDiscount)
    {
        return new InvoiceDiscountResource($invoiceDiscount);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(InvoiceDiscount $invoiceDiscount)
    {
        return new InvoiceDiscountResource($invoiceDiscount);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, InvoiceDiscount $invoiceDiscount)
    {
        $invoiceDiscount->update($request->all());

        return new InvoiceDiscountResource($invoiceDiscount);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InvoiceDiscount $invoiceDiscount)
    {
        $invoiceDiscount->delete();

        return new InvoiceDiscountCollection(InvoiceDiscount::all());
    }

    /**
     * Display a listing of the filtered collection.
     */
    public function searchFilterAndSort(Request $request)
    {

        //returns a filtered list of discounts of a particular invoice
        $query = InvoiceDiscount::where('invoice_id', $request->invoice_id);

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

        return new InvoiceDiscountCollection($query->get());
    }
}
