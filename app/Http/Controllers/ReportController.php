<?php

namespace App\Http\Controllers;

use App\Models\InventoryProduct;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Http\Resources\ReportCollection;
use App\Http\Resources\ReportResource;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class ReportController extends Controller
{
    public function sales(Request $request)
    {
        //filters include warehouse, type (daily, monthly, custom)

        if($request->warehouse!="all"){
            if($request->type=="daily"){
                $result = Invoice::select(
                    DB::raw("DATE_FORMAT(created_at, '%m-%d-%Y') as formatted_date"),
                    DB::raw("sum(total_amount_due) as total_sales")
                )
                ->where('type', 'payment')
                ->where('warehouse_id', $request->warehouse)
                ->whereMonth('created_at', Carbon::now()->month)
                ->whereYear('created_at', Carbon::now()->year)
                ->groupBy('formatted_date')
                ->get();
            }
            elseif($request->type=="monthly"){
                $result = Invoice::select(
                    DB::raw("DATE_FORMAT(created_at, '%m-%Y') as formatted_date"),
                    DB::raw("sum(total_amount_due) as total_sales")
                )
                ->where('type', 'payment')
                ->where('warehouse_id', $request->warehouse)
                ->whereYear('created_at', Carbon::now()->year)
                ->groupBy('formatted_date')
                ->get();
            }
            else{
                $result = Invoice::select(
                    DB::raw("DATE_FORMAT(created_at, '%m-%d-%Y') as formatted_date"),
                    DB::raw("sum(total_amount_due) as total_sales")
                )
                ->where('type', 'payment')
                ->where('warehouse_id', $request->warehouse)
                ->whereBetween('created_at', [$request->date_from.' 00:00:00', $request->date_to.' 23:59:59'])
                ->groupBy('formatted_date')
                ->get();
            }
        }
        else{
            if($request->type=="daily"){
                $result = Invoice::select(
                    DB::raw("DATE_FORMAT(created_at, '%m-%d-%Y') as formatted_date"),
                    DB::raw("sum(total_amount_due) as total_sales")
                )
                ->where('type', 'payment')
                ->whereMonth('created_at', Carbon::now()->month)
                ->whereYear('created_at', Carbon::now()->year)
                ->groupBy('formatted_date')
                ->get();
            }
            elseif($request->type=="monthly"){
                $result = Invoice::select(
                    DB::raw("DATE_FORMAT(created_at, '%m-%Y') as formatted_date"),
                    DB::raw("sum(total_amount_due) as total_sales")
                )
                ->where('type', 'payment')
                ->whereYear('created_at', Carbon::now()->year)
                ->groupBy('formatted_date')
                ->get();
            }
            else{
                $result = Invoice::select(
                    DB::raw("DATE_FORMAT(created_at, '%m-%d-%Y') as formatted_date"),
                    DB::raw("sum(total_amount_due) as total_sales")
                )
                ->where('type', 'payment')
                ->whereBetween('created_at', [$request->date_from.' 00:00:00', $request->date_to.' 23:59:59'])
                ->groupBy('formatted_date')
                ->get();
            }
        }

        return new ReportCollection($result);

    }

    public function topPayingCustomers(Request $request)
    {
        $result = Invoice::selectRaw('customer_id, sum(total_amount_due) as total_purchased')
                            ->where('type', 'payment')
                            ->groupBy('customer_id')
                            ->orderBy('total_purchased', 'desc')
                            ->take(20)
                            ->get();

        return new ReportCollection($result);
    }

    public function mostBoughtProducts(Request $request)
    {
        $result = InvoiceItem::selectRaw('invoice_items.product_id, sum(invoice_items.quantity * product_prices.stocks_quantity) as sold_count, product_prices.stocks_unit')
                            ->leftJoin('product_prices', function($join) {
                                $join->on('invoice_items.product_price_id', '=', 'product_prices.id');
                            })
                            ->whereHas('invoice', function (Builder $query) {
                                $query->where('type', 'payment');
                            })
                            ->groupBy('invoice_items.product_id')
                            ->groupBy('product_prices.stocks_unit')
                            ->orderBy('sold_count', 'desc')
                            ->take(10)
                            ->get();
                            
        return new ReportCollection($result);
    }

    public function inventoryLevel (Request $request)
    {
        $result = array();

        //warehouse is required
        $query = InventoryProduct::whereHas('inventory', function (Builder $query) use ($request) {
                                        $query->where('warehouse_id', $request->warehouse);
                                    })
                                    ->get();

        foreach($query as $q){
            $remaining_stocks = $q->stocks_count - ($q->transferProducts->sum('total_quantity') + $q->invoiceItems->sum('total_stocks_quantity'));
            $percentage = ($remaining_stocks / $q->total_count) * 100;
            if($percentage <= 20){
                $result[$q->inventory->code][$q->product->name] = $percentage > 10 ? "Running Low" : ($percentage > 0 ? "Almost Out" : "Out of Stock");
            }
        }

        return new ReportCollection($result);
    }

    public function totalInventory (Request $request)
    {
        $result = array();

        //warehouse is required
        $query = InventoryProduct::whereHas('inventory', function (Builder $query) use ($request) {
                                        $query->where('warehouse_id', $request->warehouse);
                                    })
                                    ->get();

        foreach($query as $q){

            $transferred = $q->transferProducts->sum('total_quantity');
            $sold = $q->invoiceItems->sum('total_sold');
            $miscellaneous = $q->invoiceItems->sum('total_miscellaneous');
            $remaining_stocks = $q->stocks_count - ($transferred + $sold + $miscellaneous);

            $result[$q->inventory->code][$q->product->name]['total_stocks_received'] = $q->total_count.$q->unit;
            $result[$q->inventory->code][$q->product->name]['good_stocks'] = $q->stocks_count.$q->unit;
            $result[$q->inventory->code][$q->product->name]['damages'] = $q->damage_count.$q->unit;
            $result[$q->inventory->code][$q->product->name]['transferred'] = $transferred.$q->unit;
            $result[$q->inventory->code][$q->product->name]['sold'] = $sold.$q->unit;
            $result[$q->inventory->code][$q->product->name]['miscellaneous'] = $miscellaneous.$q->unit;
            $result[$q->inventory->code][$q->product->name]['remaining_retail'] = $remaining_stocks.$q->unit;
            $result[$q->inventory->code][$q->product->name]['remaining_bundles'] = intval($remaining_stocks / $q->quantity_per_bundle).$q->bundles_unit." (".$q->quantity_per_bundle.$q->unit." per ".$q->bundles_unit.")";
        }

        return new ReportCollection($result);
    }
}
