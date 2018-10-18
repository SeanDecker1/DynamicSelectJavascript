// Sean Decker - Main JavaScript File 
//  --FUNCTION ORGANIZATION LIST--
// 1. JSON ARRAY DECLARATIONS
// 2. GLOBAL VARIABLE DECLARATIONS
// 3. PAGE LAYOUT FUNCTION
// 4. SELECT FUNCTIONS
// 5. CHANGE FUNCTIONS
// 6. STORING FUNCTIONS
// 7. CREATE FUNCTIONS
// 8. DISPLAY FUNCTIONS
// 9. ANIMATION FUNCTIONS

//
// 1. BEGINS JSON ARRAY DECLARATIONS
//
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
//
// ENDS JSON ARRAY DECLARATIONS
//

//
// 2. BEGINS GLOBAL VARIABLE DECLARATIONS
//
// Holds the current array being used between functions
var currentArray;

// Holds the middle array being used
var activeMidArray;

// Holds the current tree direction being used between functions 
var currentDirection;

// Used to determine if the user has entered their name
var enteredName = false;

// Used to determine if the name has local data attatched to it
var localChoices = false;

// Used for animation purposes
var windowW = window.innerWidth;
var windowHalf = windowW / 2;
//
// ENDS GLOBAL VARIABLE DECLARATION
//

//
// 3. BEGINS PAGE LAYOUT FUNCTION
//
window.onload = function() {

    // Creates a div at the top of the page 
    createDiv( "nameForm", document.body );
    var nameForm = document.getElementById( "nameForm" );

    // Creates an input for the user to submit a name to track local data
    createHeading( "headingNameForm", nameForm.id, "Enter a name to save your info", "H5" );
    createInput( "nameInput", nameForm.id );
    createButton( "nameSubmit", nameForm.id, "submit", "Submit", "storeName()" );

    // Creates the overall form element
    createContainerForm( "container", "selectListForm", "storeAnswers()" );
    var containerDiv = document.getElementById( "container" );

    // Calls function to display first set of options
    displayTopOptions();

}
//
// ENDS PAGE LAYOUT FUNCTION
//

//
// 4. BEGINS SELECT FUNCTIONS
//
// Function executed when a selection has been made for the first selection
function selectTopOption() {
        
    // Gets the image elements and the select list element
    var inputLeft  = document.getElementById( topData[0].topID );
    var inputRight = document.getElementById( topData[1].topID );
    var inputOption = document.getElementById( "topList" );

    // Sets the tree direction based off the value of the selected option
    if ( inputOption.value == topData[0].value ) {
        currentDirection = "right";
    } else if ( inputOption.value == topData[1].value ) {
        currentDirection = "left";
    }
    
    // Calls function to move unselected item off screen
    moveTop( inputRight, inputLeft );

    // Changes the onchange function
    inputOption.setAttribute( "onchange", "changeSelect( 'top' )" );

    // Calls function to display the second set of options
    displayMidOptions();

}

// Function executed when a selection has been made for the second selection
function selectMidOption() {

    // Gets the select list element
    var inputOption = document.getElementById( "midList" );

    // Gets the index of the selected option
    var inputIndex = inputOption.options[inputOption.selectedIndex].index - 1;

    // Changes the onchange function
    inputOption.setAttribute( "onchange", "changeSelect( 'mid' )" );

    activeMidArray = currentArray;

    // Calls function to display the third set of options, and sends it the array to be used
    displayBotOptions( currentArray[inputIndex].midArray );

}

