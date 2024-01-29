<?php

namespace App\Http\Controllers;

use App\Models\InvoiceDiscount;
use App\Http\Resources\InvoiceDiscountCollection;
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
        return InvoiceDiscount::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(InvoiceDiscount $invoiceDiscount)
    {
        return $invoiceDiscount;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(InvoiceDiscount $invoiceDiscount)
    {
        return $invoiceDiscount;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, InvoiceDiscount $invoiceDiscount)
    {
        $invoiceDiscount->update($request->all());

        return $invoiceDiscount;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InvoiceDiscount $invoiceDiscount)
    {
        $invoiceDiscount->delete();

        return new InvoiceDiscountCollection(InvoiceDiscount::all());
    }
}