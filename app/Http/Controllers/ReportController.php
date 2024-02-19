<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Http\Resources\ReportCollection;
use App\Http\Resources\ReportResource;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

class ReportController extends Controller
{
    public function sales(Request $request)
    {

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
        $result = InvoiceItem::selectRaw('invoice_items.product_id, sum(invoice_items.quantity * product_prices.stocks_quantity) as sold_count')
                            ->leftJoin('product_prices', function($join) {
                                $join->on('invoice_items.product_price_id', '=', 'product_prices.id');
                            })
                            ->whereHas('invoice', function (Builder $query) {
                                $query->where('type', 'payment');
                            })
                            ->groupBy('product_id')
                            ->orderBy('sold_count', 'desc')
                            ->take(10)
                            ->get();           
                            
        return new ReportCollection($result);
    }
}