// Function executed when a selection has been made for the third selection
function selectBotOption() {

    // Deletes div if it already exists
    if ( !!document.getElementById( "finalSubmit" ) ) {
        document.getElementById( "finalSubmit" ).parentNode.removeChild( document.getElementById( "finalSubmit" ) );
    }

    createDiv( "finalSubmit", document.getElementById( "container" ) );
    var element = document.getElementById( "finalSubmit" );

    // Creates a submit button with an onclick function
    var buttonElement = document.createElement( "BUTTON" );
    buttonElement.setAttribute( "type", "submit" );
    buttonElement.setAttribute( "value", "submit" );
    buttonElement.setAttribute( "onclick", "return displayFinal()" );
    buttonElement.setAttribute( "class", "submitButton" );
    buttonElement.appendChild( document.createTextNode( "Submit" ) );

    createButton( "resetButton", "finalSubmit", "reset", "Reset", "displayReset()" );

    // Adds the button to the form
    element.appendChild( buttonElement );

}
//
// ENDS SELECT FUNCTIONS
//

//
// 5. BEGINS CHANGE FUNCTIONS
//
// Function to handle when a select list is changed after the first selection
function changeSelect( changedSection ) {

    var midListElement = document.getElementById( "midList" );
    var midArrayIndex = ( midListElement.options[ midListElement.selectedIndex ].index - 1 );

    if ( midArrayIndex < 0 ) {
        midArrayIndex++;
    }

    // Determines if the first or second select list was modified 
    // Creates and array of elements that might have already been created
    if ( changedSection == "top" ) {
        var divArray = [ document.getElementById( "finalSubmit" ), document.getElementById( "midSelection" ), document.getElementById( "midSelectionList" ), document.getElementById( "botSelection" ), document.getElementById( "botSelectionList" ) ];
    } else if ( changedSection == "mid" ) {
        var divArray = [ document.getElementById( "finalSubmit" ), document.getElementById( "botSelection" ), document.getElementById( "botSelectionList" ) ];
    }

    // Loops through elements if the element has been created, then it is removed from the page
    for ( var i = 0; i < divArray.length; i++ ) {
        if ( !!divArray[i] ) {
            divArray[i].parentNode.removeChild( divArray[i] );
        }
    }

    // Calls appropriate next function
    if ( changedSection == "top" ) {
        changeTopSelect();
        displayMidOptions();
    } else if ( changedSection == "mid" ) {
        changeMidSelect();
        displayBotOptions( activeMidArray[midArrayIndex].midArray );
    }

}

// Function to change the image that is displayed for the user selection
function changeTopSelect() {

    // Sets comparison boolean values
    var compareRight = currentDirection == "right";
    var compareLeft = currentDirection == "left";

    // Flips directions
    if ( compareLeft ) {
        currentDirection = "right";
    } else if ( compareRight ) {
        currentDirection = "left";
    }


    // Gets the select list element
    var userSelection = document.getElementById( "topList" );

    // Loops through to determine which image is being displayed and which is not
    for ( var i = 0; i < topData.length; i++ ) {

        if ( userSelection.value != topData[i].value ) {
            var visibleImage = document.getElementById( topData[i].topID );
        } else if ( userSelection.value == topData[i].value ) {
            var nonVisibleImage = document.getElementById( topData[i].topID );
        }

    }

    // If the use reselected the default option, the top section is removed and re-added, else the images are switched
    if ( userSelection.value == "default" ) {

        document.getElementById( "topSelection" ).parentNode.removeChild( document.getElementById( "topSelection" ) );
        document.getElementById( "topSelectionList" ).parentNode.removeChild( document.getElementById( "topSelectionList" ) );
    
        displayTopOptions();

    } else if ( userSelection.value != "default" ) {

        // Sets the ID and source of the images
        var visibleID = visibleImage.id;
        var nonVisibleID = nonVisibleImage.id;
        var visibleSRC = visibleImage.src;
        var nonVisibleSRC = nonVisibleImage.src;
        
        // Changes the source and ID attributes of the images
        visibleImage.setAttribute( "src", nonVisibleSRC );
        visibleImage.setAttribute( "id", nonVisibleID );

        nonVisibleImage.setAttribute( "id", visibleID);
        nonVisibleImage.setAttribute( "src", visibleSRC);

    }

}

