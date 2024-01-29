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
        return [
            'id' => $this->id,
            'inventory_id' => $this->inventory_id,
            'product' => new ProductResource($this->product),
            'supplier_id' => new SupplierResource($this->supplier),
            'capital_price' => $this->capital_price,
            'stocks_count' => $this->stocks_count,
            'damage_count' => $this->damage_count,
            'total_count' => $this->total_count,
            'unit' => $this->unit,
            'transferred_count' => $this->transferProducts->sum('quantity'),
            'sold_count' => $this->invoiceItems->sum('quantity'),
            'remaining_stocks_count' => $this->stocks_count - ($this->transferProducts->sum('quantity') + $this->invoiceItems->sum('quantity'))
        ];
    }
}
