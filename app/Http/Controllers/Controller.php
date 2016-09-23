<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function respondWithArray($array, $key)
    {

        $response = [$key => $array];

        return $response;
    }

    public function respondWithErrorArray($array, $key, $code = 422)
    {

        $response = [$key => $array];

        return response()->json($response, $code);
    }

    public function respondWithOK()
    {

        $response = ['result' => 'OK'];

        return $response;
    }

    public function respondWith404($msg)
    {
        return response()->json(['errors' => array(['code' => 422, 'message' => $msg])], 404);
    }
}
