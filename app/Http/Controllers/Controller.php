<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function sendResponse(array $response, string $message = 'Retrieved successfully') {
        return response()->json([
            'success' => true,
            'data' => $response,
            'message' => $message
        ], 200);
    }

    public function sendSuccess(string $message) {
        return response()->json([
            'success' => true,
            'message' => $message
        ], 200);
    }

    public function sendError(string $error, int $code = 422) {
        return response()->json([
            'success' => false,
            'message' => $error
        ], $code);
    }
}
