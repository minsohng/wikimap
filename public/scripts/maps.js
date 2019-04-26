//------> function create initial map
let map;
let map1;
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


$(document).ready(function(){

});
