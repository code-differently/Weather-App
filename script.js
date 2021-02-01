const locationDisplay = document.getElementById('location');
const weatherDisplay = document.getElementById('weather');

const userZip = prompt("What's your ZIP Code?");
const userLink = 'http://api.zippopotam.us/us/' + parseInt(userZip);
let userLon;
let userLat;
const weatherLink = 'http://www.7timer.info/bin/api.pl?output=json&product=civillight&lon=' + userLon + '&lat=' + userLat;

// http://www.7timer.info/bin/astro.php?lon=113.2&lat=23.1&ac=0&unit=metric&output=xml&tzshift=0

var client = new XMLHttpRequest();

client.open("GET", userLink, true);
client.onreadystatechange = function() {
	if(client.readyState == 4 && client.status === 200) {

        let zipData = JSON.parse(client.responseText);
        locationDisplay.innerHTML += `
            <p>${zipData.places[0]['place name']}, ${zipData.places[0]['state abbreviation']}</p>
        `;

        userLon = `${zipData.places[0].longitude}`;
        userLat = `${zipData.places[0].latitude}`;

        let sevenTimer = new XMLHttpRequest();
        sevenTimer.open("GET", weatherLink, true);
        sevenTimer.onreadystatechange = function() {
            if(sevenTimer.readyState == 4 && client.status === 200) {
                let weatherData = JSON.parse(sevenTimer.responseText);
                console.log(weatherData);
                weatherDisplay.innerHTML += `
                    ${weatherData.dataseries[0].temp2m.max}&deg
                `;
            }
        }
        sevenTimer.send();
	}
};

client.send();


