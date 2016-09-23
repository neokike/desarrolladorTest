<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ActualizarTrabajador;
use App\Http\Requests\GuardarTrabajador;
use App\Trabajador;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Yajra\Datatables\Facades\Datatables;

class TrabajadoresApiController extends Controller
{

    public function index()
    {
        return Datatables::of(Trabajador::with('cargo')->select('trabajadores.*'))
            ->make(true);
    }

    public function store(GuardarTrabajador $request)
    {
        $datos = $request->all();
        $trabajador = Trabajador::create($datos);

        return $this->respondWithArray(['success' => 'El trabajador fue creado exitosamente'], 'data');
    }

    public function show($id)
    {
        try {
            $trabajador = Trabajador::find($id);
            return $this->respondWithArray($trabajador, 'data');
        } catch (ModelNotFoundException $e) {
            return $this->respondWithErrorArray(['mensaje' => 'El trabajador no existe'], 'error');
        }

    }

    public function update(ActualizarTrabajador $request, $id)
    {
        $datos = $request->all();
        try {
            $trabajador = Trabajador::find($id)->update($datos);
        } catch (ModelNotFoundException $e) {
            return $this->respondWithErrorArray(['mensaje' => 'El trabajador no existe'], 'error');
        }
        return $this->respondWithArray(['success' => 'El trabajador fue actualizado exitosamente'], 'data');
    }

    public function destroy($id)
    {
        $ids = explode(',', $id);
        $errores = collect();
        foreach ($ids as $id) {
            try {
                $trabajador = Trabajador::find($id)->delete();
            } catch (ModelNotFoundException $e) {
                $errores->push($id);
            }
        }

        if ($errores->count()) {
            return $this->respondWithErrorArray(['mensaje' => 'Ocurrio un problema, uno o más de los trabajadores especificados no existen'], 'error');
        }

        return $this->respondWithArray(['success' => 'El/Los trabajador(es) fue(ron) Eliminado(s) satisfactoriamente'], 'data');

    }


}