//global variables;
window.trackingCode;
window.referenceCode;

$(document).ready(function(){

  //hide by default:
  $("#track_ref").hide();
  $("#reference_code_search").hide();

  //get all saved track and reference codes:
 getAllTrackAndRef();

  //update all param details through your tracking or reference number..
  getSpecificInfo();

  //update the shipment price and status:
  updateShipmentPrice();
});

let parseJSONdata = function(param){

  var jsonObj = JSON.parse(param);
  //console.log(param);
  return jsonObj;

}


let getAllTrackAndRef = function(){

  $("#viewTrackRefBtn").click(function(event){
    console.log("Clicked!");

    $("#track_ref").show();

    const BEARER_TOKEN = "RdRIaBLDM_4GZ__c9_mXR8EiEwSxVINC_nGREERTEeSE2baS@AmO1Iy_";

    var req = $.ajax({
      url:"http://localhost/Emidex/EmidexBackend/public/v1/read_all_track_ref",
      method:"GET",//type
      headers:{
        "Authorization" : "Basic " + BEARER_TOKEN 
      }
    });

    req.done(function(resp){
      console.log(resp);
      //var resp = parseJSONdata(resp);

      var serverStatus = resp.serverStatus;
      var code = resp.code;

      var trackingCodes = parseJSONdata(resp.trackReadDetails);
      var referenceCodes = parseJSONdata(resp.refReadDetails);

      if( (serverStatus == "readAllTrackAndRefSuccess") && (code == 1) ){
          
        //iterate through all the keys and values in the json:
        $.each(trackingCodes, function(key, value) {

          console.log(key, value);

          //display this to the client...
          //$("#viewAllDetailsBtn").hide();
          var keyUIrender  = "<span>" + key + ":" + "</span>";
          var valueUIrender = "<span>" + value + "</span>";

          $("p#tracking_codes").append("<p>" + keyUIrender + "" + "" + valueUIrender + "</p>");
        });

        //iterate through all the keys and values in the json:
        $.each(referenceCodes, function(key, value) {

          console.log(key, value);

          //display this to the client...
          //$("#viewAllDetailsBtn").hide();
          var keyUIrender  = "<span>" + key + ":" + "</span>";
          var valueUIrender = "<span>" + value + "</span>";

          $("p#reference_codes").append("<p>" + keyUIrender + "" + valueUIrender + "</p>");
        });

      }else if( (code == 0)  && (serverStatus == "readAllTrackAndRefError") )
      {

        $("#errorTrackRef").html(resp.short_description);

      }

    });

    //handle failure now:
    req.fail(function(){
      $("#errorTrackRef").html("Failed to retrieve the tracking and reference codes generated so far. Please, check your internet connection and retry!");
    });

  });
}


let getSpecificInfo = function(){

  $("#search_update_btn").click(function(event){

    console.log("Search is here!");

    var trackOrRefCode = $("#track_ref_code_search").val();
    //var referenceCode = $("#reference_code_search").val();

    if( trackOrRefCode == ""){

      //event.preventDefault();
      $("div#search_success").html("");
      $("div#search_error").html("Field cannot be empty!");
      $("div#shipmentContents").html("");

    }else{

      $("div#search_success").html("");
      $("div#search_error").html("");

      //first clear the display area:
      $("div#shipmentContents").html("");

      const BEARER_TOKEN = "RdRIaBLDM_4GZ__c9_mXR8EiEwSxVINC_nGREERTEeSE2baS@AmO1Iy_";

      var req = $.ajax({
        url:"http://localhost/Emidex/EmidexBackend/public/v1/read_each_model_by_track_ref",
        method:"POST",//type
        headers:{
          "Authorization" : "Basic " + BEARER_TOKEN 
        },
        data:{
          track_ref_code: trackOrRefCode
          //referenceCode: referenceCode
        }
      });

      req.done(function(resp){
        console.log(resp);
        //var resp = parseJSONdata(resp);

        if( (resp.serverStatus == "fetchSuccess") && (resp.code == 1) ){

          $("div#loadingShipmentIcon").hide();
          $("div#search_success").html("Successfully fetched Shipment details");

          var readDetails = parseJSONdata(resp.readDetails);

          //attach current track and ref code to windows properties:
          window.trackingCode = readDetails.trackingCode;
          window.referenceCode = readDetails.referenceCode;

           //iterate through all the keys and values in the json:
          $.each(readDetails, function(key, value) {

              console.log(key, value);

            //display this to the client...
            //$("#viewAllDetailsBtn").hide();
            var keyUIrender  = "<span>" + key + "" + ":" + "" + "</span>";
            var valueUIrender = "<span>" + value + "</span>";

            $("div#shipmentContents").append("<b><p>" + keyUIrender + "" + valueUIrender + "</p></b>");
          });

        }else if( (resp.serverStatus == "fetchError") && (resp.code == 0) ){
          $("div#search_error").html(resp.short_description);
        }
      });

      req.fail(function(){
        $("div#search_error").html("Please, check your internet services");
      });

    }
  });
}


let updateShipmentPrice = function(){

  $("#updateStatus_Price").click(function(event){

    console.log("Update is here!");

    var trackingCode = window.trackingCode;
    var referenceCode = window.referenceCode;

    var priceUpdate = $("#priceUpdate").val();
    var statusUpdate = $("#statusUpdate").val();

    /*if(trackingCode == ""){
      $("#").html();
    }*/

    if( (priceUpdate == "") && (statusUpdate == "") ){

      $("#updateError").html("At least one field should be filled");

    }
    else{

      const BEARER_TOKEN = "RdRIaBLDM_4GZ__c9_mXR8EiEwSxVINC_nGREERTEeSE2baS@AmO1Iy_";

      var req = $.ajax({
        url:"http://localhost/Emidex/EmidexBackend/public/v1/update_params",
        method:"POST",//type
        headers:{
          "Authorization" : "Basic " + BEARER_TOKEN 
        },
        data:{
          trackingCode: trackingCode,
          referenceCode: referenceCode,
          price: priceUpdate,
          status: statusUpdate
        }
      });

      req.done(function(resp){
        console.log(resp);
        $("form#updateForm").trigger("reset");


        if( (resp.serverStatus == "updateSuccess") && (resp.code == 1) ){

          $("#shipmentContents").html("");
          //console.log("Here it is:" + resp.updatedDetails);
          //$("#shipmentContents").html(resp.updatedDetails);
           //iterate through all the keys and values in the json:
          $.each(resp.updatedDetails, function(key, value) {

            console.log(key, value);

            //display this to the client...
            //$("#viewAllDetailsBtn").hide();
            var keyUIrender  = "<span>" + key + "" + ":" + "" + "</span>";
            var valueUIrender = "<span>" + value + "</span>";

            $("#shipmentContents").append("<b><p>" + keyUIrender + "" + valueUIrender + "</p></b>");
          });

          $("#updateSuccess").html("Successfully updated Shipment details");
          $("#updateError").html("");

        }else if( (resp.serverStatus == "updateFailed") && (resp.code == 0) ){

          $("#updateError").html(resp.short_description);
          $("#updateSuccess").html("");

        }
      });

      req.fail(function(){
        $("#updateError").html("Please, check your internet connection");
      });

    }
  });
} 