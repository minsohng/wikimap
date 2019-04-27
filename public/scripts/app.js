$(() => {

  // Ajax Request for mapId and run function
  $('map-select').on('click', (event) => {
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

      var input = document.getElementById('pac-input');
      var searchBox = new google.maps.places.SearchBox(input);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      function initAutocomplete() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.8688, lng: 151.2195},
          zoom: 13,
          mapTypeId: 'roadmap'
        });
