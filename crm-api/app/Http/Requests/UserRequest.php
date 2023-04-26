<?php

namespace App\Http\Requests;

use App\Http\Requests\FormRequest;

class UserRequest extends FormRequest
{
    private $createRules = [
        'user.password' => 'required|string',
        'profile.birthday' => 'required|date',
        'user.companie' => 'required|integer',
    ];
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
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        $rules = [
            'user.name' => 'required|string',
            'user.email' => 'required|string|email',
            'profile.address' => 'required|string',
            'profile.phone' => 'required|string|min:10',
        ];

        if($this->isMethod('POST'))
            $rules += $this->createRules;

        return $rules;
    }
}
