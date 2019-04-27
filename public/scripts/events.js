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
  let $edit = $(`<input type="button" value="Edit" class="info-button"/>`).appendTo($event);
  $event.appendTo($map);
  return $event.prop('outerHTML');
};


function editEvent (data){
  let $map = $('#map');
  let $form = $("<div>").addClass("content");
  let $edit_title = $("<h4>").addClass("edit_title").text("Edit your event data:").appendTo($form);
  let $form_latitude = $("<input>").addClass("form_latitude").appendTo($form);
  let $form_longitude = $("<input type: 'value', id: 'flong', placeholder: 'Longitude'/>").appendTo($form);
  let $form_name = $("<input type: 'text', id: 'fname', Event name: 'name', placeholder: 'Event Name'/>").appendTo($form);
  let $form_start = $("<input>").addClass("form_start").appendTo($form);
  let $form_end = $("<input>").addClass("form_end").appendTo($form);
  let $form_url = $("<input>").addClass("form_url").appendTo($form);
  let $form_picture = $("<input>").addClass("form_picture").appendTo($form);
  let $f_description = $("<textarea rows: 'px', cols: '27px',type: 'text',id: 'description', name: 'desc', placeholder: 'Event description' />").appendTo($form);
  let $submit_bttn = $("<input type: 'button', id: 'submit', placeholder: 'Submit' />").appendTo($form);
  $form.appendTo($map);
  return $form.prop('outerHTML');
}


//------> function add event to the map and diusplay infowind
function addEvents(events, google){
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
      $(document).on('click', '.info-button', function(){
        var htmlString = editEvent();
        console.log(htmlString);
        $(this).parent().html(htmlString);
      })
    });


    // $('form').on('submit', function(event) {
    // event.preventDefault();
    // let data = $(this).serialize();
    // $.ajax({
    //   url: '/tweets',
    //   method: 'POST',
    //   data: data
    // }).then(
    //   (res) => {
    //     loadTweets();
    //     let form = document.getElementById('form');
    //     let counter = document.getElementById('counter');
    //     form.reset();
    //     counter.textContent = '140';
    //   },
    //   (err) => { console.log('Error') }
    // )
  });

}
