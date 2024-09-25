<?php

namespace App\Http\Controllers;

use App\Models\InventoryProduct;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Http\Resources\ReportCollection;
use App\Http\Resources\ReportResource;
use App\Models\Customer;
use App\Models\OperationExpense;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

class ReportController extends Controller
{
    public function dashboard(Request $request) {
        $request->validate([
            'date_from' => 'required|date',
            'date_to' => 'required|date'
        ]);
        $request->merge([
            'overall_capital' => true
        ]);

        $salesData = $this->getSalesReport($request);
        $customerData = $this->getCustomerReport($request);

        $data = [
            ...$salesData,
            'date_from' => $request->date_from,
            'date_to' => $request->date_to,
            'new_customers' => $customerData['new_customers'],
            'returning_customers' => $customerData['returning_customers']
        ];

        return $this->sendResponse($data, 'Reports retrieved successfully.');
    }

    public function analytics(Request $request) {
        $request->validate([
            'year' => 'required|integer|digits:4'
        ]);

        $analyticsData = $this->getAnalyticsReport($request);

        return $this->sendResponse($analyticsData, 'Analytics Report retrieved successfully.');
    }

    public function sales(Request $request)
    {
        //filters include warehouse, type (daily, weekly, monthly, custom)

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
            elseif($request->type=="weekly"){
                $result = Invoice::select(
                    DB::raw("DATE_FORMAT(created_at, 'Week %u of %Y') as formatted_date"),
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
            elseif($request->type=="weekly"){
                $result = Invoice::select(
                    DB::raw("DATE_FORMAT(created_at, 'Week %u of %Y') as formatted_date"),
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

    private function getSalesReport($request) {
        $invoices = Invoice::with(['invoiceItems.inventoryProductWithTrashed'])
            ->where('type', 'payment')
            ->where('payment_method', '!=', 'balance_payment')
            ->where('is_paid', true)
            ->where('balance_amount', '<=', 0)
            ->whereBetween('created_at', [
                Carbon::parse($request->date_from)->startOfDay(),
                Carbon::parse($request->date_to)->endOfDay()
            ])
            ->when($request->has('warehouse') && $request->warehouse, function($query) use($request) {
                return $query->where('warehouse_id', $request->warehouse);
            })
            ->get();

        $purchasOrders = Invoice::where('type', 'payment')
            ->where('payment_method', 'purchase_order')
            ->where('is_paid', false)
            ->where('balance_amount', '>', 0)
            ->whereBetween('created_at', [
                Carbon::parse($request->date_from)->startOfDay(),
                Carbon::parse($request->date_to)->endOfDay()
            ])
            ->when($request->has('warehouse') && $request->warehouse, function($query) use($request) {
                return $query->where('warehouse_id', $request->warehouse);
            })
            ->sum('balance_amount');

        $overallPurchasOrders = Invoice::where('type', 'payment')
            ->where('payment_method', 'purchase_order')
            ->where('is_paid', false)
            ->where('balance_amount', '>', 0)
            ->when($request->has('warehouse') && $request->warehouse, function($query) use($request) {
                return $query->where('warehouse_id', $request->warehouse);
            })
            ->sum('balance_amount');

        $expenses = OperationExpense::whereBetween('created_at', [
                Carbon::parse($request->date_from)->startOfDay(),
                Carbon::parse($request->date_to)->endOfDay()
            ])->sum('amount');

        if($request->has('overall_capital') && $request->overall_capital) {
            $inventoryProduct = InventoryProduct::withTrashed()->get(['capital_price', 'stocks_count', 'purchased_stocks']);
            $totalCapital = collect($inventoryProduct)->map(function($item) {
                return $item->capital_price * ($item->stocks_count - $item->purchased_stocks);
            })->toArray();
        }

        $invoiceData = [];

        foreach($invoices as $invoice) {
            $capitalPrices = collect($invoice->invoiceItems)->map(function($item) {
                $returnedItems = collect($item->returnTransactionItems)->map(function($retItem) {
                    return $retItem->quantity;
                })->toArray();
                
                return $item->inventoryProductWithTrashed->capital_price * ($item->quantity - array_sum($returnedItems));
            });

            $returnTransaction = $invoice->returnTransaction->refundable_amount ?? 0;

            $invoiceData[] = [
                'total_sales' => $invoice->total_amount_due - $returnTransaction,
                'total_capital_price' => array_sum($capitalPrices->toArray())
            ];
        }

        $sales = array_sum(array_column($invoiceData, 'total_sales'));
        $capital = array_sum(array_column($invoiceData, 'total_capital_price'));
        $profit = $sales - ( $capital + $expenses );

        return [
            'total_sales' => $sales,
            'total_capital' => $capital,
            'total_expenses' => $expenses,
            'total_profit' => $profit,
            'total_collectibles' => $purchasOrders,
            'total_overall_collectibles' => $overallPurchasOrders,
            'total_overall_capital' => isset($totalCapital) ? array_sum($totalCapital) : 0
        ];
    }

    private function getCustomerReport($request) {
        $dateFrom = Carbon::parse($request->date_from)->format('Y-m-d');
        $dateTo = Carbon::parse($request->date_to)->format('Y-m-d');
        $customers = Customer::with('invoices')
            ->whereHas('invoices')
            ->get();

        $newCustomer = 0;
        $returningCustomer = 0;

        foreach($customers as $customer) {
            $firstInvoice = $customer->invoices[0];
            $lastInvoice = $customer->invoices[count($customer->invoices) - 1];

            $firstCustomerPurchasedData = Carbon::parse($firstInvoice['created_at'])->format('Y-m-d');
            $lastCustomerPurchasedData = Carbon::parse($lastInvoice['created_at'])->format('Y-m-d');

            if($dateFrom <= $firstCustomerPurchasedData && $dateTo >= $lastCustomerPurchasedData) {
                $newCustomer++;
            } else if($dateFrom <= $lastCustomerPurchasedData && $dateTo >= $lastCustomerPurchasedData) {
                $returningCustomer++;
            } else {}
        }

        return [
            'new_customers' => $newCustomer,
            'returning_customers' => $returningCustomer
        ];
    }

    private function getAnalyticsReport($request) {
        $startOfYear = $request->year.'-01-01';
        $endOfYear = $request->year.'-12-31';

        $data = [];

        $startMonth = Carbon::parse($startOfYear)->format('Y-m-d');
        $endMonth = Carbon::parse($endOfYear)->format('Y-m-d');
        $monthRange = CarbonPeriod::create($startMonth, '1 month', $endMonth);

        foreach ($monthRange as $month) {
            $salesRequest = new Request();
            $salesRequest->merge([
                'date_from' => Carbon::parse($month)->startOfMonth(),
                'date_to' => Carbon::parse($month)->endOfMonth()
            ]);

            if($request->has('warehouse') && $request->warehouse) {
                $salesRequest->merge([
                    'warehouse' => $request->warehouse
                ]);
            } 

            $salesReport = $this->getSalesReport($salesRequest);

            $data[] = [
                'Month' => Carbon::parse($month)->format('F'),
                'date_from' =>  Carbon::parse($month)->startOfMonth()->format('Y-m-d'),
                'date_to' => Carbon::parse($month)->endOfMonth()->format('Y-m-d'),
                'gross_income' => $salesReport['total_sales'],
                'capital' => $salesReport['total_capital'],
                'expenses' => $salesReport['total_expenses'],
                'net_profit' => $salesReport['total_profit'],
                'collectibles' => $salesReport['total_collectibles']
            ];
        }

        return $data;
    }
}
