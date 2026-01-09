<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReportRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone_number' => 'required|string|max:20',
            'identity_type' => 'required|string|in:KTP,SIM',
            'identity_number' => 'required|string|max:20',
            'pob' => 'required|string|max:100',
            'dob' => 'required|date',
            'address' => 'required|string|max:500',
            'title' => 'required|string|max:255',
            'description' => 'required|string|min:10',
            'category_id' => 'required|exists:categories,id',
            'evidence' => 'required|file|mimes:jpg,jpeg,png,pdf,doc,docx|max:2048',
        ];
    }
}
