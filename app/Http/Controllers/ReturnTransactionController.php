<?php

namespace App\Http\Controllers;

use App\Models\ReturnTransaction;
use App\Http\Resources\ReturnTransactionCollection;
use App\Http\Resources\ReturnTransactionResource;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\ReturnTransactionItem;
use App\Models\Voucher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ReturnTransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //return all return transactions in json
        return new ReturnTransactionCollection(ReturnTransaction::all());
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
            
            $returnTransaction = $this->storeReturnTransaction($request);

            DB::commit();

            return new ReturnTransactionResource($returnTransaction);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendError($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ReturnTransaction $returnTransaction)
    {
        return new ReturnTransactionResource($returnTransaction);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ReturnTransaction $returnTransaction)
    {
        return new ReturnTransactionResource($returnTransaction);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ReturnTransaction $returnTransaction)
    {
        try {
            if(!$request->has('refund_status')) throw new \Exception('No return transaction status found.');
            if($returnTransaction->refund_status != 'pending') throw new \Exception('Return Transaction already updated.');

            switch($request->refund_status) {
                case 'approve':
                    $update = $this->approveReturnTransaction($returnTransaction);
                    $message = 'Return Transaction approved successfully.';
                break;
                case 'deny':
                    $update = $this->denyReturnTransaction($returnTransaction);
                    $message = 'Return Transaction denied.';
                break;
                default: throw new \Exception('Invalid transaction status');
            }

            return $this->sendSuccess($message);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }

        return new ReturnTransactionResource($returnTransaction);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ReturnTransaction $returnTransaction)
    {
        $returnTransaction->delete();

        return new ReturnTransactionCollection(ReturnTransaction::all());
    }

    /**
     * Display the specified resource.
     */
    public function showItems($id)
    {
        return new ReturnTransactionResource(ReturnTransaction::with('returnTransactionItems')->findOrFail($id));
    }

    /**
     * Display a listing of the filtered collection.
     */
    public function searchFilterAndSort(Request $request)
    {
        $query = ReturnTransaction::query();

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

        return new ReturnTransactionCollection($query->get());
    }

    private function storeReturnTransaction($request) {
        $invoice = Invoice::findOrFail($request->invoice_id);

        $store = ReturnTransaction::create([
            ...$request->except('return_items'),
            'refund_status' => 'pending'
        ]);

        foreach($request->return_items as $item) {
            ReturnTransactionItem::create([
                ...$item,
                'return_transaction_id' => $store->id,
                'price' => $item['price']['price']
            ]);
        }

        return $store;
    }

    private function approveReturnTransaction($returnTransaction) {
        $items = $returnTransaction->returnTransactionItems;

        foreach($items as $item) {
            $invoiceItem = InvoiceItem::findOrFail($item['invoice_item_id']);
            $invoiceItem->inventoryProduct->update([
                'purchased_stocks' => $invoiceItem->inventoryProduct->purchased_stocks - $item['quantity']
            ]);
        }

        if((bool) !$returnTransaction->is_cash_refund) {
            $voucher = Voucher::create([
                'code' => str_replace('IVC', 'V', $returnTransaction->invoice->code),
                'customer_id' => $returnTransaction->invoice->customer_id,
                'return_transaction_id' => $returnTransaction->id,
                'discounted_price' => $returnTransaction->refundable_amount,
                'generated_by' => Auth::id()
            ]);

            $returnTransaction->update([
                'voucher_id' => $voucher->id
            ]);
        }

        $returnTransaction->update([
            'refund_status' => 'done'
        ]);
    }

    private function denyReturnTransaction($returnTransaction) {
        $returnTransaction->update([
            'refund_status' => 'denied'
        ]);
    }
}
