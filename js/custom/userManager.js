$(document).ready(function(){

	trackUserDetails();
	handleQuote();
	displayPriceByQuoteRef();

});


let parseJSONdata = function(param){
  var jsonObj = JSON.parse(param);
  return jsonObj;
}


let trackUserDetails = function(){

	$("#get_shipment").click(function(event){

		//console.log("Hello Dear");
		var track_ref_code = $("#track_ref_code").val();
		//var refVal = $("#ref_code").val();
		console.log(track_ref_code);

		if(track_ref_code == ""){

			console.log("Empty!");

			$("#code_empty").html("Tracking or Reference code field cannot be empty!");
			$("#shipmentContents").hide();

		}else{

			console.log("Not Empty!");
			$("#code_empty").hide();
			$("#shipmentContents").show();

			var req = $.ajax({
        		url:"http://localhost/Emidex/EmidexBackend/public/v1/track_shipment",
        		method:"POST",//types
        		data:{
          			track_ref_code : track_ref_code
        		}
      		});

			req.done(function(resp){
				
				console.log(resp);
				//var resp = parseJSONdata(resp);

				if(resp.serverStatus == "fetchSuccess" && resp.code == 1){

					$("#search_success").html("Fetch Successful!");
					$("#loadingShipmentIcon").hide();

					var shipmentDetails = resp.readDetails;

					//console.log(shipmentDetails.shipmentDay);

					//fix obtained data into the UI:
					$("#user_ship_day").html(shipmentDetails.shipmentDay);
					$("#user_ship_month").html(shipmentDetails.shipmentMonth);
					$("#user_ship_year").html(shipmentDetails.shipmentYear);

					$("#user_ship_hour").html(shipmentDetails.shipmentHour);
					$("#user_ship_minute").html(shipmentDetails.shipmentMinute);
					$("#user_ship_second").html(shipmentDetails.shipmentSecond);

					$("#delivery_day").html(shipmentDetails.deliveryDay);
					$("#delivery_month").html(shipmentDetails.deliveyMonth);
					$("#delivery_year").html(shipmentDetails.deliveryYear);

					$("#ship_full_name").html(shipmentDetails.shiperFullName);
					$("#ship_address").html(shipmentDetails.shiperAddress);

					$("#receive_full_name").html(shipmentDetails.receiverFullName);
					$("#receive_address").html(shipmentDetails.receiverAddress);

					$("#user_price").html(shipmentDetails.price);
					//console.log("Price :" + shipmentDetails.price);

					$("#user_status").html(shipmentDetails.status);

					$("#user_commodity").html(shipmentDetails.commodity);
					$("#user_commodity_types").html(shipmentDetails.commodityTypes);
					$("#user_commodity_quantity").html(shipmentDetails.commodityQuantity);
					$("#user_commodity_content").html(shipmentDetails.commodityContent);

					$("#user_destination").html(shipmentDetails.destination);
					$("#user_origin").html(shipmentDetails.origin);
					$("#user_port_origin").html(shipmentDetails.portOrigin);

					$("#user_mode").html(shipmentDetails.mode);
					$("#user_weight_kgs").html(shipmentDetails.weight_kgs);
					$("#user_weight_cubic").html(shipmentDetails.weight_cubic);

					$("#user_allocation").html(shipmentDetails.allocation);
					$("#user_service_type").html(shipmentDetails.service_type);
					$("#user_size_type").html(shipmentDetails.size_type);

					$("#user_travel_history").html(shipmentDetails.shipmentTravelHistory);
					$("#user_add_info").html(shipmentDetails.add_info);

					$("#user_track_code").html(shipmentDetails.trackingCode);
					$("#user_ref_code").html(shipmentDetails.referenceCode);
					
				}else if(resp.serverStatus == "fetchError" && resp.code == 0){

					$("#loadingShipmentIcon").hide();
					$("div#userShipDetails").hide();
					$("#search_error").html(resp.short_description);

				}
			});

		}

	});
}


