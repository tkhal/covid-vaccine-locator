function addCards(location, address, available, url) {
  document.getElementById("cards").innerHTML +=
    "<div class='card w-100 mb-2'>" +
      "<div class='card-body'>" +
        "<h5 class='card-title'>" + location + "</h5>" +
        "<ul>" +
          "<li>" + address + "</li>" +
          "<li>" + available + "</li>" +
          "<li><a href=" + url + ">" + url + "</a></li>" +
        "</ul>" +
      "</div>" +
    "</div>";
};
  
function loadCards(VaccineLocations) {
  var available;
  for(var i = (VaccineLocations.length-1); i > 0; i--){
      var prefix = VaccineLocations[i].properties;
      if(prefix.appointments_available === true) {
          available = "<span style='color:green'>Vaccines Available</span>";
      }
      else if(prefix.appointments_available === null) {
          available = "<span style='color:orange'>Vaccine availability unknown";
      }
      else {
          available = "<span style='color:red'>Vaccines Unavailable</span>";
      }
      let location = prefix.provider_brand_name;
      let address = prefix.address + ' ' + prefix.city + ', ' + 
                  prefix.state + ' ' + prefix.postal_code;
      let url = prefix.url;
      addCards(location, address, available, url);
  }
};

function removeCards() {
  var container = document.querySelector('#cards');
  if(container === null) {
    return;
  }
  else {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }
}