var windowW = window.innerWidth;
var windowHalf = windowW / 2;

var messageList = JSON.parse( messages );
var topData = JSON.parse( topSelect );

var midLeftData = JSON.parse( midLeftSelect );
var midRightData = JSON.parse( midRightSelect );

var botLeftAData = JSON.parse( botLeftA );
var botLeftBData = JSON.parse( botLeftB );
var botLeftCData = JSON.parse( botLeftC );
var botLeftDData = JSON.parse( botLeftD );

var botRightAData = JSON.parse( botRightA );
var botRightBData = JSON.parse( botRightB );
var botRightCData = JSON.parse( botRightC );
var botRightDData = JSON.parse( botRightD );

var currentArray;
var currentDirection;

// BEGINS PAGE LAYOUT FUNCTION
window.onload = function() {

    // Creates the overall container, and saves it to a variable
    createContainerDiv( "container" );
    var containerDiv = document.getElementById( "container" );
    
    // Creates a div for the first selection stage, adds it to the container
    createDiv( "topSelection", containerDiv );
    
    // Creates an H1 element and adds it to the comic selection
    createHeading( "headingTopSelection", "topSelection", messageList[0].topMessage, "H1" );

    // Creates the two top images
    // Onclick calls SELECT FUNCTION
    for( var i = 0; i < topData.length; i++ ) {
        createImage( topData[i].topID, topData[i].topPath, "topChoices", "topSelection" );
    }

    // Creates a div for the select list
    createDiv( "topSelectionList", containerDiv );
    createSelect( "topList", "topSelectionList", topData, "selectOption()");
    
}

// Function to move the corresponding image off the screen
function selectOption() {
        
    // Gets the two image elements
    var inputLeft  = document.getElementById( topData[0].topID );
    var inputRight = document.getElementById( topData[1].topID );

    var inputOption = document.getElementById( "topList" ).value;

    if ( inputOption == topData[0].text ) {
        var inputDirection = "right";
    } else if ( inputOption == topData[1].text ) {
        var inputDirection = "left";
    }
    
    // Calls ANIMATION FUNCTION to move the right image to the right
    moveComic( inputDirection, inputRight, inputLeft );

    displayMidOptions( inputDirection );

}

function selectMidOption() {

    var inputA = document.getElementById( currentArray[0].midID );
    var inputB = document.getElementById( currentArray[1].midID );
    var inputC = document.getElementById( currentArray[2].midID );
    var inputD = document.getElementById( currentArray[3].midID );

    var inputOption = document.getElementById( "midList" ).value;

    if ( inputOption == currentArray[0].text ) {
        var inputLetter = "A";
    } else if ( inputOption == currentArray[1].text ) {
        var inputLetter = "B";
    } else if ( inputOption == currentArray[2].text ) {
        var inputLetter = "C"; 
    } else if ( inputOption == currentArray[3].text ) {
        var inputLetter = "D";
    }
    
    // Calls ANIMATION FUNCTION to move the right image to the right
    //moveMid( inputDirection, inputRight, inputLeft );

    displayBotOptions( inputLetter );

}

function selectBotOption() {

    var inputOption = document.getElementById( "botList" ).value;

    var divElement = document.getElementById( "container" );

    var element = document.createElement( "BUTTON" );
    element.setAttribute( "method", "post" );
    element.setAttribute( "type", "submit" );
    element.setAttribute( "value", "submit" );
    element.setAttribute( "onclick", "return displayFinal( this )" );
    element.setAttribute( "class", "submitButton" );
    element.setAttribute( "name", "selectListForm" );

    element.appendChild( document.createTextNode( "Submit" ) );

    divElement.appendChild( element );
}