function changeMidSelect() {

    // Gets the select list element
    var userSelection = document.getElementById( "midList" );

    if ( userSelection.value == "default" ) {

        document.getElementById( "midSelection" ).parentNode.removeChild( document.getElementById( "midSelection" ) );
        document.getElementById( "midSelectionList" ).parentNode.removeChild( document.getElementById( "midSelectionList" ) );

        displayMidOptions();
    
    }

}
//
// ENDS CHANGE FUNCTIONS
//

//
// 6. BEGINS STORING FUNCTIONS
//
// Function to store the entered name in local storage 
function storeName() {

    // Gets the text input element
    inputElement = document.getElementById( "nameInput" );

    // Sets value to false by default 
    var nameExists = false;

    for ( var j = 0; j < localStorage.length; j++ ) {
        
        // If the user input equals the name in local storage
        if ( inputElement.value == localStorage.userName ) {

            // Sets values to true, breaks out of the loop
            nameExists = true;
            localChoices = true;
            break;

        }

    }

    // Creates a heading to display previous answers if the users has already selected options
    if ( localChoices == true ) {
        document.getElementById( "nameForm" ).parentNode.removeChild( document.getElementById( "nameForm" ) );
        createDiv( "nameForm", document.body );
        createHeading( "headingNameResults", nameForm.id, localStorage.topChoice + " >> " + localStorage.midChoice + " >> " + localStorage.botChoice, "H4" );
    } else if ( localChoices == false ) {
        document.getElementById( "nameForm" ).parentNode.removeChild( document.getElementById( "nameForm" ) );
    }

    // Sets the local storage name if the name is not in local storage
    if ( nameExists == false ) {
        localStorage.userName = inputElement.value;
    }

    enteredName = true;

}

// Function to store user selections in local storage
function storeAnswers() {

    topAnswer = document.getElementById( "topList" );
    midAnswer = document.getElementById( "midList" );
    botAnswer = document.getElementById( "botList" );

    localStorage.topChoice = topAnswer.options[topAnswer.selectedIndex].text;
    localStorage.midChoice = midAnswer.options[midAnswer.selectedIndex].text;
    localStorage.botChoice = botAnswer.options[botAnswer.selectedIndex].text;

}
//
// ENDS STORING FUNCTIONS
//

//
// 7. BEGINS CREATE FUNCTIONS
//
// Function to create an image and add it to the page 
function createImage( imageID, imageSRC, imageClass, imageDiv ) { 

    // Gets the div the image will be added to
    var divElement = document.getElementById( imageDiv );
    
    // Creates element and gives it an id, source, and class attribute 
    var element = document.createElement( "IMG" );
    element.setAttribute( "id", imageID );
    element.setAttribute( "src", imageSRC );
    element.setAttribute( "class", imageClass );
    
    // Adds the element to the div
    divElement.appendChild( element );

}

// Function to create a div and add it to the page
function createDiv( divID, formElement ) {

    // Creates the div element and gives it an id attribute
    var element = document.createElement( "DIV" );
    element.setAttribute( "id", divID );
    
    // Adds the element to the container div
    formElement.appendChild( element );
    
}

// Function to create the overall form element and add it to the page
function createContainerForm( formID, formName, formSubmit ) {
    
    // Creates the form element and gives it an id, method, name, and onsubmit attribute
    var element = document.createElement( "FORM" );
    element.setAttribute( "id", formID );
    element.setAttribute( "method", "post" );
    element.setAttribute( "name", formName );
    element.setAttribute( "onsubmit", formSubmit );
    
    // Adds the element to the page body
    document.body.appendChild( element );
    
}

// Function to create a specified heading, gives it an id, and gives it text 
function createHeading( headID, formID, headText, headNum ) {

    // Gets the form the element will be added to
    var formElement = document.getElementById( formID );
    
    // Creates the type of heading, gives it an id, and gives it some text
    var element = document.createElement( headNum );
    element.setAttribute( "id", headID );
    element.appendChild( document.createTextNode( headText ) );

    // Adds the element to the form
    formElement.appendChild( element );

}

