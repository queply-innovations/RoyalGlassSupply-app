<?php

namespace App\Http\Controllers;

use App\Models\InvoiceItem;
use App\Http\Resources\InvoiceItemCollection;
use App\Http\Resources\InvoiceItemResource;
use Illuminate\Http\Request;

class InvoiceItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //return all invoice items in json
        return new InvoiceItemCollection(InvoiceItem::all());
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
        $invoiceItem = InvoiceItem::create($request->all());

        return new InvoiceItemResource($invoiceItem);
    }

    /**
     * Display the specified resource.
     */
    public function show(InvoiceItem $invoiceItem)
    {
        return new InvoiceItemResource($invoiceItem);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(InvoiceItem $invoiceItem)
    {
        return new InvoiceItemResource($invoiceItem);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, InvoiceItem $invoiceItem)
    {
        $invoiceItem->update($request->all());

        return new InvoiceItemResource($invoiceItem);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InvoiceItem $invoiceItem)
    {
        $invoiceItem->delete();

        return new InvoiceItemCollection(InvoiceItem::all());
    }
}
