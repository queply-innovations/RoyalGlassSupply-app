<?php

namespace App\Http\Resources;

use App\Models\InventoryProduct;
use App\Models\ProductPrice;
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
            'product_price' => $this->product_price,
            'quantity' => $this->quantity,
            'unit' => $this->unit,
            'item_discount' => $this->item_discount,
            'discount_approval_status' => $this->discount_approval_status,
            'approved_by' => new UserResource($this->approvedBy),
            'total_price' => $this->total_price,
            'source_inventory' => $this->source_inventory,
            'inventory_product' => new InventoryProductResource($this->whenLoaded('inventoryProduct'))
        ];
    }
}
