let $ = function (id) { return document.getElementById(id); };

let volunteerArray = [];

let displayVolunteers = function () {
    // display the volunteers in the text area

    // VAR TO HOLD THE VOLUNTEER LIST ELEMENT
    let volList = $("volunteerList");
    // CLEAR THE VOLUNTEER LIST VALUE (TEXT)
    volList.value = "";
    // LOOP THROUGH THE ARRAY AND ADD EACH ELEMENT TO ITS OWN LINE WITHIN THE TEXT FIELD
	for (let i = 0; i < volunteerArray.length; i++){
        // USE A STRING LITERAL TO FORMAT THE APPENDED STRING
       volList.value += `${i + 1}. ${volunteerArray[i]}\n`;
    }
};

let addVolunteer = function () {
    // get the data from the form
    let volunteerString = $("first_name").value + " " + $("last_name").value;
    console.log(volunteerString);

    // store the data in an array
    volunteerArray.push(volunteerString);
    
    // display the volunteers and clear the add form
    displayVolunteers();
    
    // get the add form ready for next entry
    clearNameFields();
};


let deleteVolunteer = function () {
    // get the data from the form (hint: use the same format as from the add).
    let volunteerString = $("first_name").value + " " + $("last_name").value;
    // remove the string from the array (hint, loop through the entire list, compare the string with the item in the array).

    // GET THE INDEX OF THE VOLUNTEER'S NAME FROM THE VOLUNTEER ARRAY
	let index = volunteerArray.indexOf(volunteerString);

    // SPLICE ONLY ONE ELEMENT AT THE INDEX IN QUESTION
    if (index > -1) volunteerArray.splice(index, 1);
   
	 
    // display the volunteers and clear the add form
    displayVolunteers();
    
    // get the delete form ready for next entry
    clearNameFields();
};

// FUNCTION TO HANDLE CLEARING THE NAME FIELDS, GETS RID OF DUPLICATE CODE WITHIN THE FILE
let clearNameFields = () => {
    $("first_name").value = "";
    $("last_name").value = "";
    $("first_name").focus();
}

let clearList = function () {
    // delete the data from the arrays
    volunteerArray = [];
    
	//   alternative way to delete all the data from the array
	//    volunteerArray.length = 0;
    
    // remove the volunteers data from the web page
    $("volunteerList").value = "";
    
    $("first_name").focus();
};

let sortList = function () {
    // sort the scores
    volunteerArray.sort();
    
    // display the scores
    displayVolunteers();    
};

//When the page is fully loaded, the buttons will be mapped to the JavaScript functions
window.onload = function () {
    $("add_button").onclick = addVolunteer;
	$("delete_button").onclick = deleteVolunteer;
    $("clear_button").onclick = clearList;    
    $("sort_button").onclick = sortList;    
    $("first_name").focus();
};