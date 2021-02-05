
const apiKey = "9d60ac7e8eb3d17560a9e4046dc3f540";
// add click handler for button
document.getElementById("forecast").addEventListener("click", getData);

function getData() {
    // console.log("get data");
    // const weatherInfo = document.getElementById("weatherInfo");
    // need the zipcode entered
    let zipcode =
    document.getElementById("zipcode").value;
    // console.log("zipcode is " + zipcode);
    // set up api
    const endpoint =
    "https://api.openweathermap.org/data/2.5/forecast"
    // "https://api.openweathermap.org/data/2.5/weather";
    // "http://api.zippopotam.us/US/"+zipcode;
    const query = "?zip=" + zipcode + "&units=imperial&appid=" + apiKey;
    const url = endpoint + query;
    // console.log(url);
    const xhr = new XMLHttpRequest();
    // set up response
    xhr.addEventListener("load", responseReceivedHandler);
    // required for json
    xhr.responseType = "json";
    // open the connection "endpoint"
    xhr.open("GET", url);
    xhr.send();
  
};

function responseReceivedHandler() {
    const weatherInfo = document.getElementById("output");
    if (this.status === 200) {
        console.log(this.response);
        const data = this.response;
        
        // put data on the page
        let output = "<p>City: " + data.city.name + " </p>";
        // output += "<p>Current temp: " + data.main.temp + "&deg;F</p>";
        output += "<p>Current temp: " + data.list[0].main.temp + "&deg;F</p>";
        output += "<p>Latitude: " + data.city.coord.lat + "</p>";
        output += "<p>Longitude: " + data.city.coord.lon + "</p>";
        // output += "<p>Description: " + data.weather[0].description + "</p>";
        // output += "<p>Humidity: " + data.main.humidity + "%</p>";
        // display this in the div
        
        weatherInfo.innerHTML = output;
        }
    else {
        weatherInfo.innerHTML = "City Unavailable";
    }
}

