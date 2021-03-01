<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    //return $router->app->version();
    return "Hello World";
});

$router->post('cool_login', function () use ($router) {
    //return $router->app->version();
    return "Cool Things";
});

$router->group(['prefix' => 'v1'], function() use ($router) {

	$router->post('login', [
    	'as' => 'login',
    	//'middleware' => 'init',
    	'uses' => 'AdminController@AdminLogin'
	]);

	$router->get('generate_codes', [
		'as' => 'generate_codes', 
    	'uses' => 'AdminController@AdminGenerateCodes'
	]);

	$router->post('create_params', [
		'as' => 'create_params', 
    	'uses' => 'AdminController@AdminCreate'
	]);

	$router->post('read_each_model_by_track_ref', [
		'as' => 'read_each_model_by_track_ref', 
    	'uses' => 'AdminController@AdminGetByTrackOrRef'
	]);

	$router->get('read_all_track_ref', [
		'as' => 'read_all_track_ref', 
    	'uses' => 'AdminController@AdminGetAllTrack_Ref'
	]);

	$router->post('update_params', [
		'as' => 'update_params', 
    	'uses' => 'AdminController@AdminUpdateParams'
	]);

	$router->post('track_shipment', [
		'as' => 'track_shipment', 
    	'uses' => 'UserController@UserTrackShipment'
	]);

	$router->post('save_and_get_quote_ref', [
		'as' => 'save_and_get_quote_ref', 
    	'uses' => 'UserEntityController@SaveQuoteInfo_GenQuoteRef'
	]);

	$router->post('quotes_and_pay_details', [
		'as' => 'quotes_and_pay_details', 
    	'uses' => 'UserEntityController@ObtainQuotesAndPayDetails'
	]);

	//admin operations on quote:
	$router->get('get_all_quote_ref_codes', [
		'as' => 'get_all_quote_ref_codes',
		'uses' => 'AdminController@AdminGetAllQuoteRefs'
	]);

	$router->post('get_quote_with_ref', [
		'as' => 'get_quote_with_ref',
		'uses' => 'AdminController@AdminObtainQuotesByRef'
	]);

	$router->post('update_prices_and_payment_details', [
		'as' => 'update_prices_and_payment_details',
		'uses' => 'AdminController@AdminUpdatePricesandPayDetails'
	]);

});
