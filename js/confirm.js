function getRegistrationCookies(){

    // INPUT TEXT FIELD ELEMENTS TO BE REFERENCED -- DUPLICATE TO AVOID EXCESS GLOBAL VARIABLES
    const cookieNames = [
        "userName",
        "password",
        "firstName",
        "lastName",
        "email",
        "phoneNumber",
        "signUpNewsLetter"
    ];

    // COOKIE DICTIONARY
    let cookieDict = getAllCookies();
    // CALL FUNCTION TO ASSIGN THE COOKIE DICT VALUES TO THE CORRECT HTML ELEMENTS ON THE CONFIRM JAVASCRIPT PAGE
    console.log(cookieDict);

    // UPDATE ALL THE VALUE FIELDS FOR THE LIST BY SETTING THEM TO THEIR COOKIE DICTIONARY EQUIVALENTS
    // CALL HANDLE EMPTY LIST ITEM FOR OPTIONAL FIELDS TO INPUT AN "N/A" IN PLACE TO PREVENT THE LIST
    // VALUES FROM BEING OFF
    document.getElementById("listUserNameValue").innerText = cookieDict["userName"];
    document.getElementById("listFirstNameValue").innerText = cookieDict["firstName"];
    document.getElementById("listLastNameValue").innerText = cookieDict["lastName"];
    document.getElementById("listEmailValue").innerText = handleEmptyListItem(cookieDict["email"]);
    document.getElementById("listPasswordValue").innerText = cookieDict["password"];
    document.getElementById("listPhoneValue").innerText = handleEmptyListItem(cookieDict["phoneNumber"]);
    document.getElementById("listNewsLetterValue").innerText = handleEmptyListItem(cookieDict["signUpNewsLetter"]);
}

// HANDLE EMPTY WILL FILL IN 'N/A' WHERE THE USER DID NOT
// ADD IN OPTIONAL INFORMATION.
function handleEmptyListItem(textValue){
    if (textValue === ""){
        return "N/A";
    }
    return textValue;
}

// GET ALL COOKIES AND TURN INTO A DICTIONARY
function getAllCookies(){
    let cookieDict = {}
    // GET DECODED COOKIE
    const decodedCookie = decodeURIComponent(document.cookie);

    // SPLIT COOKIE STRING INTO AN ARRAY THAT IS SEPARATED BY ';'
    const cookies = decodedCookie.split("; ");

    for (let idx in cookies){
        let itemNameValue = cookies[idx].split("=");
        cookieDict[itemNameValue[0]] = itemNameValue[1];
    }
    console.log("cookieDict:")
    console.log(cookieDict);
    return cookieDict;
}
