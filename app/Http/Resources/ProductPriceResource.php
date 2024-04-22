<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductPriceResource extends JsonResource
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
            'product' => new ProductResource($this->product),
            'inventory_product' => new InventoryProductResource($this->inventoryProduct),
            'type' => $this->type,
            'unit' => $this->unit,
            'stocks_quantity' => $this->stocks_quantity,
            'stocks_unit' => $this->stocks_unit,
            'capital_price' => $this->capital_price,
            'markup_price' => $this->markup_price,
            'tax_amount' => $this->tax_amount,
            'cost' => $this->cost,
            'on_sale' => $this->on_sale,
            'sale_discount' => $this->sale_discount,
            'price' => $this->price,
            'warehouse' => new WarehouseResource($this->warehouse),
            'created_by' => new UserResource($this->createdBy),
            'approval_status' => $this->approval_status,
            'approved_by' => new UserResource($this->approvedBy),
            'active_status' => $this->active_status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
