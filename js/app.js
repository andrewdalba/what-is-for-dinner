$(document).foundation()
var x = $("#location_input");
var lat, lon, milesRadius, cusineChoice;
var apiKey="";

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
function alertCall(t){
  $("#alertText").text(t);
  $('#alertModal').foundation( 'open');
}

function restaurantSearch(){
  $.ajax({
    url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=${milesRadius*1600}&type=restaurant&keyword=${cusineChoice}=${apiKey}`,
    method: "GET",
    responseType:'application/json',
  }).then(function (response) {
    console.log(response)
  }).catch(function (error) {
    // if error use default

    alertCall("ERRRoRRR! #"+error.status)
  });
   
}


$('#restaurantForm').submit(function (event) {
  event.preventDefault();
  // validate input before proceed
  var textLocation = $("#location_input").val();
   cusineChoice=$("#cusineChoice").val();
   milesRadius=$("#milesRadius").val();
  var dishesChoice=$("#dishesChoice").val();
  if (!lat) {
    getLocation();
  }
 if (!milesRadius){
  alertCall("Please enter radious of search");
   return;
 };
 if ((!dishesChoice)&&(!cusineChoice)){
   alertCall("Please enter something! I have no idea what you like to eat"); 
   return;
 }
  restaurantSearch();
  alertCall("pass!");
});