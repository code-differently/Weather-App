// https://api.zippopotam.us/us/90210
// {"post code": "90210", "country": "United States", 
//"country abbreviation": "US", 
//"places": [{"place name": "Beverly Hills", "longitude": "-118.4065", "state": "California", "state abbreviation": "CA", "latitude": "34.0901"}]}

const zipcode = prompt("What's your zipcode? ");
const zipData = new XMLHttpRequest();
const div = document.getElementById('weather-data');
const title = document.getElementById('title');
let longitude = 0.0;
let latitude = 0.0;
zipData.onreadystatechange = () => {
    if (zipData.readyState === 4 && zipData.status === 200) {
        const locationData = JSON.parse(zipData.responseText);
        const city = locationData.places[0][ 'place name' ];
        const state = locationData.places[0][ 'state abbreviation' ];
        div.innerHTML = `<h3 id="location">${city}, ${state}</h3>`;
        title.textContent = `Weather for ${city}`;
        longitude = parseFloat(locationData.places[0].longitude);
        latitude = parseFloat(locationData.places[0].latitude);
        weatherDataLong.open('GET', `http://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=civil&output=json`);
        weatherDataLong.send();
        weatherDataSimple.open('GET', `http://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=civillight&output=json`);
        weatherDataSimple.send();
    }
}

zipData.open('GET', `https://api.zippopotam.us/us/${zipcode}`);
zipData.send();

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
            // if (icon == 'clear') icon = `<img src="https://ssl.gstatic.com/onebox/weather/64/sunny.png">`;
            icon == 'clear' ? icon = `<img src="https://ssl.gstatic.com/onebox/weather/64/sunny.png">`
            : icon == 'lightsnow' ? icon = `<img src="https://ssl.gstatic.com/onebox/weather/48/snow_light.png">`
            : icon == 'snow' ? icon = `<img src="https://ssl.gstatic.com/onebox/weather/48/snow.png">`
            : icon == 'rain' ? icon = `<img src="https://ssl.gstatic.com/onebox/weather/48/rain.png">`
            : icon == 'lightrain' ? icon = `<img src="https://ssl.gstatic.com/onebox/weather/48/rain_light.png">`
            : icon == 'thunderstorm' ? icon = `<img src="https://ssl.gstatic.com/onebox/weather/48/thunderstorms.png">`
            : icon == 'windy' ? icon = `<img src="https://ssl.gstatic.com/onebox/weather/48/fog.png">`
            : icon = `<img src="https://ssl.gstatic.com/onebox/weather/48/cloudy.png">`; //else cloudy
            console.log(`http://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=civillight&output=json`);
            // : icon == 
            //condition1 ? value1 : condition2 ? value2 : condition3 ? value3 : value4 ==
            forecast += `<div id="day${i+1}" class="day">
            <div class="day-name">${day}</div>
            <div class="icon">${icon}</div>
            <div class="minmax">
            <h4 class="max">${max}°</h4>   <h4 class="min">${min}°</h4>
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

