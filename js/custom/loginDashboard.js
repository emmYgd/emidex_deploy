
 //global variables;
window.trackingCode;
window.referenceCode;

//use windows event to hide data before page load.... Later things...
$(document).ready(function(){

  //handle default clicks:
  /*$("a #dummyA").click(function(event){
      event.preventDefault();
    });*/

  //default show and hide:
 defaultActions();
  
  //logs in and fetch data by default:
  GeneralFetch(); 

  //generate tracking and reference code..
  generateTrackandRefCode(); 

  pointToShipmentDetails();

  //confirmPayment button handle:
  saveNewDetails();

  //get all saved info:
  //getSavedInfo();

  //logout:
  logOut();
});

let defaultActions = function(){

  //hide the admin dashboard skeleton:
  //for hide and show respective pages:
  $(".loginPage").show();

  $("#adminDashboardSkeleton").hide();

  $("#details_set").hide();

  $("#form_content").hide();

  $("#saveNewDetails").hide();

}

/*let parseJSONdata = function(param){

  var jsonObj = JSON.parse(param);
  //console.log(param);
  return jsonObj;

}*/


let GeneralFetch = function(){

  //Now call the object literal method when button is clicked:
  $("#login").click(function(event){

    event.preventDefault();

    //get the values of the admin detail:
    var adminName = $("#adminName").val();
    var adminPass = $("#adminPass").val();

    if( (adminName == "") || (adminPass == "") ) 
    {

      $("#validatePass").html("Password cannot be empty!");

    }else{

      const BEARER_TOKEN = "RdRIaBLDM_4GZ__c9_mXR8EiEwSxVINC_nGREERTEeSE2baS@AmO1Iy_";

      //send over to the server:
      var req = $.ajax({
        url:"http://localhost/Emidex/EmidexBackend/public/v1/login",
        method:"POST",//type
        headers: {
          "Authorization": "Basic " + BEARER_TOKEN
        },
        data:{
          admin_name : adminName,
          password : adminPass
        }
      });

      //recieve result:
      req.done(function(resp){
        console.log(resp);
        //var resp = parseJSONdata(resp);

        var serverStatus = resp.serverStatus;
        var code = resp.code;

        if( (serverStatus == "adminFound") && (code == 1) ){

          //for hide and show respective pages:production
          $(".loginPage").hide();
          $("#adminDashboardSkeleton").show();

          //showLogoutOption:
          $("a#logout").html("Logout");

        }else if( (code == 0) && (serverStatus == "loginFailed") ){
          $("#validatePass").html(resp.short_description);
        } 
      });

      //handle failure now:
      req.fail(function(){
        $("#errormessage").html("Failed to Login. Please, check your internet connection!");
      });

    }
  });
}


let generateTrackandRefCode = function(){

  //send through ajax:
  $("#code_generate").click(function(event){

    //console.log("I've been clicked");

    /*first get the save status of inputed details - 
    through the message set to be displayed upon successful save:*/

    /*var saveStatus = $("#saveDataConfirm").val();*/
    //console.log("I've been clicked");

    /*if(saveStatus === ""){*/

      console.log("I've been clicked");

      const BEARER_TOKEN = "RdRIaBLDM_4GZ__c9_mXR8EiEwSxVINC_nGREERTEeSE2baS@AmO1Iy_";

      var req = $.ajax({
        url:"http://localhost/Emidex/EmidexBackend/public/v1/generate_codes",
        method:"GET",//type
        headers: {
          "Authorization": "Basic " + BEARER_TOKEN
        }
      });

      req.done( function(resp){
        console.log(resp);
        //var resp = parseJSONdata(resp);

        if( (resp.code == 1) && (resp.serverStatus == "codeGenerationSuccess") ){
          
          //assign both as global variables
          window.trackingCode = resp.trackingCode;
          window.referenceCode = resp.referenceCode;

          //fix the tracking code in the UI..
          $("#tracking_code").html(trackingCode);
          $("#reference_ID").html(referenceCode);
          $("#tracking_code_to_save").html(trackingCode);
          $("#reference_code_to_save").html(referenceCode);

          //change the button content:
          $("#gen_code").hide();
          $("#details_set").show();

        }else if( (resp.code == 0) && (resp.serverStatus == "codeGenerationError") )
        {

          $("#errorMessage").html(resp.short_description);

        }

      });

      req.fail(function(){
        //set the error message on the admin dashboard:'
        $("#errorMessage").html("Cannot generate code. Please check your internet connection and try again");
      });

  });
}


let pointToShipmentDetails = function(){

  $("#set_details").click(function(event){

    $("#tracking_code").html("");
    $("#reference_ID").html("");

    $("#genNew").hide();

    $("#form_content").show();

    $("#saveNewDetails").show();

  });

}
  

