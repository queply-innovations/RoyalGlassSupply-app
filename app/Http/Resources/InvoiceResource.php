<?php

namespace App\Http\Resources;

use App\Models\InvoiceItem;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'code' => $this->code,
            'customer' => new CustomerResource($this->customer),
            'warehouse' => new WarehouseResource($this->warehouse),
            'issued_by' => new UserResource($this->issuedBy),
            'type' => $this->type,
            'payment_method' => $this->payment_method,
            'reference_no' => $this->reference_no,
            'subtotal' => $this->subtotal,
            'total_tax' => 0, // $this->total_tax,
            'total_discount' => $this->total_discount,
            'delivery_charge' => $this->delivery_charge,
            'total_amount_due' => $this->total_amount_due,
            'paid_amount' => $this->paid_amount,
            'change_amount' => $this->change_amount,
            'balance_amount' => $this->balance_amount,
            'is_paid' => $this->is_paid,
            'or_no' => $this->or_no,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'invoice_items' => new InvoiceItemCollection($this->whenLoaded('invoiceItems')),
            'invoice_discounts' => new InvoiceDiscountCollection($this->whenLoaded('invoiceDiscounts')),
            'invoice_taxes' => new InvoiceTaxCollection($this->whenLoaded('invoiceTaxes')),
            'return_transactions' => new ReturnTransactionCollection($this->whenLoaded('returnTransactions'))
        ];
    }
}
