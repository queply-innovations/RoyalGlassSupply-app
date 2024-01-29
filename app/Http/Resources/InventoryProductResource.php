<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InventoryProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            "inventory_id" => 1,
            "product" => new ProductResource($this->product),
            "supplier_id" => new SupplierResource($this->supplier),
            "capital_price" => $this->capital_price,
            "stocks_count" => $this->stocks_count,
            "damage_count" => $this->damage_count,
            "total_count" => $this->total_count,
            "unit" => $this->unit
        ];
    }
}
