<?php

namespace App\Http\Resources;

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
            'customer' => new CustomerResource($this->customer),
            'warehouse' => new WarehouseResource($this->warehouse),
            'issued_by' => new UserResource($this->issuedBy),
            'payment_method' => $this->payment_method,
            'reference_no' => $this->transfer_id,
            'total_tax' => $this->transfer_id,
            'total_discount' => $this->transfer_id,
            'total_amount_due' => $this->transfer_id,
            'paid_amount' => $this->transfer_id,
            'change_amount' => $this->transfer_id,
            'or_no' => $this->transfer_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'invoice_items' => new InvoiceItemCollection($this->whenLoaded('invoiceItems')),
            'invoice_discounts' => new InvoiceDiscountCollection($this->whenLoaded('invoiceDiscounts')),
            'invoice_taxes' => new InvoiceTaxCollection($this->whenLoaded('invoiceTaxes')),
            'return_transactions' => new ReturnTransactionCollection($this->whenLoaded('returnTransactions'))
        ];
    }
}
