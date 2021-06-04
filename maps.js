function initMap(){
    // Map options
    var options = {
      zoom:8,
      center:{lat:45.510185,lng:-122.452385}
    }

    // New map
    var map = new google.maps.Map(document.getElementById('map'), options);

    // Listen for click on map
    google.maps.event.addListener(map, 'click', function(event){
      // Add marker
      addMarker({coords:event.latLng});
    });

    // Array of markers
    var markers = [
      {
        coords:{lat:42.4668,lng:-70.9495},
        iconImage:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
        content:'<h1>Lynn MA</h1>'
      },
      {
        coords:{lat:42.8584,lng:-70.9300},
        content:'<h1>Amesbury MA</h1>'
      },
      {
        coords:{lat:42.7762,lng:-71.0773}
      }
    ];

    // Loop through markers
    for(var i = 0;i < markers.length;i++){
      // Add marker
      addMarker(markers[i]);
    }
    function addMarker(props){
      var marker = new google.maps.Marker({
        position:props.coords,
        map:map,
        //icon:props.iconImage
      });
  
      // Check for customicon
      if(props.iconImage){
        // Set icon image
        marker.setIcon(props.iconImage);
      }
  
      // Check content
      if(props.content){
        var infoWindow = new google.maps.InfoWindow({
          content:props.content
        });
  
        marker.addListener('click', function(){
          infoWindow.open(map, marker);
        });
      }
    }
  }


  // function to laod map when people enter their address
function loadPlace(lat, long, VaccineLocations){
  // create new map centered on the lat and long
  var options = {
      zoom:10,
      center:{lat:lat,lng:long}
    }
  var map = new google.maps.Map(document.getElementById('map'), options);
  
  //call function addLocations for each location passed into the function
  for(var i = 0; i < VaccineLocations.length; i++){
    addLocations(VaccineLocations[i])
  }

  var map = new google.maps.Map(document.getElementById('map'), options);
  
  //call function addLocations for each location passed into the function
  for(var i = 0; i < VaccineLocations.length; i++){
    addLocations(VaccineLocations[i])
  }

  // this function adds a marker for each location
  function addLocations(results){

    // this variable contains the coordinates and the content for the infoWindow
    var marker_info = {
      coords:{lat:results.geometry.coordinates[1],lng:results.geometry.coordinates[0]},
      content:'<p>' + results.properties.address + '</p><p>' + results.properties.provider + '</p>'
    }
    
    // create the marker
    var marker = new google.maps.Marker({
      position:marker_info.coords,
      map:map
    });

    // create the infoWindow to show information about the vaccination location
    var infoWindow = new google.maps.InfoWindow({
      content:marker_info.content
    });

    // add event listener so that the infoWindow is displayed when the marker is clicked.
    marker.addListener('click', function(){
       infoWindow.open(map, marker);
    });

  
  }
}

