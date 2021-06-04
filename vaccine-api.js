//variable to hold the url sections needed for the api calls.
var vaccine_spotter_url = 'https://www.vaccinespotter.org/api/'
var VS_api_state = 'https://www.vaccinespotter.org/api/v0/states/'
var searchButton = document.querySelector("#search");
var defaultRadius = 5


// function to get the locations where you can get vaccinated.
var getStateInfo = function(url, lat, long){
  //get the http requests
  var xhttp = new XMLHttpRequest();
  xhttp.open('GET', url, true);
  xhttp.responseType = 'json';
  xhttp.onload = function() {
    var status = xhttp.status;
    var response = xhttp.response;
    // check if call worked
    if (status === 200) {
      // cat searchLocations to get the locations in the radius
      locations = searchLocations(response.features, lat, long);
      loadPlace(lat, long, locations)
      removeCards();
      loadCards(locations);
    } else {
      // alert if the call doesn't work
      alert('error with api request url');
    }

  };
  xhttp.send();
};

// fucntion to get the distance between two coordinate points
function getDistance(originLat, originLong, destLat, destLong){
  // world radius in miles
  var worldRadius = 3957;
  var distLat = toRad(originLat - destLat);
  var distLong = toRad(originLong - destLong);
  originLat = toRad(originLat);
  destLat = toRad(destLat);

  var value = Math.sin(distLat/2)**2 + Math.cos(originLat) * Math.cos(destLat) * Math.sin(distLong/2)**2;
  value = 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1-value));
  var dist = worldRadius * value;

  return dist;
}

function toRad(degree){
  return degree * (Math.PI/180)
}

// function uses the state and lat and long from the search value to get the locations with the radius
function getUserSearch(state, lat, long){
    var searchURL = VS_api_state + state + '.json';
    return getStateInfo(searchURL, lat, long);
    //getVaccineInfo(stateValue)
};

// this function returns the locations within the radius
function searchLocations(locations, lat, long){
  var radiusLocations = []
  var dist = 0
  var radius = document.getElementById("search-radius").value

  radius = parseInt(radius)

  if(isNaN(radius)){
    radius = defaultRadius
  }
  // loop through each location
  for(i = 0; i < locations.length; i++){
    // get the distance between the search point and the location
    dist = getDistance(lat, long, locations[i].geometry.coordinates[1], locations[i].geometry.coordinates[0])
    // checks if within the distance
    if(dist <= radius){
      // adds to array if within distance
      radiusLocations.push(locations[i])
    }
  }
  // returns locations within distance
  return radiusLocations;
}
