<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceDiscountResource extends JsonResource
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
            'invoice_id' => $this->invoice_id,
            'item' => $this->item,
            'voucher' => new VoucherResource($this->voucher),
            'amount' => $this->amount,
            'discount_approval_status' => $this->discount_approval_status,
            'approved_by' => new UserResource($this->approvedBy),
            'notes' => $this->notes
        ];
    }
}
