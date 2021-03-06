//------> function create initial map
let map;
function initMap(events) {
  if (!events) {
    events = [];
  }
  map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 49.273099, lng: -123.119668},
        zoom: 12
        });

      addEvents(events, google);

  }

function initialize() {
  var input = document.getElementById('searchTextField');
  var options = {
    componentRestrictions: {country: "ca"}
 };
  var address = new google.maps.places.Autocomplete(input, options);
  google.maps.event.addListener(address, 'place_changed', function(){
    var place = address.getPlace();
    var location = "<b>Address: </b>" + place.formatted_address + "</br>";
    var lat = "<b>Latitude: </b>"+ place.geometry.location.lat() + "</br>";
    var lng = "<b>Longitude: </b>"+ place.geometry.location.lng() + "</br>";
    // console.log(place.geometry.location.lat(), place.geometry.location.lng())
    document.getElementById('address_text').innerHTML = location;
    $('#lng').val(place.geometry.location.lng());
    $('#lat').val(place.geometry.location.lat());

  })
  initMap()
}


$(document).ready(function(){
});
