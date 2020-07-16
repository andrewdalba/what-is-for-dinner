// Foundation.Abide.defaults.patterns['API-pattern'] = /^[0-9A-Za-z-\\.@:%_\+~#=]+$/;
$(document).foundation()
var x = $("#location_input");
var lat, lon, milesRadius, cusineChoice, photoRef;
var apiKey = "";
var apiKeyReceipy = "";
var data = {};
var actions = {};
var dataReceipy = {};
var rest_details = [];
// const recepiesAPIKey = "dff8f3f117msh752eb83c0d81eb8p10add3jsn52664fe1c35d";

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


function inputdata(textAlert) {
  $("#alertText1").text(textAlert);
  $('#inputModal').foundation('open');
}

function restaurantSearch() {
  var params = {};
  params.target = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=${milesRadius * 1600}&type=restaurant&keyword=${cusineChoice}&key=${apiKey}`;
  $.ajax({
    url: 'https://greve-chaise-90856.herokuapp.com/proxy/api/v1?' + $.param(params),
    method: 'GET'
  }).then(function (response) {
    // Creates cards for search results
    drawRestaurants(response);
    findImg();
  });
}

function findImg(n) {

  var params = {};
  var imghold = "";
  var links = [restaurants.results.length];
  imgRef = restaurants.results[n].photos[0].photo_reference;
  params.target = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${imgRef}&key=${apiKey}`;
  $.ajax({
    url: 'https://greve-chaise-90856.herokuapp.com/proxy/api/v1?' + $.param(params),
    method: 'GET'
  }).then(function (response) {
    // Creates cards for search results
    imghold = response.slice(response.search("HREF") + 6);
    imghold = imghold.slice(0, imghold.search(">") - 1);
    // alertCall(imghold);
    $("#img" + n).attr("src", imghold);
  });
  new Promise(resolve => setTimeout(resolve, 3000));
  // alertCall("wait")
  // while (linkRef===""){
  //   new Promise(resolve => setTimeout(resolve, 3000));
  // }


}

