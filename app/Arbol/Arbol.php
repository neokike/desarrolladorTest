<?php
namespace App\Arbol;

use App\Arbol\Exceptions\ArbolValidationException;

class Arbol
{
    protected $data;
    protected $parsedData;

    public function __construct(Array $arregloPlano = [])
    {
        $this->data = collect($arregloPlano);
    }

    public function parse()
    {
        $this->parsedData = $this->parseArbol($this->data);
        return $this;
    }

    private function parseArbol($data, $raiz = null)
    {
        $dataOrdenada = collect();
        foreach ($data as $index => $elemento) {
            if(!array_key_exists('padreid',$elemento) || !array_key_exists('id',$elemento) || !array_key_exists('nombre',$elemento)){
                throw new ArbolValidationException('El formato de uno de los elementos es incorrecto, recuerde que debe tener definido el padreid, el id y el nombre');
            }
            #se encontro un hijo directo
            if ($elemento['padreid'] === $raiz) {
                # se elimina el item, ya no se necesta nuevamente
                unset($data[$index]);
                # se guarda el item y se busca a sus hijos recursivamente
                $dataOrdenada->push([
                    'nombre' => $elemento['nombre'],
                    'hijos'  => $this->parseArbol($data, $index)
                ]);
            }
        }

        return $dataOrdenada->count() ? $dataOrdenada : null;
    }

    public function render($parsedData = null)
    {
        if (!$parsedData && $this->parsedData->isEmpty()) {
            return 'Debe definir la data del arbol a renderizar';
        }

        $parsedData = $parsedData ?: $this->parsedData;
        return $this->generarListaHtml($parsedData);
    }

    private function generarListaHtml($parsedData)
    {
        $out = '';
        if ($parsedData) {
            $out .= "<ul>";

            foreach ($parsedData as $data) {
                $out .= "<li>" . $data['nombre'] . $this->generarListaHtml($data['hijos']) . "</li>";
            }
            $out .= "</ul>";

        }
        return $out;
    }

    /**
     * @return mixed
     */
    public function arbolData()
    {
        return $this->parsedData;
    }
}