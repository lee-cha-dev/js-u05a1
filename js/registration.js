// GLOBAL VARIABLES

// STRING TO HOLD FORM MESSAGE
let globalInvalidField = "";

// REQUIRED ELEMENTS FOR FORM
const globalRequiredFields = [
    document.getElementById("userName"),
    document.getElementById("firstName"),
    document.getElementById("lastName"),
    document.getElementById("password"),
    document.getElementById("passwordVerify")
];

// ON SUBMIT FOR FORM
document.getElementById("submit-form").addEventListener('submit', (e) => {
    // TURNS OFF PAGE REFRESH TO ALLOW SUBMIT MESSAGE TO BE SHOWN
    e.preventDefault();
});

function configureFormValidation(){
    // SET REQUIRED FIELD
    for (let idx in globalRequiredFields){
        globalRequiredFields[idx].required = true;
        console.log(`HTML required field validation configured for ${globalRequiredFields[idx].id}`);
    }

    // GET ALL TEXT FIELDS
    let allFieldElems = getFieldElements();

    // CHARACTERS ACCEPTABLE BY USERNAME, PASSWORD, AND PHONE -- SET PATTERNS
    allFieldElems["userName"].pattern = "[A-Za-z]{1,}$"         // FOUR CHARACTERS OR MORE
    allFieldElems["firstName"].pattern = "\\S+$";
    allFieldElems["lastName"].pattern = "\\S+$";
    allFieldElems["password"].pattern = "\\w{8,}"                     // 8 OR MORE CHARS
    allFieldElems["passwordVerify"].pattern = "\\w{8,}"                     // 8 OR MORE CHARS
    allFieldElems["email"].pattern = "^\\S+@\\S+\\.\\S+$";

    // BY SPECIFYING THE NUMBER OF DIGITS AND THE SURROUNDING CHARACTERS, PHONE NUMBERS
    // SOCIAL SECURITY NUMBERS AND OTHER PATTERNS CAN BE VERIFIED
    allFieldElems["phoneNumber"].pattern = "^\\(\\d{3}\\) \\d{3}-\\d{4}$"    // (THREE DIGITS)THREE DIGITS-FOUR DIGITS

    allFieldElems["passwordVerify"].onchange = handlePasswordMatch;

}

function verifyForm(){

    // INPUT TEXT FIELD ELEMENTS TO BE REFERENCED
    const allFieldElems = getFieldElements();

    // CLEARS ANY WARNINGS SO THAT THE FIELDS CAN BE RE-EVALUATED
    clearWarnings(
        [
            allFieldElems["userName"], allFieldElems["password"], allFieldElems["passwordVerify"],
            allFieldElems["phoneNumber"], allFieldElems["firstName"], allFieldElems["lastName"], allFieldElems["email"]
        ]
    );
    // HIDE THE SUBMIT FORM BUTTON TO ENSURE VALIDATION TAKES PLACES
    document.getElementById("submit-button").style.display = "none";

    // FORM TO BE SUBMITTED
    let form = document.getElementsByTagName("form")[0];

    // CHECK FOR EMPTY FIELDS AND HANDLE NOTIFYING THE USER
    if (!form.checkValidity()
    ){
        // IDENTIFY EMPTY FIELDS AND HIGHLIGHT THEM FOR USER -- THIS RETURNS FALSE TO PRIORITIZE EMPTY FIELDS
        if(!checkForIncompleteFields([
            allFieldElems["userName"], allFieldElems["password"], allFieldElems["passwordVerify"],
            allFieldElems["firstName"], allFieldElems["lastName"], allFieldElems["formMessage"]
        ])
        ) return false;

        // IDENTIFY INVALID FIELDS AND EMPHASIZE THEM FOR USER
        if (!checkInput(allFieldElems["userName"], allFieldElems["password"], allFieldElems["passwordVerify"],
            allFieldElems["phoneNumber"], allFieldElems["firstName"], allFieldElems["lastName"],
            allFieldElems["email"], allFieldElems["formMessage"])) {
            // SET FORM MESSAGE TO DARKRED IN COLOR, BOLD FONT, AND UPDATE
            // TEXT TO REFLECT WHICH FIELD IS CURRENTLY INVALID
            allFieldElems["formMessage"].style.color = "darkred";
            allFieldElems["formMessage"].style.fontWeight = "bold";
            allFieldElems["formMessage"].innerText = globalInvalidField;
            console.log(globalInvalidField);
            console.log("not correct inputs.");
            return false;
        }
    } else if (!checkPasswordMatch(
        allFieldElems["password"], allFieldElems["passwordVerify"], allFieldElems["formMessage"])
    ){
        // PREVENT SUBMISSION IF PASSWORDS DO NOT MATCH
        return false;
    }

    // SET FORM MESSAGE TO GREEN AND PASS A AFFIRMATIVE MESSAGE TO USER
    allFieldElems["formMessage"].style.color = "darkorange";
    allFieldElems["formMessage"].style.fontWeight = "bold";
    allFieldElems["formMessage"].innerText = "Form is ready to be submitted. Please review and press submit.";
    console.log("Form is valid.");

    // MAKE THE SUBMIT BUTTON VISIBLE NOW THAT THE FORM HAS BEEN VALIDATED.
    document.getElementById("submit-button").style.display = 'flex';
    return true;
}

