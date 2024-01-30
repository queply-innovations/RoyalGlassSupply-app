<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Http\Resources\InvoiceCollection;
use App\Http\Resources\InvoiceResource;
use Illuminate\Http\Request;

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
        $invoice = Invoice::create($request->all());

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
}
