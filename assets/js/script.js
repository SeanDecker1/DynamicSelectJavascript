var windowW = window.innerWidth;
var windowHalf = windowW / 2;

// BEGINS PAGE LAYOUT FUNCTION
window.onload = function() {
    
    // Creates the overall container, and saves it to a variable
    createContainerDiv( "container" );
    var containerDiv = document.getElementById( "container" );
    
    // Creates a div for the first selection stage, adds it to the container
    createDiv( "stage1", containerDiv );
    
    // Creates an H1 element and adds it to the comic selection
    createHeading( "headingStage1", "stage1", "Favorite Comicbook Universe?", "H1" );

    // Creates the DC image and adds it to the comic selection
    // Onclick calls SELECT FUNCTION
    createImage( "dcImage", "assets/images/comicLogos/dcLogo.png", "selectDC()", "comicChoices", "stage1" );

    // Creates the Marvel image and adds it to the comic selection
    // Onclick calls SELECT FUNCTION
    createImage( "marvelImage", "assets/images/comicLogos/marvelLogo.png", "selectMarvel()", "comicChoices", "stage1" );
    
    // Creates a div for the second selection stage
    createDiv( "stage2", containerDiv );
    
    // Creates a div for the third selection stage
    createDiv( "stage3", containerDiv );
    
}
// ENDS PAGE LAYOUT FUNCTION

// BEGINS SELECT FUNCTIONS
// Function to move Marvel off screen and call a DISPLAY HERO FUNCTION
function selectDC() {
    
    // Gets the Marvel and DC image element
    var inputMarvel = document.getElementById( "marvelImage" );
    var inputDC = document.getElementById( "dcImage" );
    
    // Calls ANIMATION FUNCTION to move the Marvel image to the right
    moveComic( "right", inputMarvel, inputDC );
    
    // Removes onclick functionality from the images 
    inputDC.onclick = "";
    inputMarvel.onclick = "";
    
    // Calls DISPLAY HERO FUNCTION
    displayDCHeroes();
    
}

// Function to move DC off screen and call a DISPLAY HERO FUNCTION
function selectMarvel() {
    
    // Gets the Marvel and DC image element
    var inputMarvel = document.getElementById( "marvelImage" );
    var inputDC = document.getElementById( "dcImage" );
    
    // Calls ANIMATION FUNCTION to move DC image to the left
    moveComic( "left", inputMarvel, inputDC );
    
    // Removes onclick functionality from the images
    inputDC.onclick = "";
    inputMarvel.onclick = "";
    
    // Calls DISPLAY HERO FUNCTION
    displayMarvelHeroes();
    
}
// ENDS SELECT FUNCTIONS

// BEGINS CREATE ELEMENT FUNCTIONS
// Function to create an image element with an id, source, onclick, and class attribute 
function createImage( imageID, imageSRC, imageClick, imageClass, imageDiv ) { 

    // Gets the div the image will be added to
    var divElement = document.getElementById( imageDiv );
    
    // Creates element and gives it an id, source, onclick, and class attribute 
    var element = document.createElement( "IMG" );
    element.setAttribute( "id", imageID );
    element.setAttribute( "src", imageSRC );
    element.setAttribute( "onclick", imageClick );
    element.setAttribute( "class", imageClass );
    
    
    // Adds the element to the div
    divElement.appendChild( element );

}

// Function to create a div and gives it an id attribute
function createDiv( divID, containerElement ) {
    
    // Creates the div element and gives it an id attribute
    var element = document.createElement( "DIV" );
    element.setAttribute( "id", divID );
    
    // Adds the element to the container div
    containerElement.appendChild( element );
    
}

// Function to create the overall container div and gives it an id attribute
function createContainerDiv( divID ) {
    
    // Creates the div element and gives it an id attribute
    var element = document.createElement( "DIV" );
    element.setAttribute( "id", divID );
    
    // Adds the element to the page body
    document.body.appendChild( element );
    
}

// Function to create a specified heading, gives it an id, and gives it text 
function createHeading( headID, divID, headText, headNum ) {
    
    // Gets the div that it will be added to
    var divElement = document.getElementById( divID );
    
    // Creates the type of heading, gives it an id, and gives it some text
    var element = document.createElement( headNum );
    element.setAttribute( "id", headID );
    element.textContent = ( headText );
    
    // Adds the element to the div
    divElement.appendChild( element );
    
}
// ENDS CREATE ELEMENT FUNCTIONS

// BEGINS DISPLAY HERO IMAGES
// Function to display the options for DC heroes
function displayDCHeroes( heroArray ) {
    
    // Calls CREATE FUNCTION to create heading
    createHeading( "heroSelection", "stage2", "Favorite DC Hero?", "H2" );
    
    // Creates the Batman image
    createImage( "batmanImage", heroArray[0].pathLeft, "displayDCVillains( 'Batman' )", "heroChoices", "stage2" ); 
    
    // Creates the Superman image
    createImage( "supermanImage", "assets/images/dcHeroes/supermanLogo.png", "displayDCVillains( 'Superman' )", "heroChoices", "stage2" ); 
    
    // Creates the Green Arrow image
    createImage( "greenArrowImage", "assets/images/dcHeroes/greenArrowLogo.png", "displayDCVillains( 'Green Arrow' )", "heroChoices", "stage2" ); 
    
    // Creates the Flash image
    createImage( "flashImage", "assets/images/dcHeroes/flashLogo.png", "displayDCVillains( 'Flash' )", "heroChoices", "stage2" ); 

}

