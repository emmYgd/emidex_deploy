$(document).ready(function(){
  contactSubmit();
});


let contactSubmit = function(){
  //Now call the object literal method when button is clicked:
  $("#contact_submit").click(function(event){
    event.preventDefault();
      
    //get the values of the user details:
    var fullName = $("#full_name").val();
    var orgName = $("#org_name").val();
    var position = $("#position").val();
    var webPresence = $("#web_presence").val();
    var email = $("#email").val();
    var subject = $("#subject").val();
    var message = $("#message").val();

    //ensure validation first:

    if(fullName == ""){
      $("#full_name").get(0).setCustomValidity('Cannot be empty!');
      $("#full_name").get(0).reportValidity();
    }else if(fullName.length<4){
      $("#full_name").get(0).setCustomValidity('Length cannot be less than 4!');
      $("#full_name").get(0).reportValidity();
    }else if(orgName == "" ){
      $("#org_name").get(0).setCustomValidity('Cannot be empty!');
      $("#org_name").get(0).reportValidity();
    }else if(orgName.length<4){
      $("#org_name").get(0).setCustomValidity('Length cannot be less than 4!');
      $("#org_name").get(0).reportValidity();
    }else if(position == ""){
      $("#position").get(0).setCustomValidity('Cannot be empty!');
      $("#position").get(0).reportValidity();
    }else if(position.length<4){
      $("#position").get(0).setCustomValidity('Length cannot be less than 4!');
      $("#position").get(0).reportValidity();
    }else if(webPresence == ""){
      $("#web_presence").get(0).setCustomValidity('Cannot be empty!');
      $("#web_presence").get(0).reportValidity();
    }else if(webPresence.length<4 ){
      $("#web_presence").get(0).setCustomValidity('Length cannot be less than 4!');
      $("#web_presence").get(0).reportValidity();
    }else if(email == ""){
      $("#email").get(0).setCustomValidity('Cannot be empty!');
      $("#email").get(0).reportValidity();
    }else if(email.length<4){
      $("#email").get(0).setCustomValidity('Length cannot be less than 4!');
      $("#email").get(0).reportValidity();
    }else if(subject == ""){
      $("#subject").get(0).setCustomValidity('Cannot be empty!');
      $("#subject").get(0).reportValidity();
    }else if(subject.length<4){
      $("#subject").get(0).setCustomValidity('Length cannot be less than 4!');
      $("#subject").get(0).reportValidity();
    }else if(message == ""){
      $("#message").get(0).setCustomValidity('Cannot be empty!');
      $("#message").get(0).reportValidity();
    }else if(message.length<4){
      $("#message").get(0).setCustomValidity('Length cannot be less than 4!');
      $("#message").get(0).reportValidity();
    }else{

      //console.log(position);

      //console.log(fullName);
      //alert("Hey");

        //After Validation:
        //call ajax on the inputed value;
        var req = $.ajax({
          url: "Backend/sendMail.php",
          method:"post",
          //dataType:"JSON",
          data:{
            fName: fullName, 
            oName: orgName, 
            pos: position, 
            webPr: webPresence, 
            mail: email, 
            sub: subject, 
            mess: message
          }
        });

        console.log(req);

        req.done(function(resp){
          console.log(resp);
          //alert("Hey You");

          if(resp == "success"){
            //clear form:
            $("form").trigger("reset");
            //sent successfully->
            $("#sentSuccess").html("Your message has been sent. Thank you! We will get back to you soon.");
          }else{
            $("#errorMessage").html("Message not sent, please try again later");
          }
        });

        req.fail(function(){
          $("#errorMessage").html("Message not sent, please check your internet connection");
        });
      }
  });
}

 
  /*var ClientServerComm = async function(jsonObject){

    console.log(contactInfo);
    //send over to the server:
    $.ajax({
      url:"../option1/Backend/ImplementContact.php",
      type:"POST",
      //mimeType: "application/json"
      //contentType: "application/json"
      data:{userInfo : JSON.stringify(contactInfo)},
      dataType : "json",
      processData : false,
      beforeSend : function(x){
        if(x && x.overrideMimeType){
          x.overrideMimeType("application/json; charset=UTF-8");
        }
      },
      success : function(result){
        if(result == "SUCCESS!"){
          //Tell the User that they are successfully registered here...
          //Hide all elements,
          //Display Success
          alert("Mail sent successfully!");
        }
      },
      error : function(err){
        //Indicate the error message...
        //if(err == "FAILURE!"){
          alert("Error in server Comms!");
        //}
      }
    });
  }*/
