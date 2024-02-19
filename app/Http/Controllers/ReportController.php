<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Http\Resources\ReportCollection;
use App\Http\Resources\ReportResource;
use Illuminate\Http\Request;

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
        $result = InvoiceItem::groupBy('product_id')->get();
    }
}
