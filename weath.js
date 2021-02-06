// crrating button on html and linking to a function getZipCode
//using AJAX 4 steps for lab
// conerted temperature to F

let lon = 0.0;
let lat = 0.0;
let temp = document.getElementById('weather');
let loc = document.getElementById('zipCode');

function getZipCode() {
    const zipCode = prompt("Enter zip code to get the weather updates of your location?");
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let locationResponse = JSON.parse(xhr.responseText);
            lon = locationResponse.places[0].longitude;
            lat = locationResponse.places[0].latitude;
            const city = locationResponse.places[0]["place name"];
            const state = locationResponse.places[0]["state abbreviation"];
            //console.log(locationResponse);
            //console.log(lon);
            //console.log(lat);
            getWeather(lon, lat);
           
            loc.innerHTML = city + ", " + state;
        
        }     
    }
    xhr.open('GET', `http://api.zippopotam.us/US/${zipCode}`);
    xhr.send();
}

let xhr2 = new XMLHttpRequest();                
    xhr2.onreadystatechange = function() { 
        if (xhr2.readyState === 4 && xhr2.status === 200) {
            let weatherResponse = JSON.parse(xhr2.responseText);
            min = weatherResponse['dataseries'][0]['temp2m'].min * 9 / 5 + 32;
            max = weatherResponse['dataseries'][0]['temp2m'].max * 9 / 5 + 32;
          
            console.log(weatherResponse);
       
            temp.innerHTML = Math.floor(max) + `&degF`.sup();   
        } 
    }

function getWeather(lon, lat) {
        xhr2.open('GET', `http://www.7timer.info/bin/api.pl?product=civillight&lon=${lon}&lat=${lat}&output=json`);
        xhr2.send();
    }
