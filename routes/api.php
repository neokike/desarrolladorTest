<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::put('/trabajadores/activacion/{id}', 'Api\TrabajadoresApiController@toggleActivacion');
Route::resource('/trabajadores', 'Api\TrabajadoresApiController');
Route::post('/arbol', 'Api\AlgoritmoApiController@generar');
Route::get('/cargos', 'Api\CargosApiController@index');