function displayMarvelHeroes() {
    
    createHeading( "heroSelection", "stage2", "Favorite Marvel Hero?", "H2" );
    
    // Creates the Spider-Man image
    createImage( "spiderImage", "assets/images/marvelHeroes/spiderLogo.png", "selectSpider()", "heroChoices", "stage2" ); 
    
    // Creates the Deadpool image
    createImage( "deadpoolImage", "assets/images/marvelHeroes/deadpoolLogo.png", "selectDeadpool()", "heroChoices", "stage2" ); 
    
    // Creates the Hulk image
    createImage( "hulkImage", "assets/images/marvelHeroes/hulkLogo.png", "selectHulk()", "heroChoices", "stage2" ); 
    
    // Creates the Wolverine image
    createImage( "wolverineImage", "assets/images/marvelHeroes/wolverineLogo.png", "selectWolverine()", "heroChoices", "stage2" ); 
    
}
// ENDS DISPLAY HERO IMAGES

// BEGINS DISPLAY VILLAIN IMAGES 
function displayDCVillains( dcHero ) {
    
    createHeading( "villainSelection", "stage3", "Favorite " + dcHero + " Villain?", "H3" );
    
    if ( dcHero == "Batman" ) {
        
        var villainA = "jokerImage";
        var villainAPath = "batmanVillains/jokerPic.png";
        
        var villainB = "penguinImage";
        var villainBPath = "batmanVillains/penguinPic.png";
        
        var villainC = "scarecrowImage";
        var villainCPath = "batmanVillains/scarecrowPic.png";
        
    } else if ( dcHero == "Superman" ) {
        
        var villainA = "lexImage";
        var villainAPath = "supermanVillains/lexPic.png";
        
        var villainB = "doomsdayImage";
        var villainBPath = "supermanVillains/doomsdayPic.png";
        
        var villainC = "darkseidImage";
        var villainCPath = "supermanVillains/darkseidPic.png";
        
    } else if ( dcHero == "Green Arrow" ) {
        
        var villainA = "deathstrokeImage";
        var villainAPath = "greenArrowVillains/deathstrokePic.png";
        
        var villainB = "merlynImage";
        var villainBPath = "greenArrowVillains/merlynPic.png";
        
        var villainC = "komodoImage";
        var villainCPath = "greenArrowVillains/komodoPic.png";
        
    } else if ( dcHero == "Flash" ) {
        
        var villainA = "zoomImage";
        var villainAPath = "flashVillains/zoomPic.png";
        
        var villainB = "groddImage";
        var villainBPath = "flashVillains/groddPic.png";
        
        var villainC = "captainColdImage";
        var villainCPath = "flashVillains/captainColdPic.png";
        
    }
    
    
    // Creates the first villain image
    createImage( villainA, "assets/images/dcVillains/" + villainAPath, "", "villainChoices", "stage3" ); 
    
    // Creates the second vilain image
    createImage( villainB, "assets/images/dcVillains/" + villainBPath, "", "villainChoices", "stage3" ); 
    
    // Creates the third villain image
    createImage( villainC, "assets/images/dcVillains/" + villainCPath, "", "villainChoices", "stage3" );  
    
}
// ENDS DISPLAY VILLAIN IMAGES

// BEGINS ANIMATION FUNCTIONS
function moveComic( direction, inputMarvel, inputDC ) { 
    
    var moveCounter = 0;
    
    var moveDirectionA = 0;
    var moveDirectionB = 0;
    
    var moveFinal = 0;
    
    setInterval( frame, 5 );
  
    function frame() {
    
        if ( moveDirectionA < ( windowHalf - 255 ) ) { 
                  
            moveDirectionA = moveDirectionA + 3;
            moveDirectionB = moveDirectionB - 3 ;
            
            if ( direction == "right" ) {
            
                inputMarvel.style.marginRight = moveDirectionB + "px"; 
                inputDC.style.marginRight = moveDirectionA + "px"; 
            
            } else if ( direction == "left" ) {
                
                inputMarvel.style.marginLeft = moveDirectionA + "px"; 
                inputDC.style.marginLeft = moveDirectionB + "px";
                
            }
                
            moveFinal = moveDirectionA;
            
        } else if ( ( moveDirectionA >= ( windowHalf - 255 ) ) && ( moveCounter > -127.5 ) ) {
            
            moveCounter = moveCounter - 3;
            
            moveFinal = moveFinal - 3;
            moveDirectionB = moveDirectionB - 3;
            
            if ( direction == "right" ) {
            
                inputMarvel.style.marginRight = moveDirectionB + "px"; 
                inputDC.style.marginRight = moveFinal + "px"; 
            
            } else if ( direction == "left" ) {
                
                inputMarvel.style.marginLeft = moveFinal + "px"; 
                inputDC.style.marginLeft = moveDirectionB + "px";
                
            }

        }
        
    }

}
// ENDS ANIMATION FUNCTIONS