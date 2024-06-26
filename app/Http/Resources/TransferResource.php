<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class TransferResource extends JsonResource
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
            'created_by' => new UserResource($this->createdBy),
            'source' => new WarehouseResource($this->sourceWarehouse),
            'destination' => new WarehouseResource($this->destinationWarehouse),
            'transfer_schedule' => Carbon::parse($this->transfer_schedule)->format('Y-m-d'),
            'approval_status' => $this->approval_status,
            'approved_by' => new UserResource($this->approvedBy),
            'transfer_status' => $this->transfer_status,
            'date_received' => $this->date_received,
            'received_by' => new UserResource($this->receivedBy),
            'notes' => $this->notes,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'transfer_products' => new TransferProductCollection($this->transferProducts)
        ];
    }
}
