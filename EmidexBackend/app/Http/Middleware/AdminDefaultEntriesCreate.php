<?php

namespace App\Http\Middleware;

use App\Http\Controllers\Services\CreateAdminDefaultEntries;

use Illuminate\Http\Request;
use Closure;

class AdminDefaultEntriesCreate
{
    use CreateAdminDefaultEntries;

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if($request->isMethod('post')){

            try{

                $this->createAdminDefault();

            }catch(\Exception $ex){

                $status = [
                    'code' => 0,
                    'status' => 'adminInitFailed',
                    'short_description' => $ex->getMessage()
                ];

                $response()->json($status, 200);

            }

        }

        return $next($request);
    }

}
