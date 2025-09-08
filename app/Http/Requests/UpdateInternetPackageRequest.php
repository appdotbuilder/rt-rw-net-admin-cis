<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInternetPackageRequest extends FormRequest
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
            'name' => 'required|string|max:255|unique:internet_packages,name,' . $this->route('internet_package')->id,
            'price' => 'required|numeric|min:0',
            'speed' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
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
            'name.required' => 'Package name is required.',
            'name.unique' => 'This package name is already used by another package.',
            'price.required' => 'Price is required.',
            'price.numeric' => 'Price must be a valid number.',
            'speed.required' => 'Speed is required.',
        ];
    }
}