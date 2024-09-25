<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $balancePayment = $this->invoices->where('payment_method', 'balance_payment')->sum('paid_amount') - $this->invoices->where('payment_method', 'balance_payment')->sum('change_amount');
        $sales = $this->invoices->whereNotIn('payment_method', ['balance_payment', 'purchase_order'])->where('is_paid', true)->sum('total_amount_due');
        $totalSales = $balancePayment + $sales;

        return [
            'id' => $this->id,
            'firstname' => $this->firstname,
            'lastname' => $this->lastname,
            'address' => $this->address,
            'contact_no' => $this->contact_no,
            'total_credit' => $this->vouchers->sum('discounted_price'),
            'total_balance' => $this->invoices->sum('balance_amount'),
            'total_sales' => round($totalSales, 2),
        ];
    }
}
