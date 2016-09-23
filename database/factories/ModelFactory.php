<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\Trabajador::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'nombre'   => $faker->firstName,
        'apellido' => $faker->lastName,
        'email'    => $faker->unique()->safeEmail,
        'cedula'   => $faker->randomNumber(8),
        'cargo_id' => 1,
        'activo'   => $faker->boolean()
    ];
});

$factory->define(App\Cargo::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'nombre'   => $faker->name,
        'descripcion' => $faker->paragraph
    ];
});