let saveNewDetails = function(){

  //send through ajax:
  $("#saveNewDetails").click(function(event){

    //collect the values from the filled data:
    var shipmentDay = $("#shipmentDay").val();
    var shipmentMonth = $("#shipmentMonth").val();
    var shipmentYear = $("#shipmentYear").val();

    var shipmentHour = $("#shipmentHour").val();
    var shipmentMinute = $("#shipmentMinute").val();
    var shipmentSecond = $("#shipmentSecond").val();

    var deliveryDay = $("#deliveryDay").val();
    var deliveryMonth = $("#deliveryMonth").val();
    var deliveryYear = $("#deliveryYear").val();

    var shiperFullName = $("#shiperFullName").val();
    var shiperAddress = $("#shiperAddress").val();

    var receiverFullName = $("#receiverFullName").val();
    var receiverAddress = $("#receiverAddress").val();
    
    var price = $("#price").val();
    var status = $("#status").val();

    var commodity = $("#commodity").val();
    var commodityTypes = $("#commodityTypes").val();
    var commodityQuantity = $("#commodityQuantity").val();
    var commodityContent = $("#commodityContent").val();

    var destination = $("#destination").val();
    var origin = $("#origin").val();
    var portOrigin = $("#portOrigin").val();

    var mode = $("#mode").val();
    var weight_kgs = $("#weight_kgs").val();
    var weight_cubic = $("#weight_cubic").val();
    var allocation = $("#allocation").val();

    var service_type = $("#service_type").val();
    var size_type = $("#size_type").val();
    var add_info = $("#add_info").val();
    var shipmentTravelHistory = $("#shipmentTravelHistory").val();

    //reference the global variables:
    var trackingCode = window.trackingCode;//$("#tracking_code").val();
    var referenceCode = window.referenceCode;//$("#reference_ID").val();

    //this is for the required input:
    var inputVal = $("input.required").val();

    //validate here:
    if(inputVal == "") { 
      $(".validation").html("Field cannot be empty!");
      $("#saveErrorConfirm").html("Some fields cannot be empty. Please fill up the necessary fields");
    }else{

      console.log(service_type);
      console.log(trackingCode);
      console.log(referenceCode);

      const BEARER_TOKEN = "RdRIaBLDM_4GZ__c9_mXR8EiEwSxVINC_nGREERTEeSE2baS@AmO1Iy_";
      
        var req = $.ajax({
          url:"http://localhost/Emidex/EmidexBackend/public/v1/create_params",
          method:"POST",//type
          headers: {
            "Authorization": "Basic " + BEARER_TOKEN
          },
          data:{

            shipmentDay: shipmentDay,
            shipmentMonth: shipmentMonth,
            shipmentYear: shipmentYear,

            shipmentHour: shipmentHour,
            shipmentMinute: shipmentMinute,
            shipmentSecond: shipmentSecond,

            deliveryDay: deliveryDay,
            deliveryMonth: deliveryMonth,
            deliveryYear: deliveryYear,

            shiperFullName: shiperFullName,
            shiperAddress: shiperAddress,

            receiverFullName: receiverFullName,
            receiverAddress: receiverAddress,

            price: price,
            status: status,

            commodity: commodity,
            commodityTypes: commodityTypes,
            commodityQuantity: commodityQuantity,
            commodityContent: commodityContent,

            destination: destination,
            origin: origin,
            portOrigin: portOrigin,
            mode: mode,

            weight_kgs: weight_kgs,
            weight_cubic: weight_cubic,
            allocation: allocation,

            service_type: service_type,
            size_type: size_type,
            add_info: add_info,
            shipmentTravelHistory: shipmentTravelHistory,

            trackingCode: trackingCode,
            referenceCode: referenceCode
          }

        });

        //start fixing data:
        req.done(function(resp){
          console.log(resp);
          //parse JSON:
          //var resp = parseJSONdata(resp);

          if( (resp.code == 1) && (resp.serverStatus == "entriesSaved") )
          {

            $("#tracking_code_to_save").html("");
            $("#reference_code_to_save").html("");

            $("form").trigger("reset");
            $("#saveDataConfirm").html("Data Successfully Saved to Database. Generate new codes before saving your next entry.");

            $('input').trigger('reset');
            $("#form_content").hide();
            $("#saveNewDetails").hide();
            
            $("#genNew").show();

            $("#details_set").hide();
            $("#gen_code").show();

          }else if( (resp.code == 0) && (resp.serverStatus == "NotSaved")){
            $("#saveErrorConfirm").html("Error in saving to database, please retry.");
          }

        });
        
        req.fail(function(){
          //$("form").trigger("reset");
          $("#saveDataError").html("Please check your internet connection and try again");
        });
    }
  });
}


let logOut = function(){

  $("#logOut").click(function(event){

  const BEARER_TOKEN = "RdRIaBLDM_4GZ__c9_mXR8EiEwSxVINC_nGREERTEeSE2baS@AmO1Iy_";
    
    var req = $.ajax({
      url:"http://localhost/Emidex/EmidexBackend/public/v1/logout",
      method:"GET",//type or method...
      headers: {
        "Authorization": "Basic " + BEARER_TOKEN
      }
    });

    /*var url = "index.html";
    $(location).attr("href", url);*/

    //always do this:
    req.always(function(resp){
      //can JQuery redirect?:
      //window.location.replace("index.html");
      //request from server:
      //or use:
      var url = "index.html";
      $(location).attr("href", url);
    });

    req.fail(function(){
      //attach an event to one of the id:
      //can JQuery redirect?:
      //window.location.replace("index.html");
      //request from server:
      //or use:
      var url = "index.html";
      $(location).attr("href", url);
    });
    
  });
} 

