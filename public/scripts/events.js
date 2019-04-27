//------> function create event in html

function createEvent (data) {
  let $map = $('#map');
  let $event = $("<div>").addClass("content");
  let $latitude = $("<address>").addClass("latitude").text(data.latitude).appendTo($event);
  let $longitude = $("<address>").addClass("longitude").val(data.longitude).appendTo($event);
  let $name = $("<h1>").addClass("event_name").text(data.name).appendTo($event);
  let $url = $("<a>").addClass("event_url").attr("href", data.url).text(data.url).appendTo($event);
  let $start_date = $("<p>").addClass("start_date").text(data.start_date).appendTo($event);
  let $end_date = $("<p>").addClass("end_date").text(data.end_date).appendTo($event);
  let $picture = $("<img>").addClass("event_img").attr("src",data.picture).appendTo($event);
  let $description = $("<p>").addClass("description").text(data.description).appendTo($event);
  $event.appendTo($map);
  return $event.prop('outerHTML');
};

//------> function add event to the map and diusplay infowind
function addEvents(events, google){
  console.log(google)
  events.forEach(event =>{
    console.log(event.latitude)
    let marker = new google.maps.Marker({
      position: {lat: Number(event.latitude), lng: Number(event.longitude)},
      map: map,
      title: event.name
    });
    marker.setMap(map);
    let eventContent = createEvent(event);
    var infowindow = new google.maps.InfoWindow({
      content: eventContent,
    });

    marker.addListener('click', function() {
      infowindow.open(map, marker);

    });

  })
}
