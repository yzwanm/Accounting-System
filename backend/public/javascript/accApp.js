

/* Function: createAccount()
Description: this function handles the clicking of the submit button for creating account data.
Values for id={user,password,...} are passed into the backend http://localhost:3000/createAccount so an
account may be added to the database.
*/
function createAccount() {
    $("#submit").click(function(e) {
	e.preventDefault();
	var user=$("#username").val();
	var pass=$("#password").val();
	var fName=$("#firstname").val();
	var lName=$("#lastname").val();
	var dob=$("#dob").val();
	var age=$("#age").val();
	var sex=$("#sex").val();
	var income=$("#income").val();
	//loading form data to be passed to the server
	var formData = new FormData();
	formData.append("user",user);
	formData.append("password",pass);
	formData.append("first_name",fName);
	formData.append("last_name",lName);
	formData.append("dob",dob);
	formData.append("age",age);
	formData.append("sex",sex);
	formData.append("income",income);
	if (($("#fileSelector"))[0].files.length > 0) {
	    //if there is a file we will place it in a variable
	    //and then append it to the formData
	    var photo = ($("#fileSelector"))[0].files[0];
	    formData.append("picture",photo,photo.name);
	}
	$("#submit").val("proccessing...");
	$.ajax({
	    url: 'http://localhost:3000/createAccount',
	    type: 'POST',
	    data: formData,
	    //async: false,
	    //cache: false,
	    contentType: false,
	    processData: false,
	    success: function (data) {
		if (data === "SUCCESS") {
		    //if the account was created successfully go to the following address
		    var url = "http://localhost:3000/login.html";
		    document.location.href = url;
		} else if (data === "ERR_USER_EXISTS")  {
		    //the user is already in the database
		    $("#textreply").text(user + " already exists");
		    $("#submit").val("Submit");
		} else if (data === "ERR_NO_USER") {
		    //user is null or empty
		    $("#textreply").text("User field is required");
		    $("#submit").val("Submit");
		} else if (data === "ERR_NO_PASS") {
		    //pass is null or empty
		    $("#textreply").text("password field is required");
		    $("#submit").val("Submit");
		} else if (data === "ERR_NO_FNAME") {
		    //fName is null or empty
		    $("#textreply").text("First Name field is required");
		    $("#submit").val("Submit");
		} else {
		    $("#textreply").text("an error has prevented you from signing up. (" + data + ")");
		    $("#submit").val("Submit");
		}
	    },
	    error: function () {
		alert("error: ajax failed to submit");
	    }
	});
    });
};
$(document).ready(createAccount);  

