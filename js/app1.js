const dom = document.querySelector(".placeName");
const curentWeatherDev = document.querySelector('.currentWeather');
const userZip = prompt("Enter Your Zip Code");
const userLink = 'http://api.zippopotam.us/us/' + parseInt(userZip);
const wLoc = 'https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=dcf230f9ec9de3db7414b60015a4b1bf';

var client = new XMLHttpRequest();

let longitude = 0.0;
let latitude = 0.0;

client.open("GET", userLink,);
client.onreadystatechange = function() {
	if(client.readyState == 4 && client.status === 200) {		
        let zipData = JSON.parse(client.responseText);
        // let lonData =
        const {places: 
            [{"place name": city, state: state, latitude: lat, longitude: lon}]
             } = zipData;
        dom.textContent = city + ", " + state;        
        let request = client.open("GET", "wLoc");
             console.log(lon + " " + lat);
             console.log(zipData);

    }
}
client.send();





// https://api.openweathermap.org/data/2.5/onecall?lat=39.5929&lon=-75.6515&exclude=minutely,hourly&appid=dcf230f9ec9de3db7414b60015a4b1bf
//  -75.6515 39.5929