// Function to create a text input
function createInput( inputID, formID ) {

    // Gets the form the element will be added to
    var formElement = document.getElementById( formID );

    // Creates the input, sets the type, id, and name
    var element = document.createElement( "INPUT" );
    element.setAttribute( "id", inputID );
    element.setAttribute( "type", "text" );
    element.setAttribute( "name", "userName" );

    // Adds the element to the form
    formElement.appendChild( element );

}

function createButton( buttonID, formID, buttonType, buttonText, buttonClick ) {

    // Gets the form the element will be added to
    var formElement = document.getElementById( formID );

    // Creates the button, sets the type, class, id, onclick function, and adds button text
    var element = document.createElement( "BUTTON" );
    element.setAttribute( "type", buttonType );
    element.setAttribute( "class", "submitButton" );
    element.setAttribute( "id", buttonID );
    element.setAttribute( "onclick", buttonClick );
    element.appendChild( document.createTextNode( buttonText ) );

    // Adds the element to the form
    formElement.appendChild( element );

}

// Function to create a select list
function createSelect( selectID, formID, selectArray, selectFunction ) {

    // Gets the div that it will be added to
    var formElement = document.getElementById( formID );

    // Creates the select list and sets it id and onchange function
    var element = document.createElement( "select" );
    element.setAttribute( "id", selectID );
    element.setAttribute( "onchange", selectFunction );

    // Creates the default select option
    var defaultElement = document.createElement( "option" );
    defaultElement.setAttribute( "value", "default" );

    // Determines what the default option text will be
    if ( selectID == "topList" ) {
        defaultElement.appendChild( document.createTextNode( messageList[0].topSelectMessage ) );
    } else if ( selectID == "midList" ) {
        defaultElement.appendChild( document.createTextNode( messageList[0].midSelectMessage ) );
    } else if ( selectID == "botList" ) {
        defaultElement.appendChild( document.createTextNode( messageList[0].botSelectMessage ) );
    }

    // Adds the default option to the element
    element.appendChild( defaultElement );

    // Loops through the array and creates an option for each
    for ( var i = 0; i < selectArray.length; i++ ) {
        
        var optionElement = document.createElement( "option" );
        optionElement.setAttribute( "value", selectArray[i].value );
        optionElement.appendChild( document.createTextNode( selectArray[i].text ) );
        element.appendChild( optionElement );

    }

    // Adds the element to the div
    formElement.appendChild( element );

}
//
// ENDS CREATE FUNCTIONS
//

//
// 8. BEGINS DISPLAY FUNCTIONS
//
// Function to display the options for the first select 
function displayTopOptions() {

    // Creates a div for the first selection stage, adds it to the container with a heading
    createDiv( "topSelection", document.getElementById( "container" ) );
    createHeading( "headingTopSelection", "topSelection", messageList[0].topMessage, "H1" );

    // Loops through the JSON array and creates all images for the first selection stage
    for( var i = 0; i < topData.length; i++ ) {
        createImage( topData[i].topID, topData[i].topPath, "topChoices", "topSelection" );
    }

    // Creates a new div and builds the select list inside
    createDiv( "topSelectionList", document.getElementById( "container" ) );
    createSelect( "topList", "topSelectionList", topData, "selectTopOption()");
    
}
// Function to display the options for the second selection
function displayMidOptions() {

    // Exits function if the default option is selected for the first selection
    if ( document.getElementById( "topList" ).value == "default" ) {
        return;
    }

    // Creates a new div to the page with a heading
    createDiv( "midSelection", document.getElementById( "container" ) );
    createHeading( "midSelectionHeading", "midSelection", messageList[0].midMessage, "H2" );

    // Sets the array to be used based off the current direction 
    if ( currentDirection == "left" ) {
        currentArray = midRightData;
    } else if ( currentDirection == "right" ) {
        currentArray = midLeftData;
    }

    // Creates and image for each item in the array
    for (var i = 0; i < currentArray.length; i++) {
        createImage( currentArray[i].midID, currentArray[i].midPath, "midChoices", "midSelection" );
    }

    // Creates a new div for the select list, and creates the select list
    createDiv( "midSelectionList", document.getElementById( "container" ) );
    createSelect( "midList", "midSelectionList", currentArray, "selectMidOption()" );

}

