<?php

namespace App\Http\Controllers;

use App\Models\InvoiceTax;
use App\Http\Resources\InvoiceTaxCollection;
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
        return InvoiceTax::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(InvoiceTax $invoiceTax)
    {
        return $invoiceTax;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(InvoiceTax $invoiceTax)
    {
        return $invoiceTax;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, InvoiceTax $invoiceTax)
    {
        $invoiceTax->update($request->all());

        return $invoiceTax;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InvoiceTax $invoiceTax)
    {
        $invoiceTax->delete();

        return new InvoiceTaxCollection(InvoiceTax::all());
    }
}
