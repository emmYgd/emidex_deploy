$(document).ready(function(){
	//Main Page:
	showlearnMore();
	showMoreSkills();

	//Blog Page:
	readMoreBlog();

	//Admin Page:
	showTransactionHistory();
	showPendingTransactions();
	uploadBlogPost();

	//SignUp:
	passwordVisual();
	passwordConfirmClient();
	//signUpBtn_HandOver();

	//LoginPage:
	passwordVisualLogin();

	//whatsapp Chat:
	whatsappChat();
});

//Main Page:
let showlearnMore = function(){
	//get the learn More section ID and hide:
	$("#learnMoreSection").hide();

	//Monitor the learn More button for click:
	$("#learnMore").click(function(){
		//alert("Hello World");
		$("#learnBtnSection").hide();
		$("#learnMoreSection").show();
	});
};

let showMoreSkills = function(){
	//get the show more section ID and hide:
	$("#moreSkillsSection").hide();

	//Monitor the show More skills button for click:
	$("#moreSkillsBtn").click(function(){
		$("#moreSkillsBtn").hide();
		$("#moreSkillsSection").show();
	});
};


//Blog Page
let readMoreBlog = function(){
	//get the div to hide:
	$("#leftAlternative").hide();

	//Now monitor all button in the left section:
	$("a.btn").click(function(){
		$("#firstShow").hide();
		$("#navPart").hide();
		$("#leftAlternative").show();
	}); 
};


//Admin Page:
let showTransactionHistory = function(){
	//hide display section by default:
	$("#historyDisplay").hide();

	$("#viewHistory").click(function(ev){
		ev.preventDefault();
		$("#viewHistory").hide();

		//now display the transaction history section here:
		$("#historyDisplay").show();
	});
};

let showPendingTransactions = function(){
	//hide display section by default:
	$("#pendingTrans").hide();

	$("#approvePending").click(function(ev){
		ev.preventDefault();
		$("#approvePending").hide();

		//show the pending transactions section here:
		$("#pendingTrans").show();
	});
};

let uploadBlogPost = function(){
	//hide the blog update section by default:
	//$("#blogSection").hide();

	/*$("#updateBlog").click(function(ev){
		//ev.preventDefault();
		//$("#updateBlog").hide();

		//show the blog update section here:
		$("#blogSection").show();
	});*/
};



//SignUp:
let passwordVisual = function(){
	//hide the password symbol:
	$("#pass_hide").hide();

	$("#pass_show").click(function(event){

		event.preventDefault();

		//hide this:
		$("#pass_show").hide();

		//show this:
		$("#pass_hide").show();

		//set the password and confirm password to text:
		//$("input").attr("type", "text")
		$("#adminPass").attr("type", "text");
	});

	$("#pass_hide").click(function(event){

		event.preventDefault();

		//hide this:
		$("#pass_hide").hide();

		//show this:
		$("#pass_show").show();

		//set the password and confirm password to hidden:
		//$("input").attr("type", "password")
		//$("#password1").attr("type", "password");
		$("#adminPass").attr("type", "password");
	});
};

let passwordConfirmClient = function(){

	$("#password1").on("change", validatePassword);
	$("#password2").on("change", validatePassword);
};

function validatePassword() {
	var pass1 = $("#password1").val();
	var pass2 = $("#password2").val();

	/*console.log(pass1)
	console.log(pass2)*/

	if (pass1 !== pass2)
		$("#password2").get(0).setCustomValidity("Passwords Don't Match");
	else
		$("#password2").get(0).setCustomValidity("Password Matched");
	//empty string means no validation error
};

/*let signUpBtn_HandOver = function(){
	//Hide loading first:
	$("#loading").hide();
	/*$("#signUp").click(function(){
	});
};*/

//LoginPage:
let passwordVisualLogin = function(){
	//for login page:
		$("#show_tag").click(function(){

			//hide this:
			$("#show_tag").hide();

			//show this:
			$("#hide_tag").show();

			//set the password and confirm password to text:
			//$("input").attr("type", "text")
			$("#password").attr("type", "text");
		});

		$("#hide_tag").click(function(){
			//hide this:
			$("#hide_tag").hide();

			//show this:
			$("#show_tag").show();

			//set the password and confirm password to hidden:
			//$("input").attr("type", "password")
			$("#password").attr("type", "password");
		});
}

//Whatsapp function:
let whatsappChat = function(){
	$("a#whatsappChat").click(function(ev){
		ev.preventDefault();
		//console.log("Hello World");
		//connect to external whatsapp API:
		var url = "https://api.whatsapp.com/send?phone=2347036766830";
		$(location).attr("href", url);
	});
}

