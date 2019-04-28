//------> function create event in html

function createEvent (data) {
  let $map = $('#map');
  let $event = $("<div>").addClass("content");
  let $name = $("<h1>").addClass("event_name").text(data.name).appendTo($event);
  let $picture = $("<img>").addClass("event_img").attr("src",data.img_url).appendTo($event);
  let $address = $("#address_text").appendTo($event);
  let $url = $("<a>").addClass("event_url").attr("href", data.url).text(data.url).appendTo($event);
  let $latitude = $("<address>").addClass("latitude").text(data.latitude);
  let $longitude = $("<address>").addClass("longitude").val(data.longitude);
  let $start_date_text = $("<p>").addClass("start_date_text").text('Start date: ').appendTo($event);
  let $start_date = $("<p>").addClass("start_date").text(moment(data.start_date).format('LLL')).appendTo($event);
  let $end_date_text = $("<p>").addClass("end_date_text").text('End date: ').appendTo($event);
  let $end_date = $("<p>").addClass("end_date").text(moment(data.end_date).format('LLL')).appendTo($event);
  let $description_text = $("<p>").addClass("description_text").text('Description: ').appendTo($event);
  let $description = $("<p>").addClass("description").text(data.description).appendTo($event);
  let $link = $('<a>').attr('href', '/my_events').appendTo($event);
  let $edit = $(`<button>`).text('Edit').addClass('info_button').appendTo($link);
  $event.appendTo($map);
  return $event.prop('outerHTML');
};





//------> function add event to the map and diusplay infowind
function addEvents(events, google){
  events.forEach(event =>{

    let marker = new google.maps.Marker({
      position: {lat: Number(event.latitude), lng: Number(event.longitude)},
      map: map,
      title: event.name
    });
    marker.setMap(map);
    let eventContent = createEvent(event);
    var infowindow = new google.maps.InfoWindow({
      content: eventContent,
      maxWidth: 300
    });

    marker.addListener('click', function() {
      infowindow.open(map, marker);
      // $('.info-button').on('click', map, function(){
      // //   infowindow.close();
      //   // var htmlString = editEvent();
      //   // console.log(htmlString);
      //   window.location.href='/edit_events';
      // })
    google.maps.event.addListener(map, "click", function(event) {
      infowindow.close();
    });
    });
  });
}


