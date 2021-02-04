/*var zipcode = prompt("Please enter you zipcode")
var client = new XMLHttpRequest();
//client.open("GET", "http://api.zippopotam.us/us/90210", true);
client.onreadystatechange = function() {
	if(client.readyState == 4) {
		alert(client.responseText);
	}
};
client.open('GET', 'http://api.zippopotam.us/US/' + zipcode, true);
client.send();
*/

/*const dom = document.querySelector(".placeName");
const userZip = prompt("What's your Zip Code?");
const userLink = 'http://api.zippopotam.us/us/' + parseInt(userZip);  


var client = new XMLHttpRequest();

client.open("GET", userLink,);
client.onreadystatechange = function() {

	if(client.readyState == 4) {
		console.log ('working');
		 

	};
	if(client.readyState == 4 && client.status === 200) {
		
        let zipData = JSON.parse(client.responseText);
        
        const {places: 
            [{"place name": placeName, state: state, latitude: lat, longitude: lon}]
             } = zipData;
        dom.textContent = placeName + ", " + state;
             
        let request = client.open("GET", `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=dcf230f9ec9de3db7414b60015a4b1bf`)
             console.log(request)

	}
}



client.send(); */

const locationDisplay = document.getElementById('location');
const weatherDisplay = document.getElementById('weather');
const userZip = prompt("What's your ZIP Code?");
const userLink = 'http://api.zippopotam.us/us/' + parseInt(userZip);
let userLon;
let userLat;
// Convert cTof
function convertTemp(weatherLink) {
    const celsius = weatherLink -273;
    let fahrenheit = Math.floor(celsius * (9/5) + 32);
    return fahrenheit;
}
let client = new XMLHttpRequest();
client.open("GET", userLink, true);
client.onreadystatechange = function() {
	if(client.readyState == 4 && client.status === 200) {
        let zipData = JSON.parse(client.responseText);
        locationDisplay.innerHTML += `
            <p>${zipData.places[0]['place name']}, ${zipData.places[0]['state abbreviation']}</p>
        `;
        userLon = `${zipData.places[0].longitude}`;
        userLat = `${zipData.places[0].latitude}`;
    const weatherLink = `https://api.openweathermap.org/data/2.5/onecall?lat=${userLat}&lon=${userLon}&exclude=minutely,hourly&appid=dcf230f9ec9de3db7414b60015a4b1bf`;
        let sevenTimer = new XMLHttpRequest();
        sevenTimer.open("GET", weatherLink, true);
        sevenTimer.onreadystatechange = function() {
            if(sevenTimer.readyState == 4 && sevenTimer.status === 200) {
                let weatherData = JSON.parse(sevenTimer.responseText);
                let currentTemp = convertTemp(weatherData.current.temp);
                weatherDisplay.innerHTML += `${currentTemp}`+ ' \xB0F';
            }
        }
        sevenTimer.send();
	}
};  
client.send();