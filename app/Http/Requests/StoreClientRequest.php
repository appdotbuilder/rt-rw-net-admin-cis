<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreClientRequest extends FormRequest
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
            'address' => 'required|string',
            'phone' => 'required|string|max:20',
            'internet_package_id' => 'required|exists:internet_packages,id',
            'installation_date' => 'required|date',
            'status' => 'required|in:active,inactive',
            'notes' => 'nullable|string',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Client name is required.',
            'address.required' => 'Address is required.',
            'phone.required' => 'Phone number is required.',
            'internet_package_id.required' => 'Please select an internet package.',
            'internet_package_id.exists' => 'Selected internet package is invalid.',
            'installation_date.required' => 'Installation date is required.',
            'installation_date.date' => 'Please provide a valid installation date.',
            'status.required' => 'Status is required.',
            'status.in' => 'Status must be either active or inactive.',
        ];
    }
}