

/* Function: createAccount()
Description: this function handles the clicking of the submit button for creating account data.
Values for id={user,password,...} are passed into the backend http://localhost:3000/createAccount so an
account may be added to the database.
*/
function createAccount() {
    var user,pass;
    $("#submit.create_account").click(function() {
	user=profile.username;
	pass=$("#password.create_account").val();
	fName=$("#firstname.create_account").val();
	lName=$("#lastname.create_account").val();
	dob=$("#dob.create_account").val();
	age=$("#age.create_account").val();
	sex=$("#sex.create_account").val();
	income=$("#income.create_account").val();
	$.post("http://localhost:3000/createAccount",{user: user,password: pass, first_name: fName, last_name: lName, dob: dob, age: age, sex:sex, income:income}, function(data) {
	    if (data === "SUCCESS") {
		//if the account was created successfully go to the following address
		var url = "http://localhost:3000/login.html";
		document.location.href = url;
	    } else if (data === "ERR_USER_EXISTS")  {
		//the user is already in the database
		alert(user + " already exists");
	    } else if (data === "ERR_NO_USER") {
		//user is null or empty
		alert("User field is required");
	    } else if (data === "ERR_NO_PASS") {
		//pass is null or empty
		alert("password field is required");
	    } else if (data === "ERR_NO_FNAME") {
		//fName is null or empty
		alert("First Name field is required");
	    } else {
		alert("an error has prevented you from signing up. (" + data + ")");
	    }
	}); 
    });
};
$(document).ready(createAccount);