function getFieldElements(){
    return {
        "userName": document.getElementById("userName"),
        "firstName": document.getElementById("firstName"),
        "lastName": document.getElementById("lastName"),
        "password": document.getElementById("password"),
        "passwordVerify": document.getElementById("passwordVerify"),
        "email": document.getElementById("email"),
        "phoneNumber": document.getElementById("phoneNumber"),
        "formMessage": document.getElementById("formMessage")
    }
}

// SUBMIT FORM WITH SUBMIT BUTTON AFTER VALIDATION
function submitForm(){
    // A SECOND CALL TO VALIDATE THE FORM IN THE CASE THE USER CHANGES A FIELD BETWEEN VALIDATION
    // AND SUBMISSION
    if (!verifyForm()){
        // HIDE THE SUBMIT BUTTON NOW THAT THE FORM HAS BEEN INVALIDATED BY THE USER.
        document.getElementById("submit-button").style.display = 'none';

        // RETURN SO THE FORM DOES NOT GET SUBMITTED
        return;
    }

    // INPUT TEXT FIELD ELEMENTS TO BE REFERENCED -- DUPLICATE TO AVOID EXCESS GLOBAL VARIABLES
    const allFieldElems = getFieldElements();

    // GET NEWSLETTER SIGN UP, IF YES/NO ASSIGN THE CORRECT TEXT VALUE;
    const newsLetterElem = document.getElementById("signUpNewsLetterYes");
    let newsLetter;
    if (newsLetterElem.checked){
        newsLetter = ["signUpNewsLetter", "Yes"];
    } else { newsLetter = ["signUpNewsLetter", "No"]; }

    createCookies(
        [
            allFieldElems["userName"],
            allFieldElems["password"],
            allFieldElems["firstName"],
            allFieldElems["lastName"],
            allFieldElems["email"],
            allFieldElems["phoneNumber"],
            newsLetter
        ]
    );


    // CLEAR TEXT FIELDS TO ALLOW FOR THE NEXT SUBMISSION -- PASS IN AS ARRAY TO ALL
    // FOR SAME LOGIC TO BE EXECUTED FOR ALL ELEMENTS
    clearFields([allFieldElems["userName"], allFieldElems["password"], allFieldElems["passwordVerify"],
        allFieldElems["firstName"], allFieldElems["lastName"], allFieldElems["email"], allFieldElems["phoneNumber"]]);


    // UPDATE FORM MESSAGE TO PROVIDE A SUCCESS MESSAGE TO THE USER FOR SUBMITTING THE FORM.
    allFieldElems["formMessage"].style.color = "green";
    allFieldElems["formMessage"].style.fontWeight = "bold";
    allFieldElems["formMessage"].innerText = "Form has been submitted.";

    console.log("Form has been submitted.");

    // HIDE THE SUBMIT FORM BUTTON TO ENSURE VALIDATION TAKES PLACES
    document.getElementById("submit-button").style.display = "none";

    // ROUTE TO CONFIRMATION PAGE
    window.location.href = "confirm.html";
}

