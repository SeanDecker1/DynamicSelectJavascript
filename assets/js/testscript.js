function displayComics( comicArray ) {
    var out = "";
    var i;
    for(i = 0; i<comicArray.length; i++) {
        out += comicArray[i].path + '<br>';
    }
    document.getElementById("id01").innerHTML = out;
}

function displayDCHeroes( heroArray ) {
    var out = "";
    var i;

    for(i = 0; i<heroArray.length; i++) {
        out += heroArray[i].pathLeft + '<br>';
    }

    //document.getElementById("id02").innerHTML = out;
    document.getElementById("id02").innerHTML = heroArray[1].pathLeft;

    document.getElementById("id03").src = heroArray[1].pathLeft;

    var element = document.createElement( "IMG" );
    element.setAttribute( "src", "assets/images/dcHeroes/batmanLogo.png" );

}