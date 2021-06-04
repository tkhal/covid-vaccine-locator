var act_now_request_url = 'https://api.covidactnow.org/v2/state/';
var api_key = '.json?apiKey=' + YOUR_API_KEY;

// function gets the information from the covid act now api and displays the information for the state on the web page
function getVaccineInfo(state){
  // make the api request url
  url = act_now_request_url + state + api_key
  // get http request variable
  var xhttp = new XMLHttpRequest();
  xhttp.open('GET', url, true);
  xhttp.responseType = 'json';
  xhttp.onload = function() {
    // get the status of the request
    var status = xhttp.status;
    var response = xhttp.response;
    // check the status
    if (status === 200) {
      // if the request works then display the information
      document.getElementById("completed").innerHTML = "Vaccinations Completed: " + response.actuals.vaccinationsCompleted;
      document.getElementById("initiated").innerHTML = "Vaccinations Initiated: " + response.actuals.vaccinationsInitiated;
      vaccination_rate = response.actuals.vaccinationsCompleted/response.population*100;
      vaccination_rate = vaccination_rate.toFixed(2);
      document.getElementById("percent").innerHTML = "Population Vaccination percentage: " + vaccination_rate + "%";

      document.getElementById("new_cases").innerHTML = "New Cases: " + response.actuals.newCases;
      document.getElementById("new_deaths").innerHTML = "New Deaths: " + response.actuals.newDeaths;
    } else {
      // if the request fails then alert the user
      alert('error with api request url');
    }

  };
  xhttp.send();
}

function getUSVaccineInfo(){
  url = 'https://api.covidactnow.org/v2/country/US.json?apiKey=' + YOUR_API_KEY;
  // get http request variable
  var xhttp = new XMLHttpRequest();
  xhttp.open('GET', url, true);
  xhttp.responseType = 'json';
  xhttp.onload = function() {
    // get the status of the request
    var status = xhttp.status;
    var response = xhttp.response;
    // check the status
    if (status === 200) {
      // if the request works then display the information
      document.getElementById("us-completed").innerHTML = "Vaccinations Completed: " + response.actuals.vaccinationsCompleted;
      //console.log(response.actuals.vaccinationsCompleted)
      document.getElementById("us-initiated").innerHTML = "Vaccinations Initiated: " + response.actuals.vaccinationsInitiated;
      vaccination_rate = response.actuals.vaccinationsCompleted/response.population*100;
      vaccination_rate = vaccination_rate.toFixed(2);
      document.getElementById("us-percent").innerHTML = "Population Vaccination percentage: " + vaccination_rate + "%";

      document.getElementById("us-new_cases").innerHTML = "New Cases: " + response.actuals.newCases;
      document.getElementById("us-new_deaths").innerHTML = "New Deaths: " + response.actuals.newDeaths;
    } else {
      // if the request fails then alert the user
      alert('error with api request url');
    }
  };
  xhttp.send();
}
