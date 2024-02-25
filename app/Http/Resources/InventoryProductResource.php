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
        //TO BE RESOLVED
        //$transferred_bundles_count = $this->transferProducts->sum('bundles_count');
        $transferred_stocks_count = $this->transferProducts->sum('total_quantity');
        $sold_count = $this->invoiceItems->sum('quantity');

        return [
            'id' => $this->id,
            'inventory_id' => $this->inventory_id,
            'product' => new ProductResource($this->product),
            'supplier_id' => new SupplierResource($this->supplier),
            'capital_price' => $this->capital_price,
            'bundles_count' => $this->bundles_count,
            'bundles_unit' => $this->bundles_unit,
            'quantity_per_bundle' => $this->quantity_per_bundle,
            'stocks_count' => $this->stocks_count,
            'damage_count' => $this->damage_count,
            'total_count' => $this->total_count,
            'unit' => $this->unit,
            'transferred_count' => $transferred_count,
            'sold_count' => $sold_count,
            'remaining_stocks_count' => $this->stocks_count - ($transferred_stocks_count + $sold_count)
        ];
    }
}
