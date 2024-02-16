<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OperationExpenseResource extends JsonResource
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
            'title' => $this->title,
            'date_of_operation' => $this->date_of_operation,
            'amount' => $this->amount,
            'notes' => $this->title,
            'created_by' => new UserResource($this->createdBy),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
