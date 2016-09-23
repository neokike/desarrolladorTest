<?php

use App\Cargo;
use Illuminate\Http\UploadedFile;

class CargosApiTest extends TestCase
{

    public function testCargosList()
    {
        factory(Cargo::class)->create();
        $response = $this->json('GET', '/api/cargos')
            ->seeJsonStructure([
                '*' => [
                    'nombre', 'descripcion'
                ]
            ]);
    }


}