<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransferProductResource extends JsonResource
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
            'transfer_id' => $this->transfer_id,
            'product' => new ProductResource($this->product),
            'quantity' => $this->quantity,
            'unit' => $this->unit,
            'source_inventory' => $this->source_inventory
        ];
    }
}
