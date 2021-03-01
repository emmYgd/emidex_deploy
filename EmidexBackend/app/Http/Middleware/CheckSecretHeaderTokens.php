<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Closure;

class CheckSecretHeaderTokens
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $status = array();
        /*check for header's bearer token for each requests: 
        bearer token from the Authorization header */
        //$token = $request->bearerToken();
        $token = $request->header("Authorization");

        /*if($token == ""){*/

             $status = [
                'code' => 0,
                'serverStatus' => 'authTokenEmpty',
                'short_description' => 'Bearer token missing from the Authorization header!'
            ];

            //return response()->json($status, 403);

            return response()->json([$token, 'Basic '.env('BEARER_TOKEN'), $token !=== 'Basic '.env('BEARER_TOKEN')],  200);
        //}

        if( $token !== 'Basic '.env('BEARER_TOKEN') ){

            $status = [
                'code' => 0,
                'serverStatus' => 'invalidAuthToken',
                'short_description' => 'Invalid Bearer Token!'
            ];

            return response()->json($status, 400);

        }


        return $next($request);
      
    }

}
