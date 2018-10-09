//javascript, jQuery
// Setup Global Variables
var searchCounter = 0;
var searchLimit = 8;
var searchResult = "";
var searchGiphy = "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5";
var newSearchState = true;
var fetchMoreButton = true;
var favouriteImages = [];

$('#search_Giphy').on('keydown', function (e) {
    // only trigger search when user press down enter
    if (e.which == '13') {
        searchResult = $('#search_Giphy').val();
        search_Giphy_results();
    }
});

function search_Giphy_results() {

    if (newSearchState) {
        $("#gallery").empty();
        searchCounter = 0;
        searchLimit = 8;
    } else {
        searchLimit = searchLimit + 8;
    }

    searchGiphy = "http://api.giphy.com/v1/gifs/search?q=" + searchResult +
        "&api_key=EL0x22eZIsaBOefGty0lhD4CLRXzPWjA&limit=" + searchLimit;

    var jqxhr = $.get(searchGiphy, function (data) {
            console.log("success");
        })
        .done(function (data) {

            // need to do a for loop and append the data
            for (searchCounter; searchCounter < searchLimit; searchCounter++) {

                if (typeof data.data[searchCounter] === 'undefined') {
                    if (searchCounter === 0) {
                        $("#gallery").append("No Results");
                    } else {
                        $("#gallery").append("No More Results");
                    }
                    break;
                }

                $("#gallery").append("<div" + " class=\"gallery_images_container col-xs-12 col-sm-3\" " + ">" + "<img id=" +
                    searchCounter +
                    " class=\"gallery_images col-xs-12\" onclick='test(\"test\")' src=" +
                    data.data[searchCounter].images.downsized.url + ">" + "</img>" + "</div>");
            }

            // append fetch more button
            if (newSearchState && fetchMoreButton) {
                // console.log(fetchMoreButton, "fetch more button");
                var r = $('<input/>').attr({
                    type: "button",
                    id: "field",
                    value: "Fetch More",
                    onclick: "fetchMoreImages()"
                });
                $("#gallery_moreImages").append(r);
                fetchMoreButton = false;
            }
            newSearchState = true;
        })
        .fail(function () {
            $("#gallery").append("Error!");
            console.log("error");
        })
        .always(function () {
            console.log("finished");
        });
    // Perform other work here ...

    // Set another completion function for the request above
    jqxhr.always(function () {
        
        console.log("second finished");
    });
}

function fetchMoreImages() {
    newSearchState = false;
    search_Giphy_results();
}

function test(value) {

    var thisX = $(event.target).closest('.gallery_images').prevObject[0];
    $(thisX).after(' <img src="images/heart_icon.jpg" id="heart_icon_image" />');

    console.log(thisX.src);

    favouriteImages.push(thisX.src);
    sessionStorage.setItem('favouriteImagesArray', favouriteImages);

    console.log(favouriteImages);
    console.log("hellobye")
}

// $(window).load(function () {

//     console.log("windowload is working ");

//     $('body').on("click", ".gallery_images", function (event) {
//         event.preventDefault();
//         // e.preventDefault();
//         alert("success");

//         $(this).after(' <img src="images/heart_icon.jpg" id="heart_icon_image" />');

//         $(this).attr("src", function (index, attr) {
//             favouriteImages.push(" " + $(this).attr("src") + " ");
//             console.log($(this).attr("src"));
//             console.log(favouriteImages);
//             sessionStorage.setItem('favouriteImagesArray', favouriteImages);
//         });

//     }, function () {
//         $('#heart_icon_image').remove();
//     });
// });