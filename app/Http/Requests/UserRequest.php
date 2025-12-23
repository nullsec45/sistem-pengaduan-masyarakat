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
        $testEnum = \App\Enums\RoleEnum::tryFrom($this->role);
        // dd([
        //     'Input dari Frontend' => $this->role,
        //     'Tipe Data Input' => gettype($this->role),
        //     'Apakah Enum Mengenali?' => $testEnum,
        //     'Semua Cases Enum' => \App\Enums\RoleEnum::cases()
        // ]);
        return [
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255',
            'phone_number' => 'required|numeric|digits_between:10,15',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'role' => [
                'required',
                Rule::enum(RoleEnum::class)
            ],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'password_confirmation' => ['required', Rules\Password::defaults()],
        ];
    }
}