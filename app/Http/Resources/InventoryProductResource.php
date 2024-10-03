<?php

namespace App\Http\Resources;

use App\Models\ProductPrice;
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
        // $transferred_stocks_count = $this->transferProducts->sum('total_quantity');
        $sold_count = $this->invoiceItems->sum('quantity');
        // $miscellaneous_count = $this->invoiceItems->sum('total_miscellaneous');
        $remaining_stocks = $this->approved_stocks - $this->purchased_stocks;
        // $remaining_stocks = $this->stocks_count - ($transferred_stocks_count + $sold_count);
        $product = new ProductResource($this->product);
        $unapprovedStocks = $this->stocks_count - $this->approved_stocks;

        return [
            'id' => $this->id,
            'inventory_id' => $this->inventory_id,
            'product' => $product,
            'product_price' => $this->productPrice,
            'supplier_id' => new SupplierResource($this->supplier),
            'capital_price' => round($this->capital_price, 2),
            'stocks_count' => $this->stocks_count,
            'approved_stocks' => $this->approved_stocks,
            'remaining_unapproved_stocks' => $unapprovedStocks,
            'damage_count' => $this->damage_count,
            'total_count' => $this->total_count,
            'unit' => $this->unit,
            // 'transferred_stocks_count' => 0,
            'sold_count' => $sold_count,
            'miscellaneous_count' => 0,
            'remaining_stocks_count' => $remaining_stocks > 0 ? $remaining_stocks : 0,
            'status' => $remaining_stocks > 0 ? $this->status : 0,
            'inventory' => new InventoryResource($this->inventory)
        ];
    }
}
