<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Services\ModelEntitiesService;
use App\Http\Controllers\Services\ComputeTrack_RefService;

use App\Model\UserEntityAbstraction;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

final class UserEntityController extends Controller
{
	use ModelEntitiesService;
	use ComputeTrack_RefService;

    /**
     * Create a new controller instance.
     *
     * @return void
     */

    public function __construct()
    {
        //
    }

    public function SaveQuoteInfo_GenQuoteRef(Request $request){

    	$status = array();

        try{
            //has validated request from the frontend...

            //create directly inside the database:
            //$req = $request->all();

            $details_saved = $this->QuoteCreateService($request);

            if(!$details_saved){

                throw new \Exception("Error in saving details. Try again!");   

            }else{

            	$newQuoteRef = $this->generateReferenceID();

            	$queryKeysValues = [
            		'shiperFullName' => $request->shiperFullName,
            		'userMail' => $request->userMail
            	];

            	$newKeysValues = [
            		'quoteRefCode' => $newQuoteRef
            	];

            	$details_update = $this->QuoteUpdateService($queryKeysValues, $newKeysValues);

            	if(!$details_update){
            		throw new \Exception("Error in updating new quote reference code!s");
            	}

                $status = [
                    'code' => 1,
                    'serverStatus' => 'quoteRequestSaved',
                    'quoteRefCode' => $newQuoteRef
                ];
            }

            /*$status = [
                'code' => 1,
                'serverStatus' => 'quoteRequestSaved',
                'quoteRefCode' => $newQuoteRef,
                'saved' =>$details_saved
            ];*/

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



    public function ObtainQuotesAndPayDetails(Request $request){
    	
    	$status = array();

        try{

            if ($request->isMethod('post')){

            	//validate here:
            	$validate = $this->validate($request, [
                	'quoteRefCode' => 'required'
            	]);

            	$queryKeysValues = [
            		'quoteRefCode' => $request->quoteRefCode
            	];

            	$quoteModel = $this->QuoteReadService($queryKeysValues);

            	if(empty($quoteModel)){
            		throw new \Exception("Couldnt Read Quote Values");
            	}

            	$payment_details = $quoteModel->payment_details;

            	$price_details = $quoteModel->price_details;//can be price

            	$status = [
                    'code' => 1,
                    'serverStatus' => 'quoteDetailsObtained',
                    'priceDetails' => $price_details,
                    'paymentDetails' => $payment_details
                    
                ];

            }

            return response()->json($status, 200);

        }catch(\Exception $ex){

        	 $status = [
                'code' => 0,
                'serverStatus' => 'quoteDetailsFetchFailed',
                'short_description' => $ex->getMessage()
            ];

            return response()->json($status, 200);

        }
    }


} 