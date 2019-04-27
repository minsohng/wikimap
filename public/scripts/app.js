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

})
