<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class jwtCookieMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // Honor explicit API-client Authorization headers before browser cookies.
        if (! $request->bearerToken() && ($token = $request->cookie('jwt_token'))) {
            $request->headers->set('Authorization', "Bearer {$token}");
        }

        return $next($request);
    }
}