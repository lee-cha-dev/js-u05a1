// GLOBAL ARRAY TO HOLD PRELOADED IMAGES
let preloadedImages = [];

function onLoad(){
    // HTML IMAGE ELEMENTS TO HOST THE IMAGE THAT IS
    // TO BE LOADED ON THE HTML ELEMENTS WITHIN THE GALLERY.HTML FILE
    // THE ARRAY NEED TO HAVE THE IMAGE IN THE SAME INDEX AS ITS MATCHING
    // ID FOR THE FUNCTION TO WORK
    preloadImages(
        [
            "images/firefighter.jpg",
            "images/work.jpg",
            "images/silhouette.jpg",
            "images/event.jpg"
        ],
        [
            "firefighter-image",
            "work-image",
            "silhouette-image",
            "event-image"
        ]
    );

    // CALL FUNCTION TO HANDLE ROLLING OVER IMAGES
    // PASS IN IMAGE AND GALLERY IDS IN THE EXACT SAME ORDER
    // TO MATCH ONE ANOTHER WITH IMAGE TO ITS GALLERY
    rollOver(
        [
            "firefighter-image",
            "work-image",
            "silhouette-image",
            "event-image"
        ],
        [
        "firefighter-gallery",
        "work-gallery",
        "silhouette-gallery",
        "event-gallery"
    ]);
}

function preloadImages(imagePaths, imgElemIds){
    // HTML IMAGE ELEMENTS TO HOST THE IMAGE THAT IS
    // TO BE LOADED ON THE HTML ELEMENTS WITHIN THE GALLERY.HTML FILE
    for (let idx in imagePaths){
        preloadedImages.push(new Image());

        // PRELOADS IMAGES TO BE ASSIGNED
        preloadedImages[idx].src = imagePaths[idx];
    }
    console.log("Images preloaded.");

    // AN ARRAY TO HOLD THE IMAGE ELEMENTS FROM THE GALLERY.HTML PAGE
    // ALL IMAGES ARE ARRANGED CONSISTENTLY WITH THE GALLERIES ARRAY
    // SO THAT BOTH CAN BE ACCESSED SIMULTANEOUSLY IN THE FOR LOOP BELOW
    let images = [];

    // PUSH THE ELEMENTS AT THE IMG ID TO THE ARRAY
    for (let idx in imgElemIds){
        images.push(document.getElementById(imgElemIds[idx]));
        images[idx].src = preloadedImages[idx].src;
        console.log(`${imgElemIds}: image loaded from preload.`);

        // ASSIGNS THE PRELOADED IMAGE TO THE HTML IMAGE ELEMENT
        // ON GALLERY.HTML
        // THE WORK IMAGE HAD A LARGER HEIGHT THAN THE OTHER IMAGES
        // STANDARDIZED THE IMAGE DIMENSIONS
        images[idx].style.width = "180px";
        images[idx].style.height = "120px";
    }
}

// FUNCTION TO ROLL OVER IMAGES
function rollOver(images, galleries){
    // FOR LOOP TO HANDLE ADDING EVENT LISTENERS FOR EACH IMAGE ON MOUSEOVER
    for (let idx in images){
        // GET THE ELEMENTS AT THE IMG AND GALLERY ID FOR EVENT LISTENER
        // FUNCTIONALITY - MOUSEOVER AND MOUSEOUT
        let elemImg = document.getElementById(images[idx]);
        let elemGal = document.getElementById(galleries[idx]);
        elemImg.addEventListener('mouseover', (event) => {
            // EACH GALLERY AND ITS IMAGE IS SET TO 'RELATIVE' AND 'ABSOLUTE', RESPECTIVELY,
            // IN ORDER TO ALLOW THE IMAGE TO INCREASE IN SIZE AND OVERLAP THE OTHER
            // ELEMENTS ON THE PAGE. THE HEIGHT AND WIDTH ARE DOUBLED FROM THEIR
            // ORIGINAL SIZE
            elemGal.style.position = 'relative';
            elemImg.style.position = 'absolute';
            elemImg.style.width = "360px";
            elemImg.style.height = "240px";
            console.log(`mouseover: ${elemImg.id}`)
        });
        //EVENT LISTENERS FOR EACH IMAGE FOR MOUSEOUT
        document.getElementById(images[idx]).addEventListener('mouseout', () => {
            // SET THE IMAGE BACK TO THE STYLE(S) THAT WERE
            // ASSIGNED TO IT BEFORE 'mouseover'
            elemGal.style.position = 'static';
            elemImg.style.position = 'static';
            elemImg.style.width = "180px";
            elemImg.style.height = "120px";
            console.log(`mouseout: ${elemImg.id}`)
        })
    }
}
