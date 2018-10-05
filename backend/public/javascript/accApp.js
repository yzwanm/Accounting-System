

/* Function: createAccount()
Description: this function handles the clicking of the submit button for creating account data.
Values for id={user,password,...} are passed into the backend http://localhost:3000/login to be added
to the database.  All buttons and fields need to have class="create_account" as an additional tag.
*/
function createAccount() {
    var user,pass;
    $("#submit").click(function() {
	user=$("#user.create_account").val();
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


