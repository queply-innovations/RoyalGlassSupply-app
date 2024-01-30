<?php

namespace App\Http\Controllers;

use App\Models\Voucher;
use App\Http\Resources\VoucherCollection;
use Illuminate\Http\Request;

class VoucherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //return all vouchers in json
        return new VoucherCollection(Voucher::all());
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
        return Voucher::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(Voucher $voucher)
    {
        return $voucher;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Voucher $voucher)
    {
        return $voucher;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Voucher $voucher)
    {
        $voucher->update($request->all());

        return $voucher;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Voucher $voucher)
    {
        $voucher->delete();

        return new VoucherCollection(Voucher::all());
    }
}
