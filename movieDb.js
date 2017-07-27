var pageNo;
var buttonClicked;
var url;
var hostURL='https://api.themoviedb.org/3/movie/';

// When the user clicks on the button, scroll to the top of the document
$(document).ready(function(){

    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('.scrollup').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });

});
//function for nowshowing tab
function nowshowing(elmnt)
{
    if(buttonClicked=="Now-Showing")
        return;

    buttonClicked = "Now-Showing";
    pageNo=1;
    url = hostURL+'now_playing?api_key=fb5875eace5a99021e9a7dc4728b1a6b';
    clear();
    openMovies();
    setColors(elmnt, '#da6f59');

}

//function for upcoming tab
function upcoming(elmnt)
{
    if(buttonClicked=="Upcoming")
        return;

    buttonClicked = "Upcoming";
    pageNo=1;
    url = hostURL+'upcoming?api_key=fb5875eace5a99021e9a7dc4728b1a6b';
    clear();
    openMovies();
    setColors(elmnt, '#93cd8c');
}
//function for popular tab
function popular(elmnt)
{
    if(buttonClicked=="Popular")
        return;

    buttonClicked = "Popular";
    pageNo=1;
    url = hostURL+'popular?api_key=fb5875eace5a99021e9a7dc4728b1a6b';
    clear();
    openMovies();
    setColors(elmnt, '#8b95ff');
}

