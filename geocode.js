// Get location form
var locationForm = document.getElementById('location-form');

// Listen for submit (when user clicks button)
locationForm.addEventListener('submit', geocode);

function geocode(e){
  // Prevent actual submit until location information has been filled

  e.preventDefault();

  var location = document.getElementById('location-input').value;

  axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
    params:{
      address:location,
      key:'AIzaSyARv3XGy6cc3LrzKS6ai0YPzp8Jlgnmy3g'
    }
  })
  .then(function(response){
    // Log full response
    console.log(response);

    // Formatted Address
    var formattedAddress = response.data.results[0].formatted_address;
    
    var formattedAddressOutput = `
      <ul class="list-group">
        <li class="list-group-item">${formattedAddress}</li>
      </ul>
    `;

    // Address Components
    var addressComponents = response.data.results[0].address_components;
    var addressComponentsOutput = '<ul class="list-group">';
    for(var i = 0;i < addressComponents.length;i++){
      addressComponentsOutput += `
        <li class="list-group-item"><strong>${addressComponents[i].types[0]}</strong>: ${addressComponents[i].long_name}</li>
      `;
    }
    addressComponentsOutput += '</ul>';

    // Geometry
    var lat = response.data.results[0].geometry.location.lat; 
    var lng = response.data.results[0].geometry.location.lng;
    var geometryOutput = `
      <ul class="list-group">
        <li class="list-group-item"><strong>Latitude</strong>: ${lat}</li>
        <li class="list-group-item"><strong>Longitude</strong>: ${lng}</li>
      </ul>
    `;

    // Output to app
//        document.getElementById('formatted-address').innerHTML = formattedAddressOutput; // testing
//        document.getElementById('address-components').innerHTML = addressComponentsOutput; // testing
    //document.getElementById('geometry').innerHTML = geometryOutput;
    state = getState(response.data.results[0].address_components);
    document.getElementById("state-name").innerHTML = state[1] + ":"
    document.getElementById("covid-stats").style.visibility = 'visible';
    getUserSearch(state[0], lat, lng)
    getVaccineInfo(state[0]);
    getUSVaccineInfo();
    //loadPlace(lat,lng, VaccineLocations)
  })
  .catch(function(error){
    console.log(error);
  });
}

// this function determines the state based on the geocode information
function getState(address_components){
  // array of possible state abriviations
  var states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VI', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']
  // loop throught the address components to find the component that has the state abbriviation
  for(var i = 0; i < address_components.length; i++){
    if(states.includes(address_components[i].short_name)){
      //console.log('State:')
      //console.log(address_components[i].long_name)
      return [address_components[i].short_name, address_components[i].long_name]
    }

  }
}