function findDetails(n) {

  var params = {};
  // var imghold = "";
  var restID = restaurants.results[n].place_id;

  params.target = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${restID}&key=${apiKey}`;
  $.ajax({
    url: 'https://greve-chaise-90856.herokuapp.com/proxy/api/v1?' + $.param(params),
    method: 'GET'
  }).then(function (response) {
    // console.log(response);
    rest_details[n] = JSON.parse(response);
    $("#locate" + n).html("");
    $("#locate" + n).text("Location: " + rest_details[n].result.formatted_address);
    $("#telephone" + n).text("tel: " + rest_details[n].result.formatted_phone_number);
    if (typeof rest_details[n].result.website =="string") {
      $("#website" + n).html(`Website: <a href="${rest_details[n].result.website}">${rest_details[n].result.website}</a>`);
    } else 
    {
      $("#website" + n).text('Website: NONE');
    }
  });
}



function drawRestaurants(res) {
  var imgRef = '';
  var linkRef = '';
  restaurants = JSON.parse(res);


  for (var i = 0; i < restaurants.results.length; i++) {
    // console.log(restaurants.results[i]);
    var restaurantlocation = restaurants.results[i].vicinity;
    var restaurantRating = restaurants.results[i].rating;
    var restaurantName = restaurants.results[i].name;
    var starRating;

    if (restaurants.results[i]['photos']) {
      var restaurantIcon = "./assets/images/burgerplaceholder.jpg"
      var cardImage = $(`<img id='img${i}' src='${restaurantIcon}' style='max-height: 250px' alt='restaurant Icon'>`);
      findImg(i);
    }
    else {
      var cardImage = $(`<img src='./assets/images/burgerplaceholder.jpg' style='max-height: 250px' alt='NO restaurant Icon'>`);
    }
    
    if (restaurants.results[i]['opening_hours']) {
      if (restaurants.results[i].opening_hours['open_now']) {
        var openConfirm = $(`<p style='color: green;'>Open Now</p>`);
      }
      if (restaurants.results[i].opening_hours['open_now'] === false) {
        var openConfirm = $(`<p style='color: red;'>Closed</p>`);
      }
    }
    else {
      var openConfirm = $(`<p style='color: yellow;'>No Info</p>`);
    }

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

    var priceLevel;
    priceLevel = restaurants.results[i].price_level;
    var priceSymbol;

    for (var x = 0; x <= priceLevel; x++) {
      priceSymbol = "$";
      priceSymbol = priceSymbol.repeat(x);
    }


    var restaurantCell = $("<div class='cell'>")
    var restaurantCard = $("<div class='card'>");
    var cardHeader = $(`<div class='card-divider' value='${restaurants.results[i].id}'>${restaurantName}</div>`);
    var cardTextSection = $(`<div class='card-section'>`);
    var cardSectionHeader = $(`<h4>Restaurant Info:</h4>`);
    var cardSectionRating = $(`<p>Rating: ${restaurantRating}</p>`);
    var cardSectionStarRating = $(`<p><img src='${starRating}' alt='starRating' style='max-width: 40%;'></img></p>`);
    var cardSectionPrice = $(`<p>Price Level: ${priceSymbol}</p>`);
    // var cardSectionlocation = $(`<p>Location: ${restaurantlocation}</p>`);
    var cardSectionlocation = $(`<p id = "locate${i}"> Location: ${ restaurantlocation }</p>`);
    var cardSectiontel = $(`<p id = "telephone${i}" ></p>`);
    var cardSectionweb = $(`<p id = "website${i}" ></p>`);

    $(restaurantCard).append(cardHeader);
    $(restaurantCard).append(cardImage);
    // $(restaurantCard).append(cardSectionHeader);
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


function dishClick(n) {
  var dishId = $("#dish_" + n).attr("value");
  $("#ReceipyTitle").text(data.results[n].title)
  $('#ReceipyModal').css("background-image", "url(" + data.results[n].image + ")")
  var ingredientURL = `https://api.spoonacular.com/recipes/${dishId}/ingredientWidget.json?apiKey=${apiKeyReceipy}`;
  $.ajax({
    url: ingredientURL,
    method: "GET",
    contentType: "application/json; charset=utf-8",
    dataType: 'json',
    data: JSON.stringify(data),
    success: function (data) {
      dataReceipy = data;
      var listIng = "";
      for (var i = 0; i < dataReceipy.ingredients.length; i++) {
        listIng += dataReceipy.ingredients[i].name + " " + dataReceipy.ingredients[i].amount.us.value + dataReceipy.ingredients[i].amount.us.unit + "<br>";
      }
      $("#ingredientsList").html(listIng);

    },
  }).catch(function (error) {
    alertCall("Errors!!! in Receipy ingredientsWidget " + error.status);
  });
  ingredientURL = `https://api.spoonacular.com/recipes/${dishId}/analyzedInstructions?apiKey=${apiKeyReceipy}`;
  $.ajax({
    url: ingredientURL,
    method: "GET",
    contentType: "application/json",
    success: function (data1) {
      actions = data1;
      var listActions = "";
      for (var i = 0; i < actions[0].steps.length; i++) {
        listActions += (i + 1) + ". " + actions[0].steps[i].step + "<br>";
      }
      $("#orderList").html(listActions);
    }
  }).catch(function (error) {
    alertCall("Errors!!! in Receipy Analyzed Instructions " + error.status);
  })
  $('#ReceipyModal').foundation('open');
};
function DrawIngredients() {
  var listIng = "";
  for (var i = 0; i < dataReceipy.ingredients.length; i++) {
    listIng += dataReceipy.ingredients[i].name + " " + dataReceipy.ingredients[i].amount.us.value + dataReceipy.ingredients[i].amount.us.unit + "<br>";
  }
  return listIng;
}
function recepiesSearch(url) {
  $.ajax({
    url: url,
    method: "GET",
  }).then(function (data1) {
    data = data1;
    var el = `<div class="grid-x grid-padding-x">`;
    for (var i = 0; i < data.results.length; i++) {
      el +=
        ` 
       <div  class="large-6 medium-6 cell" >
        <img style="padding: 5px; width:100%; border-radius: 2rem; border: 1, solid, salmon"  src="${data.results[i].image}" alt="${data.results[i].title}'s image">
       </div>
       <div  class="large-6 medium-6 cell recipeName"  >
         <h4 id="dish_${i}" onClick="dishClick(${i})" style="align-text: center; margin-top: 2rem " value="${data.results[i].id}">${i + 1}. ${data.results[i].title}</h4> 
       </div>
       `
    }
    $currentEl = document.createElement('div');
    $currentEl.innerHTML = el + "</div>";
    $("#ReceipiesTab").empty();
    $("#ReceipiesTab").append($currentEl);
  }).catch(function (error) {
    alertCall("Errors!!! receipies Search " + error.status);
  });
}
$('#receipiesForm').submit(function (event) {
  event.preventDefault();
  // validate input before proceed
  var foodName = $("#dishesChoice2").val();
  apiKeyReceipy = $("#apikeyReceipy").val();
  if (apiKeyReceipy === "") {
    alertCall("Please enter api Key! Can't go without it");
    return;
  }
  var receipiesURL = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + apiKeyReceipy;
  if ($("#selType").val() != "") {
    receipiesURL += "&type=" + $("#selType").val();
  }
  if ($("#skipN").val() != 0) {
    receipiesURL += "&offset=" + $("#skipN").val();
  }
  receipiesURL += "&number=" + $("#returnN").val();
  if ($("#cusineChoice2").val() != "") {
    receipiesURL += "&cuisine=" + $("#cusineChoice2").val();
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
});





$('#restaurantForm').submit(function (event) {
  event.preventDefault();
  // validate input before proceed
  var textLocation = $("#location_input").val();
  cusineChoice = $("#cusineChoice").val();
  milesRadius = $("#milesRadius").val();
  var dishesChoice = $("#dishesChoice").val();
  apiKey=$("#apiKeyChoice").val();
  if (!apiKey){
    alertCall("Please enter API key! It is required!");
    return;
  }
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
  // alertCall("pass!");
  // console.log(restaurants);
});

function videoSearch(key, maxRes, search) {
  var params = {};
  params.target = `http://googleapis.com/youtube/v3/search?key=${key}&type=video&part=snippet&maxResults=${maxRes}q=${search}`;
  $.ajax({
    url: 'https://greve-chaise-90856.herokuapp.com/proxy/api/v1?' + $.param(params),
    method: 'GET'
  }).then(function (data) {
    // Creates cards for search results
    console.log(data)
  });
}

  // videoSearch("AIzaSyCZKj_F4Qqpe0V2kyTI7Tr9h9nYTD6f1nM", 10, "pasta+cooking");