function checkInput(userName, password, passwordVerify, phoneNumber, firstName, lastName, email, formMessage){
    // // CHARACTERS ACCEPTABLE BY USERNAME, PASSWORD, AND PHONE
    const usernamePattern = "[A-Za-z]{1,}$"         // FOUR CHARACTERS OR MORE
    const namePattern = "\\S+$";
    const passwordPattern = "\\w{8,}"                     // 8 OR MORE CHARS
    const emailPattern = "^\\S+@\\S+\\.\\S+$";

    // // BY SPECIFYING THE NUMBER OF DIGITS AND THE SURROUNDING CHARACTERS, PHONE NUMBERS
    // // SOCIAL SECURITY NUMBERS AND OTHER PATTERNS CAN BE VERIFIED
    let phonePattern = "^\\(\\d{3}\\) \\d{3}-\\d{4}$"    // (THREE DIGITS)THREE DIGITS-FOUR DIGITS

    // IF ANY OF THE PATTERS DO NOT MATCH THEN THE FUNCTION RETURNS FALSE -- FOR MANDATORY FIELDS
    if(!userName.value.match(usernamePattern)) { handleInvalidField(userName.id, "User Name"); return false; }
    if(!password.value.match(passwordPattern)) { handleInvalidField(password.id,"Password"); return false; }
    if(!passwordVerify.value.match(passwordPattern)) { handleInvalidField(passwordVerify.id, "Password Verify"); return false; }
    if(!firstName.value.match(namePattern)) { handleInvalidField(firstName.id, "First Name"); return false; }
    if(!lastName.value.match(namePattern)) { handleInvalidField(lastName.id, "Last Name"); return false; }

    // MATCHES PATTERNS IF THE FIELD IS NOT EMPTY -- FOR OPTIONAL FIELDS
    if(!email.value.match(emailPattern) && email.value !== "") { handleInvalidField(email.id, "Email"); return false; }
    if(!phoneNumber.value.match(phonePattern) && phoneNumber.value !== "") { handleInvalidField(phoneNumber.id, "Phone Number"); return false; }

    // AT THIS POINT ALL PATTERNS MATCH AND WILL BE RETURNED AS TRUE;
    return true;
}

// CLEAR FIELDS AND WARNINGS
function clearFields(textFields){
    // SET ALL TEXT FIELD VALUES TO AN EMPTY STRING
    for (let idx in textFields){
        textFields[idx].value = "";

        // REMOVE ANY RED BORDER LEFT OVER FROM A MISSED FIELD
        textFields[idx].style.borderColor = "";
    }
}

// ONLY CLEAR WARNINGS
function clearWarnings(elems){
    for (let idx in elems){
        // REMOVE ANY WARNING MESSAGE FROM THE SPAN WITHIN THE LABEL
        document.getElementById(`${elems[idx].id}Warning`).innerText = "";
        elems[idx].style.borderColor = "";
    }

    // REMOVE THE FORM MESSAGE
    document.getElementById("formMessage").innerText = "";

    // CLEAR GLOBAL INVALID FIELD TEXT
    globalInvalidField = "";
}

function handleIncompleteForm(incompleteElemName, elem, formMessage, isFirst){
    // ALERT USER TO EMPTY TEXT FIELD AND SET THE COLORS TO DARKRED AND FONT TO BOLD
    document.getElementById(`${incompleteElemName}Warning`).innerText = `This field is required`
    document.getElementById(`${incompleteElemName}Warning`).style.color = 'darkred';
    document.getElementById(`${incompleteElemName}Warning`).style.fontWeight = 'bold';

    // SET MISSING TEXT FIELD BORDER TO RED
    elem.style.borderColor = 'darkred';

    // IF NULL OR EMPTY, THEN OUTPUT RED WARNING TEXT TO THE
    // RESULT MESSAGE TEXT FIELD
    formMessage.style.color = "darkred";
    formMessage.style.fontWeight = "bold";
    formMessage.innerText = "Form is not complete.";
    console.log("Form is incomplete.");

    // FOCUS ON FIRST EMPTY ELEM
    if (isFirst) elem.focus();

    return false;
}

function handleInvalidField(elem, elemName){
    // IF ANY FIELD IS INVALID THE TEXT, COLOR, AND FONT FOR THE SPAN WARNING WILL BE SET
    // AND THE GLOBAL INVALID FIELD WILL BE UPDATE TO REFLECT THE ELEMENT NAME BEING INVALID
    document.getElementById(`${elem}Warning`).innerText = `This field is invalid`
    document.getElementById(`${elem}Warning`).style.color = 'darkred';
    document.getElementById(`${elem}Warning`).style.fontWeight = 'bold';
    document.getElementById(`${elem}`).style.borderColor = 'darkred';

    globalInvalidField = `${elemName} is not valid.`;

    // PUTS FOCUS ON ELEMENT THAT IS INVALID
    document.getElementById(elem).focus();
}

//[username, password, passwordVerify, firstName, lastName, formMessage]
function checkForIncompleteFields(elems){
    // BOOLEAN TO PASS BACK TO NOTIFY WHETHER THE TEXT FIELDS ARE EMPTY
    let isComplete = true;

    let emptyElems = true;

    // HANDLER IS CALLED ANYTIME A TEXT FIELD IS FOUND TO BE EMPTY OR NULL
    for (let idx = 0; idx < elems.length - 1; idx++){
        if (elems[idx].value === "" || elems[idx].value === null){
            // IS COMPLETE IS PASSED BACK FROM THE HANDLER
            isComplete = handleIncompleteForm(elems[idx].id, elems[idx], elems[elems.length - 1], emptyElems);
            // IF IS COMPLETE RETURNS FALSE, THEN THE LAST ELEMENT IS THE FIRST INCOMPLETE ELEMENT -- FOCUS ON
            if (!isComplete) emptyElems = false;
        }
    }

    // HANDLER RETURN FALSE TO 'isComplete' IN THE CASE OF EMPTY FIELD, ELSE RETURN TRUE
    return isComplete;
}

