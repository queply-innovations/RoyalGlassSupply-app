<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InventoryResource extends JsonResource
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
            'code' => $this->code,
            'warehouse' => new WarehouseResource($this->warehouse),
            'created_by' => new UserResource($this->createdBy),
            'date_received' => $this->date_received,
            'type' => $this->type,
            'transfer_id' => $this->transfer_id,
            'notes' => $this->notes,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'inventory_products' => new InventoryProductCollection($this->whenLoaded('inventoryProducts'))
        ];
    }
}
