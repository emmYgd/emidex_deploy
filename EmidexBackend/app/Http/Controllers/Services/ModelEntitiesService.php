<?php

namespace App\Http\Controllers\Services;

use App\Models\AdminAbstraction;
use App\Models\UserAbstraction;
use App\Models\UserEntityAbstraction;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
//use Illuminate\Support\Facades\Auth;
//use Illuminate\Support\Facades\Storage;
//use Illuminate\Support\Facades\Validator;
//use Illuminate\Support\Str;

trait ModelEntitiesService 
{

	//in groovy on grails, this would have been transactional:
	
	protected function AdminCreateService(Request $request)
	{

		$createStatus = array();

		if ($request->isMethod('post')) {

			//fine tune the request:
			//$to_persist_entities = $request->except('admin_abstraction');
			
		 	$detailsSaved = UserAbstraction::create($request->all());
		 	
		 	return $detailsSaved;
		 		
		}
	}

	protected function QuoteCreateService(Request $request)
	{
		if ($request->isMethod('post')) {
			
		 	$detailsSaved = UserEntityAbstraction::create($request->all());
		 	
		 	return $detailsSaved;
		 		
		}

	}		

	protected function AdminReadService(array $queryKeysValues)
	{
		
		$readModel = AdminAbstraction::where($queryKeysValues)->first();
		return $readModel;

	}

	protected function UserReadService(array $queryKeysValues)
	{
		
		$readModel = UserAbstraction::where($queryKeysValues)->first();
		return $readModel;

	}


	protected function UserEntityReadService(array $queryKeysValues)
	{
		
		$readModel = UserEntityAbstraction::where($queryKeysValues)->first();
		return $readModel;

	}

	

	protected function AdminReadAllService()
	{
		
		$readAllModel = UserAbstraction::get();
		return $readAllModel;

	}


	protected function AdminReadAllQuoteService()
	{

		$readAllQuoteModel = UserEntityAbstraction::get();
		return $readAllQuoteModel;

	}

	protected function QuoteReadService(array $queryKeysValues)
	{
		
		$readModel = UserEntityAbstraction::where($queryKeysValues)->first();
		return $readModel;

	}

	protected function AdminUpdateService(array $queryKeysValues, array $newKeysValues)
	{

		$updateModel = UserAbstraction::where($queryKeysValues)->update($newKeysValues);
		return $updateModel;

	}

	protected function QuoteUpdateService(array $queryKeysValues, array $newKeysValues)
	{

		$updateModel = UserEntityAbstraction::where($queryKeysValues)->update($newKeysValues);
		return $updateModel;

	}

	protected function AdminDeleteService(Model $modelClass, array $deleteKeysValues)
	{

		$deleteModel = $modelClass->where($deleteKeysValues)->delete();
		return $deleteModel;

	}

}

?>