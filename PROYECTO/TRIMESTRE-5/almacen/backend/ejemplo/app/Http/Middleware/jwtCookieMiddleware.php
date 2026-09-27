<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class jwtCookieMiddleware
{
    
    public function handle(Request $request, Closure $next)
    {

    if ($token = $request->cookie('jwt_token')) {
        $request->headers->set('Authorization', "Bearer $token");
    }
    return $next($request);
}

}