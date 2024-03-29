$(document).foundation()
// define global variables
var x = $("#location_input");
var lat, lon, milesRadius, cusineChoice, photoRef, userLat, userLon;
var apiKey = "";
var apiKeyReceipy = "";
var data = {};
var actions = {};
var dataReceipy = {};
var rest_details = [];
var youtubeQ = "";
var video_detail = {};
var proxySite= 'https://pwa-budget-tracker.onrender.com';

$("#location_input").change(function () {
  weatherApiLocation($("#location_input").val())
});

// Using weather API for finding latitude and longitude based on what the user enters for "location"
function weatherApiLocation(city) {
  var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=f2db8e1b3757f3e4e3db807ed339605e`;
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      userLat = response.city.coord.lat;
      userlon = response.city.coord.lon;
      lat = response.city.coord.lat;
      lon = response.city.coord.lon;
    });
};
// handle the location search(latitude,longitude) by calling Ajax on geolocation-db
function getLocation() {
  $.ajax({
    url: "https://geolocation-db.com/jsonp",
    jsonpCallback: "callback",
    dataType: "jsonp",
    success: function (location) {
      x.val(location.city + "," + location.state + "," + location.country_name);
      lat = location.latitude;
      lon = location.longitude;
    }
  });
}
// handles calls to alert of any sort by displaying the modal
function alertCall(textAlert) {
  $("#alertText").text(textAlert);
  $('#alertModal').foundation('open');
}

$('#modalForm').submit(function (event) {
  event.preventDefault();
  // validate input before 
  var textinput = $("#modal_input").val();
  if (textinput != "") {
    $('#inputModal').foundation('close');
    apiKey = textinput;
  }
});

$('#openRecipeAccButton').click(function () {
  $('#accordion3').addClass('is-active');
  $('#accordion3-label').attr('aria-expanded', 'true');
  $('#accordion3-label').attr('aria-selected', 'true');
  $('#testing2').attr('style', 'display: block;');

  $([document.documentElement, document.body]).animate({
    scrollTop: $("#accord3").offset().top
  }, 2000);
});

// hadles the Prompt-like requests
function inputdata(textAlert) {
  $("#alertText1").text(textAlert);
  $('#inputModal').foundation('open');
}
// getting data for the restaurants search
function restaurantSearch() {
  var params = {};
  params.target = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=${milesRadius * 1600}&type=restaurant&keyword=${cusineChoice}&key=`;
  $.ajax({
    url: proxySite +'/proxy/api/0/v1' + $.param(params),
    method: 'GET'
  }).then(function (response) {
    // Creates cards for search results
    drawRestaurants(response);
  });
}
// getting the image for the restaurant by reference number
function findImg(imgRef, n) {
  var params = {};
  var imghold = "";
  params.target = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${imgRef}&key=`;
  // url: 'https://localhost:3000/proxy/api/1/v1' + $.param(params),
  $.ajax({
    url: proxySite +'/proxy/api/1/v1' + $.param(params),
    method: 'GET'
  }).then(function (response) {
    // heavy duty string cutting to get to the link to the image
    $("#img" + n).attr("src", response);
  });
  // do not remove it takes time let her think
  new Promise(resolve => setTimeout(resolve, 3000));
}
// calling details for specific restaurant and adding them to the card
function findDetails(n) {
  var params = {};
  var restID = restaurants.results[n].place_id;
  params.target = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${restID}&key=`;
  $.ajax({
    url: proxySite+'/proxy/api/0/v1' + $.param(params),
    method: 'GET'
  }).then(function (response) {
    rest_details[n] = response;
    $("#locate" + n).html("");
    $("#locate" + n).text("Location: " + rest_details[n].result.formatted_address);
    $("#telephone" + n).text("tel: " + rest_details[n].result.formatted_phone_number);
    if (typeof rest_details[n].result.website == "string") {
      $("#website" + n).html(`<a class="button" href="${rest_details[n].result.website}">Go to Website</a>`);
    } else {
      $("#website" + n).text('Website: NONE');
    }
  });
}