// Function to display the options for the third selection
function displayBotOptions( inputIndex ) {

    // Exits function if the default option is selected for the second selection
    if ( document.getElementById( "midList" ).value == "default" ) {
        return;
    }

    // Creates a new div and adds it to the page with a heading
    createDiv( "botSelection", document.getElementById( "container" ) );
    createHeading( "botSelectionHeading", "botSelection", messageList[0].botMessage, "H2" );

    currentArray = window[ inputIndex ];

    // Creates an image for each item in the array
    for ( var i = 0; i < currentArray.length; i++ ) {
        createImage( "currentArray.botID", currentArray[i].botPath, "botChoices", "botSelection" );
    }

    // Creates a new div for the select list, and creates the select list 
    createDiv( "botSelectionList", document.getElementById( "container" ) );
    createSelect( "botList", "botSelectionList", currentArray, "selectBotOption()" );

}

// Function to handle the final selection 
function displayFinal() {

    // Gets the select list elements 
    var topChoice = document.getElementById("topList").value;
    var midChoice = document.getElementById("midList").value;
    var botChoice = document.getElementById("botList").value;

    // Chooses which message to display if the user does not select an options
    if ( topChoice == "default" ) {
        createHeading( "finalMessage", "container", "You must select an option for the top selection!", "H2" );
        return false;
    } else if ( midChoice == "default" ) {
        createHeading( "finalMessage", "container", "You must select an option for the middle selection!", "H2" );
        return false;
    } else if ( botChoice == "default" ) { 
        createHeading( "finalMessage", "container", "You must select an option for the bottom selection!", "H2" );
        return false;
    } else if ( enteredName == false ) {
        createHeading( "finalMessage", "container", "You must enter a name to save your data!", "H2" );
        return false;
    } else { 
        return true;
    }

}

// Function to reset the page
function displayReset() {

    document.getElementById("topList").value = "default";
    document.getElementById("midList").value = "default";
    document.getElementById("botList").value = "default";

}
//
// ENDS DISPLAY FUNCTIONS
//

//
// 9. BEGINS ANIMATION FUNCTIONS
//
function moveTop( inputRight, inputLeft ) { 
    
    var moveCounter = 0;
    var moveDirectionA = 0;
    var moveDirectionB = 0;
    var moveFinal = 0;
    
    setInterval( frame, 5 );
  
    function frame() {
    
        if ( moveDirectionA < ( windowHalf ) ) { 
                  
            moveDirectionA = moveDirectionA + 6;
            moveDirectionB = moveDirectionB - 6 ;
            
            if ( currentDirection == "right" ) {
                inputRight.style.marginRight = moveDirectionB + "px"; 
                inputLeft.style.marginRight = moveDirectionA + "px"; 
            } else if ( currentDirection == "left" ) {
                inputRight.style.marginLeft = moveDirectionA + "px"; 
                inputLeft.style.marginLeft = moveDirectionB + "px";
            }
                
            moveFinal = moveDirectionA;
            
        } else if ( ( moveDirectionA >= ( windowHalf - 255 ) ) && ( moveCounter > -127.5 ) ) {
            
            moveCounter = moveCounter - 3;   
            moveFinal = moveFinal - 3;
            moveDirectionB = moveDirectionB - 3;
            
            if ( currentDirection == "right" ) {
                inputRight.style.marginRight = moveDirectionB + "px"; 
                inputLeft.style.marginRight = moveFinal + "px"; 
            } else if ( currentDirection == "left" ) {
                inputRight.style.marginLeft = moveFinal + "px"; 
                inputLeft.style.marginLeft = moveDirectionB + "px";
            }

        }
        
    }

}
//
// ENDS ANIMATION FUNCTIONS
//