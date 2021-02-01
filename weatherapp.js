

// add click handler for button
document.getElementById("forecast").addEventListener("click", getData);

function getData() {
    const weatherInfo = document.getElementById("weatherInfo");
    // need the zipcode entered
    let zipcode =
    document.getElementById("zipcode").value;
    // set up api
    const endpoint =
    "http://api.zippopotam.us/US/"+zipcode;
    const query = "?zip=" + zipcode + "&units=imperial&appid=";
    const url = endpoint + query;
    const xhr = new XMLHttpRequest();
    // set up response
    xhr.addEventListener("load", responseReceivedHandler);
    // required for json
    xhr.responseType = "json";
    // open the connection
    xhr.open("GET", endpoint);
    xhr.send();
  
};

// const endpoint =
// "http://www.7timer.info/bin/api.pl?product=civillight&lon=${lon}&lat=${lat}&output=json";
// const query = "?zip=" + zipcode + "&units=imperial&appid=";
// const url = endpoint + query;
// const xhr2 = new XMLHttpRequest();
// // set up response
// xhr2.addEventListener("load", responseReceivedHandler);
// // required for json
// xhr2.responseType = "json";
// // open the connection
// xhr2.open("GET", endpoint);
// xhr2.send();


function responseReceivedHandler() {
    if (this.status === 200) {
        console.log(this.response);
        const data = this.response;
        console.log("city is " + data.places[0]["place name"])
        // put data on the page
        let output = "<p>City: " + data.places[0]["place name"] + "</p>";
        output = "<p>Location: " + data.places[0]["longitude"] + "</p>";
        // output += "<p>Current temp: " + data.main.temp + "&deg;F</p>";
        // output += "<p>Description: " + data.weather[0].description + "</p>";
        // output += "<p>Humidity: " + data.main.humidity + "%</p>";
        // display this in the div
        
        // weatherInfo.innerHTML = output;
        }
    else {
        weatherInfo.innerHTML = "Weather Data Unavailable";
    }
}
