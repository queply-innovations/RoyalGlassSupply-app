<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceItemResource extends JsonResource
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
            'product' => new ProductResource($this->product),
            'product_price_id' => $this->product_price_id,
            'quantity' => $this->quantity,
            'unit' => $this->unit,
            'price' => $this->price,
            'source_inventory' => $this->source_inventory
        ];
    }
}
