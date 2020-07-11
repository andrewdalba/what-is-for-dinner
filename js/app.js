$(document).foundation()
var x = $("#location_input");
var lat, lon;

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
$('#restaurantForm').submit(function (event) {
  event.preventDefault();
  // validate input before proceed
  var textLocation = $("#location_input").val();
  var cusineChoice=$("#cusineChoice").val();
  var milesRadius=$("#milesRadius").val();
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

  alertCall("pass!");
});