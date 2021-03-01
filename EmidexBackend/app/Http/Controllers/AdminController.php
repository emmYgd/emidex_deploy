<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Services\CreateAdminDefaultEntries;
use App\Http\Controllers\Services\ComputeTrack_RefService;
use App\Http\Controllers\Services\ModelEntitiesService;

use App\Model\AdminAbstraction;
use App\Model\UserAbstraction;
use App\Model\UserEntityAbstraction;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
//use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

final class AdminController extends Controller
{
    use ComputeTrack_RefService;
    use ModelEntitiesService;
    //use CreateAdminDefaultEntries;
    /**
     * Create a new controller instance.
     *
     * @return void
     */

    public function __construct()
    {
        //$this->createAdminDefault();
    }


    public function AdminLogin(Request $request)  
    {   
        $status = array();

        try{

            //validate here:
            $validate = $this->validate($request, [
                'admin_name' => 'required',
                'password' => 'required'
            ]);

            /*if($validate->fails()){
                throw new \Exception("Invalid Input provided!");
            }*/

            $supplied_admin_name = $request->input('admin_name');
            $supplied_admin_pass = $request->input('password');

            $pass_hash = md5(md5($supplied_admin_pass));

            //query KeyValue Pair:
            $queryKeysValues = [
                'admin_name' => $supplied_admin_name, 
                'password' => $pass_hash
            ];

            $isDetailsFound = $this->AdminReadService($queryKeysValues);

            if( !empty($isDetailsFound) ){

                $status = [
                    'code' => 1,
                    'serverStatus' => 'adminFound'
                ];

            }else{
                throw new \Exception("Failed login attempt, you are not an admin!");
            }

            return response()->json($status, 200);
            //return response()->json($pass_hash, 200);

        }catch(\Exception $ex){

            $status = [
                'code' => 0,
                'serverStatus' => 'loginFailed',
                'short_description' => $ex->getMessage()
            ];

            return response()->json($status, 200);
        }

    }



    public function AdminCreate(Request $request) 
    {
        $status = array();

        try{
            //has validated request from the frontend...
            //create directly inside the database:
            $details_saved = $this->AdminCreateService($request);

            if(!$details_saved){

                throw new \Exception("saveError");   

            }else{

                $status = [
                    'code' => 1,
                    'serverStatus' => 'entriesSaved'
                ];
            }

            return response()->json($status, 200);

        }catch(\Exception $ex){

            $status = [
                'code' => 0,
                'serverStatus' => 'saveFailed',
                'short_description' => $ex->getMessage()
            ];

            return response()->json($status, 200);
        }

    }



