<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\Helpers\Helpers;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    protected $helper;

    public function __construct()
    {
        $this->helper = new Helpers();
    }
}