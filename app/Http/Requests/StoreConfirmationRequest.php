<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreConfirmationRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'task_id' => 'required|exists:tasks,id',
            'description' => 'required|string',
            'file' => 'required|file|max:10240', // 10MB max
        ];
    }
}