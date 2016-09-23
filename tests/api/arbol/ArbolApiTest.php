<?php


class ArbolApiTest extends TestCase
{

    public function testCargosList()
    {
        $data = [
            ['id' => 0, 'padreid' => null, 'nombre' => 'Carros'],
            ['id' => 1, 'padreid' => null, 'nombre' => 'Computadoras'],
            ['id' => 2, 'padreid' => 0, 'nombre' => 'Rines'],
            ['id' => 3, 'padreid' => 2, 'nombre' => 'Perfil Bajo'],
            ['id' => 4, 'padreid' => 3, 'nombre' => 'Lujo'],
            ['id' => 5, 'padreid' => 0, 'nombre' => 'Repuestos'],
            ['id' => 6, 'padreid' => 4, 'nombre' => 'momo'],
            ['id' => 7, 'padreid' => 1, 'nombre' => 'software'],
            ['id' => 8, 'padreid' => 5, 'nombre' => 'Motores'],
            ['id' => 9, 'padreid' => 7, 'nombre' => 'Juegos'],
            ['id' => 10, 'padreid' => 7, 'nombre' => 'Administrativos'],
            ['id' => 11, 'padreid' => null, 'nombre' => 'Animales'],
            ['id' => 12, 'padreid' => 1, 'nombre' => 'Hardware'],
            ['id' => 13, 'padreid' => 11, 'nombre' => 'Perros'],
            ['id' => 14, 'padreid' => 11, 'nombre' => 'Gatos'],
            ['id' => 15, 'padreid' => null, 'nombre' => 'Hogar'],
            ['id' => 16, 'padreid' => 9, 'nombre' => 'Estrategia'],
            ['id' => 17, 'padreid' => 9, 'nombre' => 'Rol']
        ];
        $response = $this->json('POST', '/api/arbol', $data)
            ->seeJsonStructure([
                'data' => [
                    'html' => [

                    ]
                ]
            ]);
    }


}