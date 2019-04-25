

function initMap() {

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.273099, lng: -123.119668},
    zoom: 12
  });

  var marker = new google.maps.Marker({
    position: {lat: 49.273365, lng: -123.119979},
    map: map,
    title: 'First Event'
  });





 // var contentString =
 // '<div id="content">'+
 //   '<div id="siteNotice">'+
 //   '</div>'+
 //   '<h1 id="firstHeading" class="firstHeading">First Event</h1>'+
 //   '<div id="bodyContent">'+
 //   '<p><b>First tech event</b>, hosted in Vancouver. Join now! ' +
 //   '<div id="event_img"><img src=http://www.bobbialbano.com/wp-content/uploads/2017/11/best-tech-sites.jpg'+
 //   '</div>'+
 //   '<div id="event_url"> <a href=www.lighthouselabs.com >www.lighthouselabs.com' +
 //   '</a>'
 //   '</div>'
 //   '</div>';

 // var infowindow = new google.maps.InfoWindow({
 //   content: contentString
 // });
 // marker.addListener('click', function() {
 //   infowindow.open(map, marker);
 // });
}


$(document).ready(function(){

});
