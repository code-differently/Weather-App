// gets user coordinates from navigator.geolocation
    // uses coordinates to get weather for that location
// if user does not share location, asks user for zipcode
    // uses zipcode data to get coordinates
    // uses coordinates to get weather for that location

const div = document.getElementById('weather-data');
const title = document.getElementById('title');
let longitude = 0.0;
let latitude = 0.0;
function getZip() {
    const zipcode = prompt("What's your zipcode? ");
    const zipData = new XMLHttpRequest();
    zipData.onreadystatechange = () => {
        if (zipData.readyState === 4 && zipData.status === 200) {
            const locationData = JSON.parse(zipData.responseText);
            const city = locationData.places[0][ 'place name' ];
            const state = locationData.places[0][ 'state abbreviation' ];
            div.innerHTML = `<h3 id="location">${city}, ${state}</h3>`;
            title.textContent = `Weather for ${city}`;
            longitude = parseFloat(locationData.places[0].longitude);
            latitude = parseFloat(locationData.places[0].latitude);
            getWeather(latitude, longitude);
        }
    }
    zipData.open('GET', `https://api.zippopotam.us/us/${zipcode}`);
    zipData.send();
}
function success(pos){
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=6adef887fbe447abb28e7bd2833e97b3`)
        .then(response => response.json())
        .then(data => {
            title.textContent = `Weather for ${data.results[0].components.city}`; 
            div.innerHTML = `<h3 id="location">${data.results[0].components.city}, ${data.results[0].components.state_code}</h3>`;
        });
    getWeather(latitude, longitude);
}
function getWeather(latitude, longitude) {
    weatherDataLong.open('GET', `http://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=civil&output=json`);
    weatherDataLong.send();
    weatherDataSimple.open('GET', `http://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=civillight&output=json`);
    weatherDataSimple.send();
}

navigator.geolocation.getCurrentPosition(success, getZip);

const weatherDataSimple = new XMLHttpRequest();
weatherDataSimple.onreadystatechange = () => {
    if (weatherDataSimple.readyState === 4 && weatherDataSimple.status === 200) {
        const meteoData = JSON.parse(weatherDataSimple.responseText);
        const min = meteoData[ 'dataseries' ][0][ 'temp2m' ][ 'min' ] * 9 / 5 + 32;
        const max = meteoData[ 'dataseries' ][0][ 'temp2m' ][ 'max' ] * 9 / 5 + 32;
        let forecast = ``;
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        for (let i=0; i<meteoData[ 'dataseries' ].length; i++) { //need a way to determine name of the day
            let date = `${meteoData[ 'dataseries' ][i][ 'date' ]}`;
            let day = date.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
            day = new Date(day); //for some reason the date obj is giving the day before
            day = day.getDay();
            if (day < 6) day = days[day+1]; //this is to fix the issue w/ the date obj 
            else day = days[0]; // but if the date obj works as it shoudl, will be wrong

            let icon = meteoData[ 'dataseries' ][i][ 'weather' ];
            icon == 'clear' ? icon = `<img src="https://ssl.gstatic.com/onebox/weather/64/sunny.png">`
            : icon == 'lightsnow' ? icon = `<img src="https://ssl.gstatic.com/onebox/weather/48/snow_light.png">`
            : icon == 'snow' ? icon = `<img src="https://ssl.gstatic.com/onebox/weather/48/snow.png">`
            : icon == 'rain' ? icon = `<img src="https://ssl.gstatic.com/onebox/weather/48/rain.png">`
            : icon == 'lightrain' ? icon = `<img src="https://ssl.gstatic.com/onebox/weather/48/rain_light.png">`
            : icon == 'thunderstorm' ? icon = `<img src="https://ssl.gstatic.com/onebox/weather/48/thunderstorms.png">`
            : icon == 'foggy' ? icon = `<img src="https://ssl.gstatic.com/onebox/weather/48/fog.png">`
            : icon == 'windy' ? icon = `<img src="https://ssl.gstatic.com/onebox/weather/48/windy.png">`
            : icon = `<img src="https://ssl.gstatic.com/onebox/weather/48/cloudy.png">`; //else cloudy
            console.log(`http://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=civillight&output=json`);
            forecast += `<div id="day${i+1}" class="day">
            <div class="day-name">${day}</div>
            <div class="icon">${icon}</div>
            <div class="minmax">
            <h4 class="max">${parseFloat(max.toFixed(2))}°</h4> <h4 class="min">${parseFloat(min.toFixed(2))}°</h4>
            </div></div>`;
        }
            div.innerHTML += `<div id="week">${forecast}</div>`;
    }
}

const weatherDataLong = new XMLHttpRequest();
weatherDataLong.onreadystatechange = () => {
    if (weatherDataLong.readyState === 4 && weatherDataLong.status === 200) {
        const meteoData = JSON.parse(weatherDataLong.responseText);
        const current = meteoData[ 'dataseries' ][0][ 'temp2m' ] * 9 / 5 + 32; //current temp -- temp2m is not the surface temp, cannot find surface temp in data
        div.innerHTML += `<div class="degree-div"><h1 class="degree">${current}</h1><h4 class="degree-type">°F</h4></div>`;
    }
}

