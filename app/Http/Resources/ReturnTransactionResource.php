<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReturnTransactionResource extends JsonResource
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
            'invoice' => new InvoiceResource($this->invoice),
            'issued_by' => new UserResource($this->issuedBy),
            'refundable_amount' => $this->refundable_amount,
            'voucher' => new VoucherResource($this->voucher),
            'refund_status' => $this->refund_status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'return_transaction_items' => new ReturnTransactionCollection($this->whenLoaded('returnTransactionItems')),
        ];
    }
}