// Function to create an image element with an id, source, onclick, and class attribute 
function createImage( imageID, imageSRC, imageClass, imageDiv ) { 

    // Gets the div the image will be added to
    var divElement = document.getElementById( imageDiv );
    
    // Creates element and gives it an id, source, onclick, and class attribute 
    var element = document.createElement( "IMG" );
    element.setAttribute( "id", imageID );
    element.setAttribute( "src", imageSRC );
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
    var element = document.createElement( "FORM" );
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

// Function to create a select list with the ID, div ID, JSON array, and onchange function passed in
function createSelect( selectID, selectDiv, selectArray, selectFunction ) {

    // Gets the div that it will be added to
    var divElement = document.getElementById( selectDiv );

    // Creates the select list and gives it an ID
    var element = document.createElement( "select" );
    element.setAttribute( "id", selectID );
    element.setAttribute( "onchange", selectFunction );

    var defaultElement = document.createElement( "option" );
    if ( selectID == "topList" ) {
        defaultElement.appendChild( document.createTextNode( messageList[0].topSelectMessage ) );
    } else if ( selectID == "midList" ) {
        defaultElement.appendChild( document.createTextNode( messageList[0].midSelectMessage ) );
    } else if ( selectID == "botList" ) {
        defaultElement.appendChild( document.createTextNode( messageList[0].botSelectMessage ) );
    }

    element.appendChild( defaultElement );

    // Loops through the array and creates an option for each
    for ( var i = 0; i < selectArray.length; i++ ) {
        
        var optionElement = document.createElement( "option" );
        optionElement.setAttribute( "value", selectArray[i].text );
        optionElement.appendChild( document.createTextNode( selectArray[i].text ) );
        element.appendChild( optionElement );

    }

    // Adds the element to the div
    divElement.appendChild( element );

}

// Function to display the options for DC heroes
function displayMidOptions( selection ) {

    createDiv( "midSelection", document.getElementById( "container" ) );

    // Calls CREATE FUNCTION to create heading
    createHeading( "heroSelection", "midSelection", messageList[0].midMessage, "H2" );

    if ( selection == "left" ) {
        dataArray = midRightData;
    } else if ( selection == "right" ) {
        dataArray = midLeftData;
    }

    for (var i = 0; i < dataArray.length; i++) {
        createImage( dataArray[i].midID, dataArray[i].midPath, "heroChoices", "midSelection" );
    }

    // Creates a div for the select list
    createDiv( "midSelectionList", document.getElementById( "container" ) );

    currentArray = dataArray;
    currentDirection = selection;

    createSelect( "midList", "midSelectionList", dataArray, "selectMidOption()" );

}

function displayBotOptions( selection ) {

    createDiv( "botSelection", document.getElementById( "container" ) );

    // Calls CREATE FUNCTION to create heading
    createHeading( "villainSelection", "botSelection", messageList[0].botMessage, "H2" );

    if ( currentDirection == "left" ) {

        if ( selection == "A" ) {
            currentArray = botRightAData;
        } else if ( selection == "B" ) {
            currentArray = botRightBData;
        } else if ( selection == "C" ) {
            currentArray = botRightCData;
        } else if ( selection == "D" ) {
            currentArray = botRightDData;
        }

    } else if ( currentDirection == "right" ) {

        if ( selection == "A" ) {
            currentArray = botLeftAData;
        } else if ( selection == "B" ) {
            currentArray = botLeftBData;
        } else if ( selection == "C" ) {
            currentArray = botLeftCData;
        } else if ( selection == "D" ) {
            currentArray = botLeftDData;
        }

    }

    for ( var i = 0; i < currentArray.length; i++ ) {

        createImage( "null", currentArray[i].botPath, "villainChoices", "botSelection" );

    }

    // Creates a div for the select list
    createDiv( "botSelectionList", document.getElementById( "container" ) );
    createSelect( "botList", "botSelectionList", currentArray, "selectBotOption()" );

}

function displayFinal( FORM ) {

    var topChoice = document.getElementById("topList").value;
    var midChoice = document.getElementById("midList").value;
    var botChoice = document.getElementById("botList").value;

    createHeading( "null", "topMessage", topChoice, "H2" );
    createHeading( "null", "midMessage", midChoice, "H2" );
    createHeading( "null", "botMessage", botChoice, "H2" );

    return false;

}

// BEGINS ANIMATION FUNCTIONS
function moveComic( direction, inputRight, inputLeft ) { 
    
    var moveCounter = 0;
    
    var moveDirectionA = 0;
    var moveDirectionB = 0;
    
    var moveFinal = 0;
    
    setInterval( frame, 5 );
  
    function frame() {
    
        if ( moveDirectionA < ( windowHalf ) ) { 
                  
            moveDirectionA = moveDirectionA + 6;
            moveDirectionB = moveDirectionB - 6 ;
            
            if ( direction == "right" ) {
            
                inputRight.style.marginRight = moveDirectionB + "px"; 
                inputLeft.style.marginRight = moveDirectionA + "px"; 
            
            } else if ( direction == "left" ) {
                
                inputRight.style.marginLeft = moveDirectionA + "px"; 
                inputLeft.style.marginLeft = moveDirectionB + "px";
                
            }
                
            moveFinal = moveDirectionA;
            
        } else if ( ( moveDirectionA >= ( windowHalf - 255 ) ) && ( moveCounter > -127.5 ) ) {
            
            moveCounter = moveCounter - 3;
            
            moveFinal = moveFinal - 3;
            moveDirectionB = moveDirectionB - 3;
            
            if ( direction == "right" ) {
            
                inputRight.style.marginRight = moveDirectionB + "px"; 
                inputLeft.style.marginRight = moveFinal + "px"; 
            
            } else if ( direction == "left" ) {
                
                inputRight.style.marginLeft = moveFinal + "px"; 
                inputLeft.style.marginLeft = moveDirectionB + "px";
                
            }

        }
        
    }

}
// ENDS ANIMATION FUNCTIONS