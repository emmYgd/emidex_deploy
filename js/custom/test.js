/*$(document).ready(function(){
	var myValue = "@youngemmy";
	$("p#tracking_codes").append("<p>I am cute</p>" + "" + myValue);
	$("p#tracking_codes").append("<p>I am cute</p>");
	$("p#tracking_codes").append("<p>I am cute</p>");
	$("p#tracking_codes").append("<p>I am cute</p>");
});*/

var tracking_codes = "cool1";

var set_tracking = function(){
	tracking_codes = "cool2";
}

set_tracking();

var genCode = function(){

	var great_one = tracking_codes;
	console.log(great_one);
}

genCode();