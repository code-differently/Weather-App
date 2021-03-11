const locationDisplay = document.getElementById('location');
const weatherDisplay = document.getElementById('weather');
const forecastDisaply= document.getElementById('sevenDay');
const userZip = prompt("Enter your Zipcode");
const userLink = 'http://api.zippopotam.us/us/' + parseInt(userZip);

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
            ${zipData.places[0]['place name']}, ${zipData.places[0]['state abbreviation']}
        `;
      
        userLon = `${zipData.places[0].longitude}`;
        userLat = `${zipData.places[0].latitude}`;

        const weatherLink = `https://api.openweathermap.org/data/2.5/onecall?lat=${userLat}&lon=${userLon}&exclude=minutely,hourly&appid=${apikey}`;
        
        let sevenTimer = new XMLHttpRequest();
        sevenTimer.open("GET", weatherLink, true);
        sevenTimer.onreadystatechange = function() {19720
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