// Function that draws each restaurant card based on the search results
function drawRestaurants(res) {
  console.log(res)
  // restaurants = JSON.parse(res);
  restaurants = res;
  $("#restaurantList").html("");
  for (var i = 0; i < restaurants.results.length; i++) {
    var restaurantlocation = restaurants.results[i].vicinity;
    var restaurantRating = restaurants.results[i].rating;
    var restaurantName = restaurants.results[i].name;
    var starRating;
    // calls for image only if there is one in the object
    if (restaurants.results[i]['photos']) {
      var restaurantIcon = "./assets/images/burgerplaceholder.jpg"
      var cardImage = $(`<img id='img${i}' src='${restaurantIcon}' style='max-height: 250px' alt='restaurant Icon'>`);
      findImg(restaurants.results[i].photos[0].photo_reference, i);

    }
    // if theres not an image in the object, a placeholder pic of a hamburger goes in the image tag
    else {
      var cardImage = $(`<img src='./assets/images/burgerplaceholder.jpg' style='max-height: 250px' alt='NO restaurant Icon'>`);
    }
    // if the object has an element called "opening_hours" then it prints the info and changes the color accordingly
    if (restaurants.results[i]['opening_hours']) {
      if (restaurants.results[i].opening_hours['open_now']) {
        var openConfirm = $(`<p style='color: green;'>Open Now</p>`);
      }
      if (restaurants.results[i].opening_hours['open_now'] === false) {
        var openConfirm = $(`<p style='color: red;'>Closed</p>`);
      }
    }
    // if the object does not have "opening_hours" it prints "no info"
    else {
      var openConfirm = $(`<p style='color: yellow;'>No Info</p>`);
    }

    // IF statements that control the star rating image
    if (restaurantRating < 1.5) {
      starRating = "./assets/images/1star.png"
    }
    if (restaurantRating >= 1.5 && restaurantRating < 2) {
      starRating = "./assets/images/1.5star.png"
    }
    if (restaurantRating >= 2 && restaurantRating < 2.5) {
      starRating = "./assets/images/2star.png"
    }
    if (restaurantRating >= 2.5 && restaurantRating < 3) {
      starRating = "./assets/images/2.5star.png"
    }
    if (restaurantRating >= 3 && restaurantRating < 3.5) {
      starRating = "./assets/images/3star.png"
    }
    if (restaurantRating >= 3.5 && restaurantRating < 4) {
      starRating = "./assets/images/3.5star.png"
    }
    if (restaurantRating >= 4 && restaurantRating < 4.5) {
      starRating = "./assets/images/4star.png"
    }
    if (restaurantRating >= 4.5 && restaurantRating < 5) {
      starRating = "./assets/images/4.5star.png"
    }
    if (restaurantRating >= 5) {
      starRating = "./assets/images/5star.png"
    }
    // end of IF statements that control star rating image

    // setting the correct amount of "$"s in the variable "price symbol"
    var priceLevel;
    priceLevel = restaurants.results[i].price_level;
    var priceSymbol;
    for (var x = 0; x <= priceLevel; x++) {
      priceSymbol = "$";
      priceSymbol = priceSymbol.repeat(x);
    }

    // Creating HTML for each restaurant card
    var restaurantCell = $("<div class='cell'>")
    var restaurantCard = $("<div class='card'>");
    var cardHeader = $(`<div class='card-divider' value='${restaurants.results[i].id}'>${restaurantName}</div>`);
    var cardTextSection = $(`<div class='card-section'>`);
    var cardSectionRating = $(`<p>Rating: ${restaurantRating}</p>`);
    var cardSectionStarRating = $(`<p><img src='${starRating}' alt='starRating' style='max-width: 40%;'></img></p>`);
    var cardSectionPrice = $(`<p>Price Level: ${priceSymbol}</p>`);
    var cardSectionlocation = $(`<p id = "locate${i}"> Location: ${restaurantlocation}</p>`);
    var cardSectiontel = $(`<p id = "telephone${i}" ></p>`);
    var cardSectionweb = $(`<p id = "website${i}" ></p>`);
    // appending each HTML tag in the correct order
    $(restaurantCard).append(cardHeader);
    $(restaurantCard).append(cardImage);
    $(restaurantCard).append(cardTextSection);
    $(cardTextSection).append(cardSectionRating);
    $(cardTextSection).append(cardSectionStarRating);
    $(cardTextSection).append(cardSectionPrice);
    $(cardTextSection).append(cardSectionlocation);
    $(cardTextSection).append(cardSectiontel);
    $(cardTextSection).append(cardSectionweb);
    $(cardTextSection).append(openConfirm);
    $(restaurantCell).append(restaurantCard);
    $("#restaurantList").append(restaurantCell);
    findDetails(i);
  }

};
//  calls spoonacular endpoints for ingredients and analysed 
// instruction put both calls display in modal 
// also puts image of the dish into the background
function dishClick(n) {
  var dishId = $("#dish_" + n).attr("value");
  $("#ReceipyTitle").text(data.results[n].title)
  $('#ReceipyModal').css("background-image", "url(" + data.results[n].image + ")");
  var ingredientURL = proxySite+"/proxy/api/key/1/" + dishId;
  console.log(ingredientURL);
  $.ajax({
    url: ingredientURL,
    method: "GET"
  }).then(function (data) {
    dataReceipy = data;
    var listIng = "";
    for (var i = 0; i < dataReceipy.ingredients.length; i++) {
      listIng += dataReceipy.ingredients[i].name + " " + dataReceipy.ingredients[i].amount.us.value + dataReceipy.ingredients[i].amount.us.unit + "<br>";
    }
    $("#ingredientsList").html(listIng);
  }).catch(function (error) {
    alertCall("Errors!!! in Receipy ingredientsWidget " + error.status);
  });
  ingredientURL = proxySite+"/proxy/api/key/2/" + dishId;
  console.log(ingredientURL);
  $.ajax({
    url: ingredientURL,
    method: "GET",
  }).then(function (data1) {
    actions = data1;
    var listActions = "";
    for (var i = 0; i < actions[0].steps.length; i++) {
      listActions += (i + 1) + ". " + actions[0].steps[i].step + "<br>";
    }
    $("#orderList").html(listActions);

  }).catch(function (error) {
    alertCall("Errors!!! in Receipy Analyzed Instructions " + error.status);
  })
  $('#ReceipyModal').foundation('open');
};
// subfunction of the function dishClick(n) that arrange ingredients into readable form
function DrawIngredients() {
  var listIng = "";
  for (var i = 0; i < dataReceipy.ingredients.length; i++) {
    listIng += dataReceipy.ingredients[i].name + " " + dataReceipy.ingredients[i].amount.us.value + dataReceipy.ingredients[i].amount.us.unit + "<br>";
  }
  return listIng;
}
// calles for recepies and display them in the list
function recepiesSearch(url) {
  $.ajax({
    url: proxySite+"/proxy/api/key/0/" + url,
    method: "GET",
  }).then(function (data1) {
    data = data1;
    var el = `<div class="grid-x grid-padding-x">`;
    for (var i = 0; i < data.results.length; i++) {
      el +=
        `<div  class="large-6 medium-6 cell" >
          <img style="padding: 5px; width:100%; border-radius: 2rem; border: 1, solid, salmon"  src="${data.results[i].image}" alt="${data.results[i].title}'s image">
        </div>
        <div  class="large-6 medium-6 cell recipeName"  >
          <h4 id="dish_${i}" onClick="dishClick(${i})" style="align-text: center; margin-top: 2rem " value="${data.results[i].id}">${i + 1}. ${data.results[i].title}</h4> 
        </div>`
    }
    $currentEl = document.createElement('div');
    $currentEl.innerHTML = el + "</div>";
    $("#ReceipiesTab").empty();
    $("#ReceipiesTab").append($currentEl);
  }).catch(function (error) {
    alertCall("Errors!!! receipies Search " + error.status);
  });
}
// clear the form from previous searches settings
$("#clear2").click(function () {
  $("#selType").val("");
  $("#cusineChoice2").val("");
  $("#dietChoice").val("");
  $("#outChoice").val("");
  $("#excludeChoice").val("");
  $("#dishesChoice2").val("");
  $("#returnN").val("10");
  $("#skipN").val("0");
});
// on submission of the recipe validate input and writes apropriate url for 
// AJAX requests for recipes search and Youtube search and send them to designated function
$('#receipiesForm').submit(function (event) {
  event.preventDefault();
  // validate input before proceed
  var foodName = $("#dishesChoice2").val();
  youtubeQ = "";
  if (foodName != "") {
    youtubeQ = foodName;
  }

  var receipiesURL = "";
  if ($("#selType").val() != "") {
    receipiesURL += "&type=" + $("#selType").val();
  }
  if ($("#skipN").val() != 0) {
    receipiesURL += "&offset=" + $("#skipN").val();
  }
  receipiesURL += "&number=" + $("#returnN").val();
  if ($("#cusineChoice2").val() != "") {
    receipiesURL += "&cuisine=" + $("#cusineChoice2").val();
    if (youtubeQ != "") {
      youtubeQ += "+" + $("#cusineChoice2").val() + "+cooking";
    } else {
      youtubeQ = $("#cusineChoice2").val() + "+cooking";
    }
  }
  if ($("#dietChoice").val() != "") {
    receipiesURL += "&diet=" + $("#dietChoice").val();
  }
  if ($("#outChoice").val() != "") {
    receipiesURL += "&intolerances=" + $("#outChoice").val();
  }
  if ($("#excludeChoice").val() != "") {
    receipiesURL += "&excludeIngredients=" + $("#excludeChoice").val();
  }
  receipiesURL += "&query=" + foodName;
  recepiesSearch(receipiesURL);


  // if ($("#apikeyYouTube").val() != "") {
  if ($("#secretpan").prop("checked") == false) {
    youtubeQ = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${$("#returnN").val()}&q=${youtubeQ}&key=`
    videoSearch(youtubeQ)
  } else {
    alertCall("To add youtube videos un-check checkbox")
    youtubeQ = "";
  }
  $([document.documentElement, document.body]).animate({
    scrollTop: $("#recipeListHeader").offset().top
  }, 2000);
});

// validate form submission from restaurant form and send them to the restaurant search function
$('#restaurantForm').submit(function (event) {
  event.preventDefault();
  // validate input before proceed
  var textLocation = $("#location_input").val();
  cusineChoice = $("#cusineChoice").val();
  milesRadius = $("#milesRadius").val();
  var dishesChoice = $("#dishesChoice").val();
 
  if (!lat) {
    getLocation();
  }
  if (!milesRadius) {
    alertCall("Please enter radious of search");
    return;
  };
  if (!cusineChoice) {
    alertCall("Please enter something! I have no idea what you like to eat");
    return;
  }
  restaurantSearch();
  expandAccordion2();

});

// This manually opens an accordion by changing attriubutes that would normally be handled by Foundation
function expandAccordion2() {
  $('#accordion2').addClass('is-active');
  $('#accordion2-label').attr('aria-expanded', 'true');
  $('#accordion2-label').attr('aria-selected', 'true');
  $('#testing1').attr('style', 'display: block;');
  $([document.documentElement, document.body]).animate({
    scrollTop: $("#accord2").offset().top
  }, 2000);
}
// draws videos search results from the data received
function videoDraw() {
  // video_detail
  var el_video = '';
  for (var i = 0; i < video_detail.items.length; i++) {
    el_video +=
      ` 
        <iframe width="420" height="315" src="https://www.youtube.com/embed/${video_detail.items[i].id.videoId}?controls=0"></iframe>
 
         <h4  style="align-text: center; margin-top: 2rem " value="${video_detail.items[i].id.videoId}">${i + 1}. ${video_detail.items[i].snippet.title}</h4> 
         <h6  style="align-text: left" value="${video_detail.items[i].id.videoId}"> ${video_detail.items[i].snippet.description}</h6> 
       `
  }
  $currentEl = document.createElement('div');
  $currentEl.innerHTML = el_video + "</div>";
  $("#videosTab").empty();
  $("#videosTab").append($currentEl);

}
//  perform search request for video and call drawing function
function videoSearch(link) {
  var params = {};
  params.target = link;
  $.ajax({
    url: proxySite+'/proxy/api/0/v1' + $.param(params),
    method: 'GET'
  }).then(function (response) {
    video_detail = response;
    videoDraw();
  });
}

// controlling "go to top button"
$(window).scroll(function () {
  if ($(this).scrollTop() > 500) {
    $('#myBtn').attr('style', 'display: block;');
  }
  else {
    $('#myBtn').attr('style', 'display: none;');
  }
});

// function that handles scrolling to the topo of the page
function topFunction() {
  $(window).scrollTop(0);
};