function handlePasswordMatch(){
    const allFieldElems = getFieldElements();
    // CLEARS ANY WARNINGS SO THAT THE FIELDS CAN BE RE-EVALUATED
    clearWarnings(
        [allFieldElems["userName"], allFieldElems["password"], allFieldElems["passwordVerify"],
            allFieldElems["phoneNumber"], allFieldElems["firstName"], allFieldElems["lastName"], allFieldElems["email"]]
    );
    // IF THE PASSWORDS MATCH SET VALIDITY TO EMPTY STRING, ELSE SET IT TO PASSWORDS MUST MATCH WITH FOCUS ON
    if (checkPasswordMatch(allFieldElems["password"], allFieldElems["passwordVerify"], allFieldElems["formMessage"])){
        allFieldElems["passwordVerify"].setCustomValidity("");
    } else {
        allFieldElems["passwordVerify"].setCustomValidity("Passwords must match");
        allFieldElems["passwordVerify"].focus();
    }
}

function checkPasswordMatch(password, passwordVerify, formMessage){
    // HIDE THE SUBMIT FORM BUTTON TO ENSURE VALIDATION TAKES PLACES
    document.getElementById("submit-button").style.display = "none";
    // IF THE PASSWORDS DO NOT MATCH, THEN SET SPAN WARNING TEXT VALUE TO SHOW AS MUCH
    if (password.value !== passwordVerify.value){
        let warning = document.getElementById(`${password.id}Warning`);
        warning.innerText = `Passwords must match`;
        warning.style.color = 'darkred';
        warning.style.fontWeight = 'bold';
        password.style.borderColor = 'darkred';
        passwordVerify.style.borderColor = 'darkred';

        // UPDATE GLOBAL INVALID FIELD TO REFLECT THE CURRENT INVALID FIELD
        globalInvalidField = "Passwords do not match."

        // IF NULL OR EMPTY, THEN OUTPUT RED WARNING TEXT TO THE
        // RESULT MESSAGE TEXT FIELD
        formMessage.style.color = "darkred";
        formMessage.style.fontWeight = "bold";
        formMessage.innerText = globalInvalidField;
        console.log(globalInvalidField);

        // RETURN FALSE DUE TO INVALID ENTRY
        return false;
    }
    // RETURN TRUE IN THE CASE THAT THE PASSWORDS MATCH
    return true;
}


// WEEK 5 ASSIGNMENT CODE STARTS HERE
function createCookies(dataArr, daysToExpire) {
    console.log(`Cookies enabled: ${navigator.cookieEnabled}`);
    console.log(`dataArr.length: ${dataArr.length}`);
    // FOR EACH ELEMENT PASSED INTO THE DATA ARRAY CALL SET COOKIE TO CREATE A NEW COOKIE/UPDATE AN EXISTING ONE
    // BESIDES THE NEWSLETTER RADIO BUTTON(S).
    for (let idx = 0; idx < dataArr.length - 1; idx++) {
        if (dataArr[idx].value === null || undefined){
            // THE COOKIE NEEDS TO BE AN EMPTY STRING TO BE
            // HANDLED CORRECTLY IN THE CONFIRM.JS FILE
            clearCookie(dataArr[idx].id, daysToExpire);
        } else {
            setCookie(dataArr[idx].id, dataArr[idx].value, daysToExpire);
        }

    }
    // SET THE NEWSLETTER RADIO COOKIE USING THE ARRAY THAT WAS PASSED IN
    setCookie(dataArr[dataArr.length - 1][0], dataArr[dataArr.length - 1][1], daysToExpire);

    // alert(document.cookie);
}

// FUNCTION TO HANDLE CREATING INDIVIDUAL COOKIES
function setCookie(name, value, daysToExpiration){
    // GET AND SET DATE TO NUMBER OF DAYS (IN MILLISECONDS)
    const date = new Date();
    date.setTime(date.getTime() + daysToExpiration * 24 * 60 * 60 * 1000);

    // CONVERT DATE TO A UTC STRING
    const expires = date.toUTCString();

    // ADD COOKIE
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};SameSite=Lax;`;
}

// FUNCTION TO HANDLE DELETING COOKIES
function clearCookie(name, daysToExpiration){
    // PASS IN NAME, NULL AND NULL IN ORDER TO MAKE THE
    // VALUE AND EXPIRATION NULL
    setCookie(name, "", daysToExpiration);
}
