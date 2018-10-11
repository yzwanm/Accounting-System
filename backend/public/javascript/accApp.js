

/* Function: createAccount()
Description: this function handles the clicking of the submit button for creating account data.
Values for id={user,password,...} are passed into the backend http://localhost:3000/createAccount so an
account may be added to the database.
class="create_account" is required for buttons and fields to work properly.
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
	$.post("http://localhost:3000/createAccount",{user: user,password: pass, first_name: fName, last_name: lName, dob: dob, age: age, sex:sex, income:income}, function(data) {;

	    
	}); 
    });
};
$(document).ready(createAccount);


