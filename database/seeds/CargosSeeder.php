<?php

use App\Cargo;
use Illuminate\Database\Seeder;

class CargosSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Cargo::create(['nombre' => 'Jr Developer', 'descripcion' => 'Desarrollador con poca experiencia laboral']);
        Cargo::create(['nombre' => 'Sr Developer', 'descripcion' => 'Desarrollador con mucha experiencia laboral']);
        Cargo::create(['nombre' => 'Project Manager', 'descripcion' => 'Encargado de manejar los proyectos']);
        Cargo::create(['nombre' => 'CEO', 'descripcion' => 'Gerente Genral de la empresa']);
        Cargo::create(['nombre' => 'CTO', 'descripcion' => 'Gerente del area tecnologica']);
        Cargo::create(['nombre' => 'CFO', 'descripcion' => 'Gerente del area financiera']);
        Cargo::create(['nombre' => 'RRHH', 'descripcion' => 'Gerente de recursos humanos']);
        Cargo::create(['nombre' => 'Comunity Manager', 'descripcion' => 'Especialista en redes sociales']);
        Cargo::create(['nombre' => 'Marketing', 'descripcion' => 'Especialista en mercadeo y publicidad']);
    }
}