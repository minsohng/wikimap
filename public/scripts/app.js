$(() => {

  // Ajax Request for mapId and run function
  $('.map-select').on('click', (event) => {
    $.get(`/maps/${event.target.attributes.mapId.value}`, (map_event) => {
      initMap(map_event)
    })
  })


  // Drop down list for selecting a map


    $('.drop-down-item').hide()

    $('.drop-down').on('click', (event) => {
      $('.drop-down-item').slideToggle(400)
    })


    $('.drop-down-item').on('click', (event) => {
      $('#choose-map').slideUp(400)
      $('.event-address').slideDown(400)
    })

    function editEvent (data){
      let $map = $('#map');
      let $form = $("<div>").addClass("content");
      let $edit_title = $("<h3>").addClass("edit_title").text("Edit your event data:").appendTo($form);
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
})