    public function AdminGetByTrackOrRef(Request $request) 
    {
        $status = array();

        try{

            $track_ref_code = $request->input('track_ref_code');
            //$ref_code = $request->input('referenceCode');

            //validate here:
            $validate = $this->validate($request, [
                'track_ref_code' => 'required',
            ]);
            

            /*if($validate->fails()){
                throw new \Exception("Tracking and Reference codes cannot be duplicate!");
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
                'readDetails' => json_encode($details_read_model)
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



    public function AdminObtainQuotesByRef(Request $request) 
    {
        $status = array();

        try{

            $quote_ref_code = $request->input('quote_ref_code');
            //$ref_code = $request->input('referenceCode');

            //validate here:
            $validate = $this->validate($request, [
                'quote_ref_code' => 'required',
            ]);
            

            /*if($validate->fails()){
                throw new \Exception("Tracking and Reference codes cannot be duplicate!");
            }*/

            $queryKeysValues = [
                'quoteRefCode' => $quote_ref_code
            ];

            //first read through tracking code:
            $quote_details_read_model = $this->QuoteReadService($queryKeysValues);
            
            if( empty($quote_details_read_model) )
            {

                throw new \Exception("Error! could not find the quote details associated with this supplied code");  

            } 

            $status = [

                'code' => 1,
                'serverStatus' => 'fetchSuccess',
                'readDetails' => $quote_details_read_model
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


    public function AdminGetAllTrack_Ref(Request $request) 
    {

        $status = array();

        try{

            if ($request->isMethod('get')){

                $details_read_all = $this->AdminReadAllService();

                if(empty($details_read_all)){
                    throw new \Exception("Server Error in retrieving all generated tracking and reference codes. Try again!");
                }
            
                //init params:
                $counter = 0;
                
                $track_array = array();
                $ref_array = array();

                foreach($details_read_all as $allModel){
                    $counter++;
                    $track_array[$counter] = $allModel->trackingCode;
                    $ref_array[$counter] = $allModel->referenceCode;

                }

                $status = [
                    'code' => 1,
                    'serverStatus' => 'readAllTrackAndRefSuccess',
                    //'user_model' => $details_read_all,
                    'trackReadDetails' => json_encode($track_array),
                    'refReadDetails' => json_encode($ref_array)
                ];
            }

            return response()->json($status, 200);

        }catch(\Exception $ex){

             $status = [
                'code' => 0,
                'serverStatus' => 'readAllTrackAndRefError',
                'short_description' => $ex->getMessage()
            ];

            return response()->json($status, 200);
        }

    }


    public function AdminGetAllQuoteRefs(Request $request) 
    {

        $status = array();

        try{

            if ($request->isMethod('get')){

                $details_read_all = $this->AdminReadAllQuoteService();

                if(empty($details_read_all)){
                    throw new \Exception("Server Error in retrieving all quote details. Try again!");
                }
            
                //init params:
                $counter = 0;
                
                $quote_ref_array = array();
                
                foreach($details_read_all as $allQuoteModel){

                    $counter++;
                    $quote_ref_array[$counter] = $allQuoteModel->quoteRefCode;
                }

                $status = [

                    'code' => 1,
                    'serverStatus' => 'readAllQuoteRefSuccess',
                    'quote_ref_codes' => $quote_ref_array
                ];
            }

            return response()->json($status, 200);

        }catch(\Exception $ex){

             $status = [
                'code' => 0,
                'serverStatus' => 'readAllQuoteRefError',
                'short_description' => $ex->getMessage()
            ];

            return response()->json($status, 200);
        }

    }



    public function AdminUpdateParams(Request $request)
    {

        $status = array();

        try{

            $track_code = $request->input('trackingCode');
            $ref_code = $request->input('referenceCode');
            $new_price = $request->input('price');
            $new_status = $request->input('status');

            //validate here:
            $validate = $this->validate($request, [
                'trackingCode' => 'required',
                'referenceCode' => 'required'
            ]);

            /*if($validate->fails()){
                throw new \Exception("Invalid Input provided!");
            }*/

            $queryKeysValues = [
                'trackingCode' => $track_code,
                'referenceCode' => $ref_code
            ];

            $updateKeysValues = [
                'price' => $new_price,
                'status' => $new_status 
            ];

            //update all models:
            $details_update = $this->AdminUpdateService($queryKeysValues, $updateKeysValues);

            if(!$details_update){
                throw new \Exception("Error! could not update shipment details. Try again!");
            }

            //if update is successful, do this:
            $updatedModel = $this->UserReadService($updateKeysValues);
            
            if(!$updatedModel){
                throw new \Exception("Couldn't read the model just Updated. Try again!");
            }

            $status = [
                'code' => 1,
                'serverStatus' => 'updateSuccess',//$details_update
                'updatedDetails' => $updatedModel
            ];

            return response()->json($status, 200);

        }catch(\Exception $ex){

            $status = [
                'code' => 0,
                'serverStatus' => 'updateFailed',
                'short_description' => $ex->getMessage()
            ];

            return response()->json($status, 200);

        }
    }


    public function AdminUpdatePricesandPayDetails(Request $request)
    {

        $status = array();

        try{

            //validate here:
            $validate = $this->validate($request, [
                'quoteRefCode' =>'required',
                'pay_details_to_update' => 'required',
                'price_to_update' => 'required'
            ]);

            /*if($validate->fails()){
                throw new \Exception("Invalid Input provided!");
            }*/

            $quote_ref_code = $request->input('quoteRefCode');
            $new_payment_details = $request->input('pay_details_to_update');
            $new_price_details = $request->input('price_to_update');

            $queryKeysValues = [
                'quoteRefCode' => $quote_ref_code
            ];

            $updateKeysValues = [
                'payment_details' => $new_payment_details,
                'price_details' => $new_price_details
            ];

            //update all models:
            $details_update = $this->QuoteUpdateService($queryKeysValues, $updateKeysValues);

            if(!$details_update){
                throw new \Exception("Error! could not update shipment details. Try again!");
            }

            //if update is successful, re-query the model and return the data :
            $updatedModel = $this->UserEntityReadService($updateKeysValues);
            
            if(!$updatedModel){
                throw new \Exception("Couldn't read the model just Updated. Try again!");
            }

            $status = [
                'code' => 1,
                'serverStatus' => 'updateSuccess',//$details_update
                'updatedDetails' => $updatedModel
            ];

            return response()->json($status, 200);

        }catch(\Exception $ex){

            $status = [
                'code' => 0,
                'serverStatus' => 'updateFailed',
                'short_description' => $ex->getMessage()
            ];

            return response()->json($status, 200);

        }

    }



    public function AdminGenerateCodes(Request $request)
    {

        $status = array();

        try{

            if($request->isMethod('get')){

                $trackingCode = $this->generateTrackingID();
                $referenceCode = $this->generateReferenceID();

                if(!isset($trackingCode) && !isset($referenceCode)){

                    throw new \Exception("Error in generating tracking and reference codes! Please retry");
            
                }
            
                $status = [
                    'code' => 1,
                    'serverStatus' => 'codeGenerationSuccess',
                    'referenceCode' => $referenceCode,
                    'trackingCode' => $trackingCode,
                ];
            }

            return response()->json($status, 200);

        }catch(\Exception $ex){

             $status = [
                'code' => 0,
                'serverStatus' => 'codeGenerationError',
                'short_description' => $ex->getMessage()
            ];

            return response()->json($status, 200);

        }
    }

}

?>