function setColors(elmnt, color) {
    //script for top navigation menu
    //the css part which shows the menu clicks
    var j, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (j = 0; j < tabcontent.length; j++) {
        tabcontent[j].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (j = 0; j < tablinks.length; j++) {
        tablinks[j].style.backgroundColor = "";
    }

    document.getElementById(buttonClicked).style.display = "block";
    elmnt.style.backgroundColor = color;
}

//script for top navigation menu
function openMovies() {

    //ajax call to the api is done
    var i = 0;
    var request = new XMLHttpRequest();
    /*
    -call the api
    -getting the response as a JSON data
    -parsing the JSON and store it in "nowshowingData"
    -in the first page there will be 20 items
    -a dynamic div is created which we have 2 divs where one is an "imageDiv" and "contentDiv"
    -inside the "imageDiv" we get the poster of the movie by pasrsing the "nowshowingData" object
    -inside the "contentDiv" we get the title and overview of the movie by pasrsing the "nowshowingData" object
    -added a button inside the "contentDiv" inside the dynamically created div called "buttonMoreInfo"
    -onclick of the button if will go to moreInfo() with parameters (data(object),i(iteration))
    -iteration "i" is passed to get the current items values and display in the modal view
    */
    requesturl = url + '&page=' + pageNo;

    request.open('GET', requesturl);
    request.onload = function () {
        var nowshowingData = JSON.parse(request.responseText);
        var page=nowshowingData.page;
        //div split directly in javascript
        var movieBody = document.getElementById("movieBody");
        //loop for 1 page that contains 20 elements
        for (var i = 0; i < 20; i++) {
            //dynamic div
            var row = document.createElement("div");
            row.className = "row";
            //setting attributes for "row"(div)
            row.setAttribute("class", "container");
            row.setAttribute("style", "border: 1px solid black;\n" +
                "    padding-bottom: 20px;\n" +
                "    padding-top:  20px;");
            //loop for having two divs in the dynamic div
            for (var j = 0; j < 1; j++) {
                //imageDiv
                var imageDiv = document.createElement('div');
                //property of imageDiv
                imageDiv.className = "images";
                imageDiv.setAttribute("class", "col-lg-3");
                //contentDiv
                var contentDiv = document.createElement('div');
                //property of contentDiv
                contentDiv.className = "content";
                contentDiv.setAttribute("class", "col-lg-9");
                imageDiv.innerHTML = "<image src=" + "http://image.tmdb.org/t/p/w185/" + nowshowingData.results[i].poster_path +" onerror=\"this.src='noImageFound.jpg'\">";
                contentDiv.innerHTML = "<span ><h1>" + nowshowingData.results[i].title + "</h1></span><br/><br/><p>" + nowshowingData.results[i].overview + "</p>";
                //buttonMoreInfo
                var buttonMoreInfo = document.createElement('input');
                //property of buttonMoreInfo
                buttonMoreInfo.type = "button";
                buttonMoreInfo.value = "More Info";
                buttonMoreInfo.name = "moreinfobtn";
                // function call to moreInfo()
                buttonMoreInfo.setAttribute("onclick", "moreInfo(" + JSON.stringify(nowshowingData) + "," + i + ")");
                buttonMoreInfo.setAttribute("class", "moreInfoButton");
                buttonMoreInfo.setAttribute("style", "float:right;\n" + "background-color:#3e8e41;color:#fff;border-radius:10px;");
                //binding the elements in div
                contentDiv.appendChild(buttonMoreInfo);
                console.log(nowshowingData.results[i]);
                row.appendChild(imageDiv);
                row.appendChild(contentDiv);
            }
            movieBody.appendChild(row);
        }
        document.getElementById("movieBody").innerHTML = movieBody.innerHTML;
    };
    request.send();
}
//javascript to clear the body content to clear
function clear() {
    document.getElementById("movieBody").innerHTML = "";
    document.getElementById("images").innerHTML = "";
    document.getElementById("content").innerHTML = "";
    if(buttonClicked=="Latest") {
        document.getElementById("showMoreBtnId").style.visibility = "hidden";
    }
    else
        document.getElementById("showMoreBtnId").style.visibility="visible";

}
//creation of a dynamic modal
function moreInfo(data, i) {
    var modal = document.getElementById("modalBody");
    modal.style.display = "block";
    var modalDivContent = document.createElement('div');
    modalDivContent.setAttribute("class", "modal-content");
    modalDivContent.setAttribute("id","test");
    for (var j = 0; j < 1; j++) {
        var modalDivHeader = document.createElement('div');
        modalDivHeader.setAttribute("class", "modal-header");
        modalDivHeader.innerHTML = "<span onclick='spanClose()' class=close>&times;</span><h2>" + data.results[i].title + "</h2>";
        var modalDivBody = document.createElement('div');
        modalDivBody.setAttribute("class", "modal-body");
        modalDivBody.setAttribute("style", "background-color:white;");
        modalDivBody.innerHTML = "<image src=" + "http://image.tmdb.org/t/p/w185/" + data.results[i].backdrop_path + " onerror=\"this.src='noImageFound.jpg'\" width='400' height='200'>\n" +
            "<p><br/><span style='    font-size: 1.294117647058824em;\n"  +
            "             color: #03919d; '>Overview:</span>" + data.results[i].overview + "</p>\n" +
            "<p><span style='    font-size: 1.294117647058824em;\n" +
            "                color: #03919d; '>Release Date:</span>" + data.results[i].release_date + "</p>\n" +
            "<p><span style='    font-size: 1.294117647058824em;\n"+
            "                color: #03919d; '>Popularity:</span>" + data.results[i].popularity + "</p>\n" +
            "<p><span style='    font-size: 1.294117647058824em;\n" +
            "                color: #03919d; '>Vote Count:</span>" + data.results[i].vote_count + "</p>\n" +
            "<p><span style='    font-size: 1.294117647058824em;\n" +
            "    color: #03919d; '>Vote Average:</span>" + data.results[i].vote_average + "</p>";
        var modalDivFooter = document.createElement('div');
        modalDivFooter.setAttribute("class", "modal-footer");
        modalDivFooter.innerHTML = "<h2>...</h2>";
        modalDivContent.appendChild(modalDivHeader);
        modalDivContent.appendChild(modalDivBody);
        modalDivContent.appendChild(modalDivFooter);
    }
    modal.appendChild(modalDivContent);
}
//closing of the modal
function spanClose() {
    var modal = document.getElementById("modalBody");
    modal.style.display = "none";
    modal.innerHTML="";

}
// JavaScript Document for latest
function latest(elmnt) {
    buttonClicked = "Latest";
    clear();
    setColors(elmnt,'#d6a1ce');
    var i = 0;
    var request = new XMLHttpRequest();
    //since there is only one content in the json file we do not have to iterate to get the elements so we can have this in a seperate function
    request.open('GET', 'https://api.themoviedb.org/3/movie/latest?api_key=fb5875eace5a99021e9a7dc4728b1a6b&language=en-US');
    request.onload = function () {
        var latest = JSON.parse(request.responseText);
        //getting image of the movies and displaying them in the html
        var src = document.getElementById("images");
        var newDiv = document.createElement('div');
        //pasring the json and getting the object
        newDiv.innerHTML = "<image src=" + "http://image.tmdb.org/t/p/w185/" + latest.poster_path + " onerror=\"this.src='noImageFound.jpg'\">\n" +
            "<span ><h1>Title:" + latest.title + "</h1></span>\n" +
            "<p>Overview:" + latest.overview + "</p>\n" +
            "<p>Release Date:" + latest.release_date + "</p>\n" +
            "<p>Popularity:" + latest.popularity + "</p>\n" +
            "<p>Vote Count:" + latest.vote_count + "</p>\n" +
            "<p>Vote Average:" + latest.vote_average + "</p>";
        src.appendChild(newDiv);
        console.log(latest.poster_path);
    };
    request.send();
}
//showmore button function
function showMore()
{
    pageNo++;
    openMovies();

}