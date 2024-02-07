<?php

namespace App\Http\Controllers;

use App\Models\InvoiceTax;
use App\Http\Resources\InvoiceTaxCollection;
use App\Http\Resources\InvoiceTaxResource;
use Illuminate\Http\Request;

class InvoiceTaxController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //return all invoice taxes in json
        return new InvoiceTaxCollection(InvoiceTax::all());
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
        $invoiceTax = InvoiceTax::create($request->all());

        return new InvoiceTaxResource($invoiceTax);
    }

    /**
     * Display the specified resource.
     */
    public function show(InvoiceTax $invoiceTax)
    {
        return new InvoiceTaxResource($invoiceTax);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(InvoiceTax $invoiceTax)
    {
        return new InvoiceTaxResource($invoiceTax);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, InvoiceTax $invoiceTax)
    {
        $invoiceTax->update($request->all());

        return new InvoiceTaxResource($invoiceTax);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InvoiceTax $invoiceTax)
    {
        $invoiceTax->delete();

        return new InvoiceTaxCollection(InvoiceTax::all());
    }

    /**
     * Display a listing of the filtered collection.
     */
    public function searchFilterAndSort(Request $request)
    {

        //returns a filtered list of taxes of a particular invoice
        $query = InvoiceTax::where('invoice_id', $request->invoice_id);

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

        return new InvoiceTaxCollection($query->get());
    }
}
