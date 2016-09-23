<?php
namespace App\Http\Controllers\Api;

use App\Cargo;
use App\Http\Controllers\Controller;

class CargosApiController extends Controller
{

    public function index()
    {
        return Cargo::all();
    }
}