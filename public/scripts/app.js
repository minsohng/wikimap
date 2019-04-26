$(() => {

  // Ajax Request for mapId and run function
  $('button').on('click', (event) => {
    $.get(`/maps/${event.target.attributes.mapId.value}`, (map_event) => {
      initMap(map_event)
    })
  })


  // Drop down list for selecting a map
  $('.drop-down').on('click', event => {

  })

})
