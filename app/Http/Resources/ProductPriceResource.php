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
            'type' => $this->type,
            'quantity' => $this->quantity,
            'unit' => $this->unit,
            'capital_price' => $this->capital_price,
            'markup_price' => $this->markup_price,
            'retail_price' => $this->retail_price,
            'on_sale' => $this->on_sale,
            'sale_price' => $this->sale_price,
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
