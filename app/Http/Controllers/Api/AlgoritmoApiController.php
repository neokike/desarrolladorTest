<?php
namespace App\Http\Controllers\Api;

use App\Arbol\Arbol;
use App\Arbol\Exceptions\ArbolValidationException;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AlgoritmoApiController extends Controller
{
    public function generar(Request $request)
    {
        $data = $request->all();

        try {
            $arbol = new Arbol($data);
            $htmlData = $arbol->parse()->render();
        } catch (ArbolValidationException $e) {
            return $this->respondWithErrorArray(['mensaje' => $e->getMessage()], 'error');
        }

        return $this->respondWithArray(['html' => $htmlData], 'data');
    }

}