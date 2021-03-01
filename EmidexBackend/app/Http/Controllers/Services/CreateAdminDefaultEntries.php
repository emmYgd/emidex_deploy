<?php

namespace App\Http\Controllers\Services;

use App\Models\AdminAbstraction;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Artisan;
//use Illuminate\Support\Facades\Auth;
//use Illuminate\Support\Facades\Storage;
//use Illuminate\Support\Facades\Validator;
//use Illuminate\Support\Str;

trait CreateAdminDefaultEntries 
{

	//in groovy on grails, this would have been transactional:
	
	public function createAdminDefault()
	{
		Artisan::call('migrate:fresh');

		$defaultAdminDetails = new AdminAbstraction();	

		$defaultAdminDetails->admin_name = env('ADMIN_USERNAME');
		$defaultAdminDetails->role = 'admin';
		$defaultAdminDetails->password = env('ADMIN_PASSWORD');
		//$defaultAdminDetails->secret_token = env('BEARER_TOKEN');

		$defaultAdminDetails->save(); 		
	}

}		