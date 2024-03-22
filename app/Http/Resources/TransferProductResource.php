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
            'capital_price' => $this->capital_price,
            'bundles_count' => $this->bundles_count,
            'bundles_unit' => $this->bundles_unit,
            'quantity_per_bundle' => $this->quantity_per_bundle,
            'total_quantity' => $this->total_quantity,
            'unit' => $this->unit,
            'source_inventory' => $this->source_inventory
        ];
    }
}
