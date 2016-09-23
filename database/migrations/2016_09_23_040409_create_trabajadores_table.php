<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTrabajadoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('trabajadores', function ($table) {
            $table->increments('id');
            $table->integer('cargo_id')->unsigned();
            $table->string('cedula', 9)->unique();
            $table->string('nombre', 100);
            $table->string('apellido', 100);
            $table->string('email');
            $table->boolean('activo');
            $table->timestamps();

            $table->foreign('cargo_id')->references('id')->on('cargos');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('trabajadores');
    }
}
