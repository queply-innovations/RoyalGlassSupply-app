<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReturnTransactionItemResource extends JsonResource
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
            'return_id' => $this->return_id,
            'invoice_item' => new InvoiceItemResource($this->invoiceItem),
            'quantity' => $this->quantity,
            'unit' => $this->unit,
            'price' => $this->price,
            'reason' => $this->reason
        ];
    }
}
