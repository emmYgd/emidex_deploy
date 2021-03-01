<?php
namespace App\Http\Controllers\Services;

trait ComputeTrack_RefService
{

	public function generateReferenceID() : string {

		//generate a random number alpha numeric number:
		$strBase1 = "0123456789";
		$strBase2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		$strBase3 = "abcdefghijklmnopqrstuvwxyz";
		//$strBase4 = random_strings(10);

		$strCombine = $strBase1 . $strBase2 . $strBase3;

		$referenceID = substr( str_shuffle($strCombine), 0, 5 ) . substr( md5(time()), 0, 4 );
		return $referenceID;
	}

	public function generateTrackingID() : string {

		//generate purely random numbers:
		$strBase = "0123456789";
		$strShuffle1 = str_shuffle($strBase);
		$strShuffle2 = str_shuffle($strBase);

		$strCombine = $strShuffle1 . $strShuffle2;

		$trackingPin = substr( $strCombine, 0, 9);
		return $trackingPin;
	}

}

?>