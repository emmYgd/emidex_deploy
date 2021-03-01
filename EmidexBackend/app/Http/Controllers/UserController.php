<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Services\ModelEntitiesService;

use App\Model\UserAbstraction;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

final class UserController extends Controller
{
    use ModelEntitiesService;
    /**
     * Create a new controller instance.
     *
     * @return void
     */

    public function __construct()
    {
        //
    }

    public function UserTrackShipment(Request $request) 
    {   
        $status = array();

        try{

        	$track_ref_code = $request->input('track_ref_code');
        	//$ref_code = $request->input('referenceCode');


            //validate here:
            $validate = $this->validate($request, [
                'track_ref_code' => 'required'
                //'referenceCode' => 'unique:user'
            ]);

            /*if($validate->fails()){
                throw new \Exception("Invalid Input provided!");
            }*/

        	$queryKeysValues1 = [
                'trackingCode' => $track_ref_code
            ];

            $queryKeysValues2 = [
                'referenceCode' => $track_ref_code
            ];

            $details_read_model = null;

            //first read through tracking code:
            $details_read_track = $this->UserReadService($queryKeysValues1);
            $details_read_model = $details_read_track;
            
            if( empty($details_read_model) ){

                //if empty, read through reference code:
                $details_read_ref = $this->UserReadService($queryKeysValues2);
                $details_read_model = $details_read_ref;

                if( empty($details_read_model) ){

                    throw new \Exception("Error! could not find the shipment details associated with this supplied code");  
                } 

            }

            $status = [
                'code' => 1,
                'serverStatus' => 'fetchSuccess',
                'readDetails' => $details_read_model
                //'cool' =>  $track_ref_code
            ];

            return response()->json($status, 200);

        }catch(\Exception $ex){

            $status = [
                'code' => 0,
                'serverStatus' => 'fetchError',
                'short_description' => $ex->getMessage()
            ];

            return response()->json($status, 200);
        }
    }

    /*public function UserGetQuote(Request $request) : json 
    {   
        $status = array();

        try{



        }catch(\Exception $ex){

        }
    }*/

}
