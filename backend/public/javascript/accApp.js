

/* Function: createAccount()
Description: this function handles the clicking of the submit button for creating account data.
Values for id={user,password,...} are passed into the backend http://localhost:3000/createAccount so an
account may be added to the database.
class="create_account" is required for buttons and fields to work properly.
*/
function createAccount() {
    var user,pass;
    $("#submit.create_account").click(function() {
	user=$("#username.create_account").val();
	pass=$("#password.create_account").val();
	//.post is an asychronous function
	$.post("http://localhost:3000/createAccount",{user: user,password: pass}, function(data) {

	    
	    //////////////////////////////
	    /*replace with desired code */
	    //////////////////////////////
	    alert(data);

	    
	}); 
    });
};
$(document).ready(createAccount);


