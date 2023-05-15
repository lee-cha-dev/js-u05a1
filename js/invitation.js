//function created to replace the content
function replaceContent() {
	//declaring the variables
	let myRecipientName;
	let hostName;

	//setting the variable to the input field's id named recipientNameInput's value
	myRecipientName = document.getElementById("recipientNameInput").value;

	// SET HOST NAME TO HOST NAME INPUT VALUE ON INVITATION.HTML
	hostName = document.getElementById("hostNameInput").value;
	
	console.log('Variable myRecipientName: ' + myRecipientName);

	// DEBUG OUTPUT IN WEB CONSOLE
	console.log(`Variable hostName: ${hostName}`);

	//setting the HTML code in the span id recipientNamePlaceholder with the variable 
	document.getElementById("recipientNamePlaceholder").innerHTML = myRecipientName;

	// SET HOST NAME TO VAR HOST NAME WITHIN THE FORM
	document.getElementById("hostNamePlaceholder").innerHTML = hostName;
} 