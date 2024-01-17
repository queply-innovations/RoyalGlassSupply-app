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
        return InvoiceTaxCollection::collection(InvoiceTax::all());
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(InvoiceTax $invoiceTax)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(InvoiceTax $invoiceTax)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, InvoiceTax $invoiceTax)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InvoiceTax $invoiceTax)
    {
        //
    }
}
