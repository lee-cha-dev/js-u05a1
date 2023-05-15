// GLOBAL VAR INDEX TO KEEP UP WITH WHICH IMAGE IS BEING ACCESSED
let imageIdx = -1;

// ONLOAD FUNCTION TO PRELOAD IMAGES AND INITIALIZE
// THE IMAGE CHANGING INTERVAL
function onLoad() {
    // CYCLE TIME IS THE NUMBER OF SECONDS IT TAKES FOR THE BANNER TO
    // CYCLE TO THE NEXT IMAGE
    changeImage(
        [
            "images/banner1.jpg",
            "images/banner2.jpg",
            "images/banner3.jpg"
        ],
        [
            'banner1',
            'banner2',
            'banner3'
        ], 3
    );
}

// HANDLER FUNCTION TO SET INTERVAL AND CALL
// FOR THE CHANGE OF IMAGES
function changeImage(imagePaths, imageIds, cycleTime){
    let bannerElems = preloadImage(imagePaths, imageIds);
    // SET AN INTERVAL FOR CHANGING DISPLAYED IMAGE OVERTIME
    setInterval(changeDisplayedImage, cycleTime * 1000, [bannerElems]);
}

function preloadImage(imagePaths, imageIds){
    let preloadedImages = [];
    for (let idx in imagePaths){
        preloadedImages.push(new Image());
        preloadedImages[idx] = imagePaths[idx];
    }
    console.log("Images preloaded.");
    // ADD IMAGES TO ARRAY FOR EASIER ACCESSIBILITY
    let bannerElems = [];
    // GETS THE BANNER IMAGES FOR USE IN CHANGE DISPLAY IMAGE
    for (let idx = 0; idx < imageIds.length; idx++){
        let elem = document.getElementById(imageIds[idx]);
        console.log(`${imageIds[idx]}: image loaded from preload`);
        elem.src = preloadedImages[idx];
        bannerElems.push(elem);
    }
    return bannerElems;
}

// FUNCTION TO HANDLE CHANGING THE IMAGES
function changeDisplayedImage(args){
    // ASSIGN THE ARGUMENTS TO THEIR VAR NAME
    // THAT WERE PASSED IN FROM SET INTERVAL
    let bannerElems = args[0];

    // IF THIS IS THE FIRST TRANSITION, THEN REMOVE STARTING CLASSES
    // FROM PERIPHERAL IMAGES
    if (imageIdx === -1){
        // THIS IS REQUIRED TO ENSURE THE IS-NOT-ACTIVE CLASSES
        // DO NOT TRIGGER ON LOAD
        for (let i = 1; i < bannerElems.length; i++){
            bannerElems[i].classList.remove('start-no-transitions');
            bannerElems[i].classList.add('is-not-active')
        }

        // INDEX IS SET TO THE NORMAL '0' AS '-1' WAS USED AS A FLAG
        // TO CHECK FOR INITIAL LOAD
        imageIdx++;
    }
    // INCREMENT THE INDEX TO GET THE NEXT IMAGE/CASE OF TRANSITION
    imageIdx++;

    // ENSURE ARRAY DOES NOT GO OUT OF RANGE
    if(imageIdx > bannerElems.length - 1) {
        imageIdx = 0;
    }

    // FADEOUT INDEX USED TO KEEP UP WITH THE CURRENT ACTIVE
    // IMAGE ELEMENT THAT NEEDS TO BE SET TO IN-ACTIVE
    let fadeOutIdx = 0;
    // GET THE INACTIVE INDEX AND CYCLE TO NEXT IMAGE
    fadeOutIdx = setActive(imageIdx, bannerElems);
    // PASS IN THE ELEM TO SET ACTIVE IMG TO INACTIVE
    setNotActive(fadeOutIdx, bannerElems);
}

function setActive(index, bannerElems){
    // SET THE INDEX THAT NEEDS TO BE SET TO INACTIVE
    let fadeOutIdx = index - 1;
    // IF IT IS OUT OF SCOPE, THEN SET IT TO THE INDEX
    // THAT IS ON THE OPPOSITE SIDE OF THE ARRAY
    if (fadeOutIdx < 0) fadeOutIdx = bannerElems.length - 1;

    // SET THE CURRENT INDEX TO ACTIVE
    bannerElems[index].classList.remove('is-not-active');
    bannerElems[index].classList.add('is-active');

    // PASS BACK THE INDEX OF THE ELEM THAT NEEDS TO BE
    // SET TO INACTIVE
    return fadeOutIdx;
}

function setNotActive(index, bannerElems){
        // SETS THE IMG AT INDEX TO INACTIVE
        bannerElems[index].classList.remove('is-active');
        bannerElems[index].classList.add('is-not-active');
}
