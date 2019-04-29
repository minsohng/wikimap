
$(() => {

  // Ajax Request for mapId and run function
  $('.map-select').on('click', (event) => {
    $.get(`/maps/${event.target.attributes.mapId.value}`, (map_event) => {
      console.log(map_event)
      initMap(map_event);
    })
  })

  $('.event-btn').on('click', (event) => {
    $.get(`/events/${event.target.attributes.eventsId.value}`, (map_event) => {
      console.log(map_event)
      initMap(map_event);
    })

  })

  // Drop down list for selecting a map

    $('.drop-down-item').hide()
    $('#event-form').hide()


    $('.drop-down').on('click', event => {
      $('.drop-down-item').slideToggle(400)
    })


    $('.drop-down-item').on('click', event => {
      $('#choose-map').slideUp(400)
      $('.event-address').slideDown(400)
    })

    // $('#event-btn').on('click', event => {
    //   $.post('/', (form) => {
    //     //post form information to database
    //   })
    // })

    $('.event-btn').on('click', event => {
      if ($('.start-date').val() || $('.end-date').val() === '') {
        alert('What Are You Doing?')
        return;
      }
    })

    $('.drop-down-item').on('click', event => {
      $target = $(event.target);
      $('#id').val($target.attr('mapId'))
    })

    $('#searchTextField').on('change', (event) => {
      $('#event-address').slideUp(400)
      $('#event-form').slideDown(400)
    })

})
