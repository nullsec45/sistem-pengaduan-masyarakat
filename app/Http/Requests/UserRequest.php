<?php

namespace App\Http\Requests;

use App\Enums\RoleEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;
use App\Models\User;
use Illuminate\Validation\Rule;


class UserRequest extends FormRequest
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
        $userId = $this->route()->parameter('id');
        $checkRoute = $this->route()->getName();

        $rules = [
            'name' => 'required|string|max:255',
            'username' => ['required', 'string', 'max:255', Rule::unique(User::class)->ignore($userId)],
            'phone_number' => ['required', 'numeric', 'digits_between:10,15', Rule::unique(User::class)->ignore($userId)],
            'email' =>  ['required', 'email', 'lowercase', 'max:255', Rule::unique(User::class)->ignore($userId)],
            'role' => [
                'required',
                Rule::enum(RoleEnum::class)
            ],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'password_confirmation' => ['required', Rules\Password::defaults()],
        ];

        if ($checkRoute === "dashboard.users.update") {
            unset($rules['password']);
            unset($rules['password_confirmation']);
        }

        return  $rules;
    }
}
