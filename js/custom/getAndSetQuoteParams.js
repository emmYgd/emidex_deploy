//global variables
window.quoteRefCode;

$(document).ready(function(){

  //hide by default:
  $("#quoteUpdateForm").hide();

  //get all saved quote reference codes:
  getAllQuoteRef();

  //update all param details through your quote ref details...
  getSpecificQuoteDetails();

  //update the shipment price and status:
  updatePriceAndPayDetails();
});


let  getAllQuoteRef = function(){

  $("#get_quote_ref").click(function(event){

    console.log("Clicked!");

    const BEARER_TOKEN = "RdRIaBLDM_4GZ__c9_mXR8EiEwSxVINC_nGREERTEeSE2baS@AmO1Iy_";

    var req = $.ajax({
      url:"http://localhost/Emidex/EmidexBackend/public/v1/get_all_quote_ref_codes",
      method:"GET",//type
      headers:{
        "Authorization" : "Basic " + BEARER_TOKEN 
      }
    });

    req.done(function(resp){
      console.log(resp);

      if( (resp.serverStatus == "readAllQuoteRefSuccess") && (resp.code == 1) ){

        $("#ref_codes_found").html("");
        $("#ref_codes_error").html("");
        $("p#all_quote_ref").html("");

        if(resp.quote_ref_codes.length == 0)
        {
          $("#ref_codes_error").html("Quote Query Empty! No user has made any quote requests");
        }
    
          
        //iterate through all the keys and values in the json:
        $.each(resp.quote_ref_codes, function(key, value) {

          console.log(key, value);

          //display this to the client...
          //$("#viewAllDetailsBtn").hide();
          var keyUIrender  = "<span>" + key + ":" + "</span>";
          var valueUIrender = "<span>" + value + "</span>";

          $("#ref_codes_found").html("Quote Reference Codes found!");
          $("p#all_quote_ref").append("<br/><p>" + keyUIrender + "" + "" + valueUIrender + "</p><br/>");
          
        });

      }else if( (code == 0)  && (serverStatus == "readAllQuoteRefError") )
      {

        $("#ref_codes_found").html("");
        $("#ref_codes_error").html("");
        $("p#all_quote_ref").html("");

        $("#ref_codes_error").html(resp.short_description);

      }

    });

    //handle failure now:
    req.fail(function(){

      $("#ref_codes_found").html("");
      $("#ref_codes_error").html("");
      $("p#all_quote_ref").html("");

      $("#ref_codes_error").html("Failed to retrieve quote reference codes generated so far. Please, check your internet connection and retry!");
    });

  });
}



let getSpecificQuoteDetails = function(){

  $("#view_quote_details").click(function(event){

    console.log("Search is here!");

    var quote_ref_code = $("#quoteRefCode").val();
    //console.log(quote_ref_code);
    

    if( quote_ref_code == ""){

      //event.preventDefault();
      $("#quote_details_success").html("");
      $("#quote_details_disp").html("");

      $("#quote_details_fail").html("Field cannot be empty!");
      
    }else{

      $("#quote_details_success").html("");
      $("#quote_details_fail").html("");
      $("#quote_details_disp").html("");

      const BEARER_TOKEN = "RdRIaBLDM_4GZ__c9_mXR8EiEwSxVINC_nGREERTEeSE2baS@AmO1Iy_";
      //console.log(quote_ref_code);
      var req = $.ajax({
        url:"http://localhost/Emidex/EmidexBackend/public/v1/get_quote_with_ref",
        method:"POST",//type
        headers:{
          "Authorization" : "Basic " + BEARER_TOKEN 
        },
        data:{
          quote_ref_code: quote_ref_code
        }
      });

      req.done(function(resp){
        console.log(resp);
        //var resp = parseJSONdata(resp);

        if( (resp.serverStatus == "fetchSuccess") && (resp.code == 1) ){

          $("div#quote_details_success").html("Successfully fetched User Quote details");

          //attach current quote ref code to windows properties:
          window.quoteRefCode = quote_ref_code;


          //iterate through all the keys and values in the json:
          $.each(resp.readDetails, function(key, value) {

              console.log(key, value);

            //display this to the client...
            //$("#viewAllDetailsBtn").hide();
            var keyUIrender  = "<span>" + key + "" + ":" + "" + "</span>";
            var valueUIrender = "<span>" + value + "</span>";

            $("#quote_details_disp").append("<b><p>" + keyUIrender + "" + valueUIrender + "</p></b>");
          });

          //show the update modal:
          $("#quoteUpdateForm").show();

        }else if( (resp.serverStatus == "fetchError") && (resp.code == 0) ){

          $("#quote_details_success").html("");
          $("#quote_details_fail").html("");
          $("#quote_details_disp").html("");

          $("#quote_details_fail").html(resp.short_description);

        }
      });

      req.fail(function(){

        $("#quote_details_success").html("");
        $("#quote_details_fail").html("");
        $("#quote_details_disp").html("");

        $("#quote_details_fail").html("Please, check your internet services");

      });

    }
  });
}



let updatePriceAndPayDetails = function(){

  $("#pay_price_update").click(function(event){

    console.log("Update is here!");

    var quoteRefCode = window.quoteRefCode;

    $("#qRef").html("");
    $("#qRef").html(quoteRefCode);

    var price_to_update = $("#quotePriceUpdate").val();
    var pay_details_to_update = $("#payDetailsUpdate").val();
    

    if( ( pay_details_to_update == "") && (price_to_update == "") ){

      $("#updateParamFail").html("");
      $("#updateParamSuccess").html("");

      $("#updateParamFail").html("At least one field should be filled!");

    }else{

      $("#updateParamFail").html("");
      $("#updateParamSuccess").html("");

      //$("").html("");

      const BEARER_TOKEN = "RdRIaBLDM_4GZ__c9_mXR8EiEwSxVINC_nGREERTEeSE2baS@AmO1Iy_";

      var req = $.ajax({

        url:"http://localhost/Emidex/EmidexBackend/public/v1/update_prices_and_payment_details",
        method:"POST",//type
        headers:{
          "Authorization" : "Basic " + BEARER_TOKEN 
        },
        data:{

          quoteRefCode: quoteRefCode,
          price_to_update: price_to_update,
          pay_details_to_update: pay_details_to_update

        }
      });

      req.done(function(resp){

        console.log(resp);

        if( (resp.serverStatus == "updateSuccess") && (resp.code == 1) ){

          $("form#quoteUpdateForm").trigger("reset");

          $("#quote_details_disp").html("");
          
           //iterate through all the keys and values in the json:
          $.each(resp.updatedDetails, function(key, value) {

            console.log(key, value);

            //display this to the client...
            //$("#viewAllDetailsBtn").hide();
            var keyUIrender  = "<span>" + key + "" + ":" + "" + "</span>";
            var valueUIrender = "<span>" + value + "</span>";

            $("#quote_details_disp").append("<b><p>" + keyUIrender + "" + valueUIrender + "</p></b>");

          });

          $("#updateParamSuccess").html("Successfully updated price and peyment details!");


        }else if( (resp.serverStatus == "updateFailed") && (resp.code == 0) ){

          $("#updateParamFail").html("");
          $("#updateParamSuccess").html("");

          $("#updateParamFail").html(resp.short_description);

        }
      });

      req.fail(function(){

        $("#updateParamFail").html("");
        $("#updateParamSuccess").html("");
        $("#updateParamFail").html("Please, check your internet connection");

      });

    }

  });

} 