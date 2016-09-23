<?php

use App\Trabajador;

class TrabajadoresApiTest extends TestCase
{

    public function testTrabajadoresDataTableList()
    {
        factory(Trabajador::class)->create();
        $response = $this->json('GET', '/api/trabajadores')
            ->seeJsonStructure([
                'data' => [
                    '*' => [
                        'nombre', 'apellido', 'email', 'cedula', 'activo'
                    ]
                ]
            ]);
    }

    public function testCrearTrabajador()
    {
        $trabajador = factory(Trabajador::class)->make();
        $response = $this->json('POST', '/api/trabajadores', $trabajador->toArray())
            ->seeJson([
                'success' =>
                    'El trabajador fue creado exitosamente'
            ]);

        $this->seeInDatabase('trabajadores', ['cedula' => $trabajador->cedula]);
    }

    public function testCrearTrabajadorConErrores()
    {
        $trabajador = factory(Trabajador::class)->create();
        $trabajador2 = factory(Trabajador::class)->make(['nombre' => '', 'cedula' => $trabajador->cedula]);

        $response = $this->json('POST', '/api/trabajadores', $trabajador->toArray())
            ->seeJson([
                'cedula' => ['La cedula ya ha sido tomada.']
            ]);

        $this->notSeeInDatabase('trabajadores', ['nombre' => $trabajador2->nombre]);
    }

    public function testActualizarTrabajador()
    {
        $trabajador = factory(Trabajador::class)->create();

        $trabajador->nombre = 'pedro';
        $response = $this->json('PUT', '/api/trabajadores/' . $trabajador->id, $trabajador->toArray())
            ->seeJson([
                'success' =>
                    'El trabajador fue actualizado exitosamente'
            ]);

        $this->seeInDatabase('trabajadores', ['nombre' => 'pedro']);
    }


    public function testActualizarTrabajadorConErrores()
    {
        $trabajador = factory(Trabajador::class)->create(['nombre' => 'pedro']);
        $trabajador->nombre = '';
        $response = $this->json('PUT', '/api/trabajadores/' . $trabajador->id, $trabajador->toArray())
            ->seeJson([
                'nombre' => ['El campo nombre es obligatorio.']
            ]);

        $this->notSeeInDatabase('trabajadores', ['nombre' => '']);
    }

    public function testEliminarTrabajador()
    {
        $trabajador = factory(Trabajador::class)->create();
        $response = $this->json('DELETE', '/api/trabajadores/' . $trabajador->id)
            ->seeJson([
                'success' =>
                    'El/Los trabajador(es) fue(ron) Eliminado(s) satisfactoriamente'
            ]);

        $this->dontSeeInDatabase('trabajadores', ['id' => $trabajador->id]);
    }

    public function testEliminarVariosTrabajadores()
    {
        $trabajador = factory(Trabajador::class)->create();
        $trabajador2 = factory(Trabajador::class)->create();
        $trabajador3 = factory(Trabajador::class)->create();
        $response = $this->json('DELETE', '/api/trabajadores/' . $trabajador->id . ',' . $trabajador2->id . ',' . $trabajador3->id)
            ->seeJson([
                'success' =>
                    'El/Los trabajador(es) fue(ron) Eliminado(s) satisfactoriamente'
            ]);

        $this->dontSeeInDatabase('trabajadores', ['id' => $trabajador->id]);
        $this->dontSeeInDatabase('trabajadores', ['id' => $trabajador2->id]);
        $this->dontSeeInDatabase('trabajadores', ['id' => $trabajador3->id]);
    }

    public function testEliminarVariosTrabajadoresConErrores()
    {
        $trabajador = factory(Trabajador::class)->create();
        $trabajador2 = factory(Trabajador::class)->create();
        $trabajador3 = factory(Trabajador::class)->create();
        $response = $this->json('DELETE', '/api/trabajadores/' . $trabajador->id . ',' . $trabajador2->id . ',' . $trabajador3->id . ',100')
            ->seeJson([
                'mensaje' =>
                    'Ocurrio un problema, uno o más de los trabajadores especificados no existen'
            ]);

        $this->dontSeeInDatabase('trabajadores', ['id' => $trabajador->id]);
        $this->dontSeeInDatabase('trabajadores', ['id' => $trabajador2->id]);
        $this->dontSeeInDatabase('trabajadores', ['id' => $trabajador3->id]);
    }


    public function testEliminarTrabajadorInvalido()
    {
        $response = $this->json('DELETE', '/api/trabajadores/' . 100)
            ->seeJson([
                'mensaje' =>
                    'Ocurrio un problema, uno o más de los trabajadores especificados no existen'
            ]);
    }

    public function testMostrarTrabajador()
    {
        $trabajador = factory(Trabajador::class)->create();
        $response = $this->json('GET', '/api/trabajadores/' . $trabajador->id)
            ->seeJsonStructure([
                'data' => [
                    'nombre', 'apellido', 'email', 'cedula', 'activo', 'cargo_id'
                ]
            ]);
    }

    public function testShowInvalidAthlete()
    {
        $trabajador = factory(Trabajador::class)->create();
        $response = $this->json('GET', '/api/trabajadores/' . 100)
            ->seeJson([
                'mensaje' =>
                    'El trabajador no existe'
            ]);
    }

}