let handleQuote = function(){

	$("#details_submit").click(function(event){

		//get values

    	var shiperFullName = $("#fullName").val();
    	var shiperAddress = $("#shiperAddress").val();

    	var orgName = $("#orgName").val();
    	var userMail = $("#mail").val();
    	var userPhone = $("#phoneNumber").val();

    	var receiverFullName = $("#receiverFullName").val();
    	var receiverAddress = $("#receiverAddress").val();
   	
    	var commodity = $("#commodity").val();
    	var commodityTypes = $("#commodityTypes").val();
    	var commodityQuantity = $("#commodityQuantity").val();
    	var commodityContent = $("#commodityContent").val();

    	var destination = $("#destination").val();
    	var origin = $("#origin").val();
    	var portOrigin = $("#portOrigin").val();

    	var weight_kgs = $("#weight_kgs").val();
    	var weight_cubic = $("#weight_cubic").val();
    	var allocation = $("#allocation").val();

    	var service_type = $("#service_type").val();
    	var size_type = $("#size_type").val();
    	var add_info = $("#add_info").val();

    	//this is for the required input:
    	//var inputVal = $("input.required").val();

    	/*console.log(inputVal);
    	console.log(shiperFullName);*/

    	//validate here:
    	if(shiperFullName == "" || shiperAddress == "" || orgName == "" ||
    		userMail == "" || userPhone == "" || receiverFullName =="" ||
    		receiverAddress == "" || commodity == "" || commodityTypes == "" || 
    		commodityQuantity == "" || commodityContent == "" || destination == "" ||
    		origin == "" || portOrigin == "" || weight_kgs == "" || 
    		weight_cubic == "" || allocation == "" ||  service_type == "" || 
    		size_type == "") 
    	{ 

      		$(".validation").html("");
      		$(".validation").html("Field cannot be empty!");

      		$("div#submit_success").html("");

      		$("div#submit_fail").html("");
      		$("div#submit_fail").html("Some fields cannot be empty. Please fill up the necessary fields");

      		//$("p#quoteRefDisp").html("Cool Me");

      		$("div#quoteBody").hide();

    	}else{

    		//initialize the UI:
    		$(".validation").html("");
          	$("div#submit_fail").html("");
          	$("div#quoteBody").show();
          	$("div#quoteRefDisp").html("");

    		const BEARER_TOKEN = "RdRIaBLDM_4GZ__c9_mXR8EiEwSxVINC_nGREERTEeSE2baS@AmO1Iy_";

    		var req = $.ajax({

          		url:"http://localhost/Emidex/EmidexBackend/public/v1/save_and_get_quote_ref",
          		method:"POST",//type
          		headers: {
            		"Authorization": "Basic " + BEARER_TOKEN
          		},
          		data:{

            		shiperFullName: shiperFullName,
            		shiperAddress: shiperAddress,

            		receiverFullName: receiverFullName,
            		receiverAddress: receiverAddress,

            		orgName: orgName,
            		userMail: userMail,
            		userPhone: userPhone,


            		commodity: commodity,
            		commodityTypes: commodityTypes,
            		commodityQuantity: commodityQuantity,
            		commodityContent: commodityContent,

            		destination: destination,
            		origin: origin,
            		portOrigin: portOrigin,

            		weight_kgs: weight_kgs,
            		weight_cubic: weight_cubic,
            		allocation: allocation,

            		service_type: service_type,
            		size_type: size_type,
            		add_info: add_info

          		}

        	});


        	//start fixing data:
        	req.done(function(resp){

          		console.log(resp);
          		//parse JSON:
          		//var resp = parseJSONdata(resp);

          		if( (resp.code == 1) && (resp.serverStatus == "quoteRequestSaved") )
          		{	
          			//clear form:
          			$("form#quote_det").trigger("reset");

          			$("#submit_success").html("");
          			$("#submit_success").html("Quote Request Details Saved!");

          			//console.log(resp.quoteRefCode);

          			//attach quote reference number generated on the server side:
          			$("p#quoteRefDisp").html(resp.quoteRefCode); 

          		}else if( (resp.code == 0) && (resp.serverStatus == "saveFailed") )
          		{
          			$("#submit_fail").html("");
          			$("#submit_fail").html("Quote Request Details Not Saved. Please try again!");

          			$("p#quoteRefDisp").html(rep.short_description);
          		}

        	});


        	req.fail(function(){

        		$("div#quoteBody").hide();
        		$(".validation").html("");
        		$("#submit_success").html("");
          		$("div#submit_fail").html("Connection Error. Please check your internet connection!");
          		$("div#quoteRefDisp").html("");
          		
        	});
		}
	});
}


let displayPriceByQuoteRef = function(){

	$("#view_price_quote").click(function(event){

		console.log("Clicked");

		//get quote reference:
    	var quoteRefCode = $("#price_quote_ref").val();

    	if(quoteRefCode == ""){

    		$("#price_error").html("");
    		$("#price_retrieved").html("");
    		$("#price_quote_body").hide();

    		$("#price_error").html("Quote Reference Code cannot be empty. Please fill up the empty field.");

    	}else{

    		$("#price_error").html("");
			$("#price_quote_body").show();

			var req = $.ajax({

        		url:"http://localhost/Emidex/EmidexBackend/public/v1/quotes_and_pay_details",
        		method:"POST",//types
        		data:{
          			quoteRefCode : quoteRefCode
        		}

      		});


			req.done(function(resp){

				console.log(resp);

				if( (resp.code == 1) && (resp.serverStatus == "quoteDetailsObtained") ){

					$("#price_retrieved").html("");
					$("#price_retrieved").html("Quote / Price Retrieval Successful!");

					$("#price_quote").html(quoteRefCode);

					$("#price_quote_disp").html("");
					$("#pay_details_disp").html("");

					if(resp.priceDetails === null){
						$("#price_quote_disp").append("<span>Not Yet Available!</span><br/><span>Check again later...</span>");
					}else{
						$("#price_quote_disp").html(resp.priceDetails);
					}

					if(resp.paymentDetails === null){
						$("#pay_details_disp").append("<span>Not Yet Available!</span><br/><span>Check again later...</span>");
					}else{
						$("#pay_details_disp").html(resp.paymentDetails);
					}

				}else if( (resp.code == 0) && (resp.serverStatus == "quoteDetailsFetchFailed") ){

					$("#price_retrieved").html("");
					$("#price_quote").html("");

					$("#price_quote_display").html("");
					$("#pay_details_disp").html("");

					$("#price_quote_body").hide();
					$("#price_error").html(resp.short_description);

				}

			});


			req.fail(function(event){
				$("#price_retrieved").html("");
				$("#price_quote").html("");

				$("#price_quote_display").html("");
				$("#pay_details_disp").html("");

				$("#price_quote_body").hide();

				$("#price_error").html("Connection failed. Please check your internet service!");
			});

		}

	});
}

