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
        $transferred_stocks_count = $this->transferProducts->sum('total_quantity');
        $sold_count = $this->invoiceItems->sum('total_sold');
        $miscellaneous_count = $this->invoiceItems->sum('total_miscellaneous');
        $remaining_stocks = $this->stocks_count - ($transferred_stocks_count + $sold_count + $miscellaneous_count);

        return [
            'id' => $this->id,
            'inventory_id' => $this->inventory_id,
            'product' => new ProductResource($this->product),
            'supplier_id' => new SupplierResource($this->supplier),
            'capital_price' => round($this->capital_price, 2),
            'stocks_count' => $this->stocks_count,
            'damage_count' => $this->damage_count,
            'total_count' => $this->total_count,
            'unit' => $this->unit,
            'transferred_stocks_count' => $transferred_stocks_count,
            'sold_count' => $sold_count,
            'miscellaneous_count' => $miscellaneous_count,
            'remaining_stocks_count' => $remaining_stocks,
            'status' => $this->status
        ];
    }
}
