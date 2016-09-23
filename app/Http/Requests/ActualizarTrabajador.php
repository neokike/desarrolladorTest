<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ActualizarTrabajador extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $parametros = array_flatten($this->route()->parameters());

        return [
            'nombre'   => 'required,max:100',
            'apellido' => 'required,max:100',
            'email'    => 'required,email',
            'cargo_id' => 'required',
            'cedula'   => 'required|unique:trabajadores,cedula,' . $parametros[0] . ',cedula'
        ];
    }
}
