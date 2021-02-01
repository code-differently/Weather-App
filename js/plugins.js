/// <reference path="../typings/globals/jquery/index.d.ts" />

let weatherTemp;
let weekdays = { 0 : "Sunday", 1 : "Monday", 2 : "Tuesday", 3 : "Wednesday", 4 : "Thursday", 5 : "Friday", 6 : "Saturday" };


$(document).ready(function() {
    $forecast = $('#forecast');
    $($forecast).removeClass();

    const watchId = navigator.geolocation.watchPosition(successCallback, errorCallback);
});

const successCallback = (position) => {
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;
    
    GetWeather(longitude, latitude);
    DisplayLocation(longitude, latitude);
    NextSevenDays();
};

const errorCallback = (error) => {
    console.log(error);
};


function GetWeather(longitude, latitude) {
    let product = "civillight";
    let output = "json";

    let client = new XMLHttpRequest();

    client.open("GET", `http://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=${product}&output=${output}`, false);
    
    client.overrideMimeType("application/document");

    if (client.onreadystatechange = function () {

        if (client.readyState == 4) {
            let response = JSON.parse(client.responseText);
            weatherTemp = response.dataseries;
            console.log(weatherTemp);
            $('#temperature').text(ConvertToFaranHeight(response.dataseries[0].temp2m.max));
            $('#imgForTemp').attr("src", `imgs/${weatherTemp[0].weather}.jpeg`);
        }

    });

    client.send();
}

function ConvertToFaranHeight(celcius) {
    return (celcius * 9 / 5) + 32;
}

function DisplayLocation(longitude, latitude){

    const request = new XMLHttpRequest();

    const method = 'GET';
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
    const async = false;

    request.open(method, url, async);
    request.onreadystatechange = function(){
      if(request.readyState == 4 && request.status == 200){
        const data = JSON.parse(request.responseText);
        const localLocation = data.city.length > 0 ? data.city : data.locality;
        const country = data.countryCode;
        $('#location').text(`${localLocation}, ${country}`);
      }
    };
    request.send();

  };


function NextSevenDays() {
    const $forecast = $('#forecast');
    $forecast.html("");
    const todaysDate = new Date().getDay();


    let i = todaysDate;
    let k = 0;
    for(; i < 7; i++){
        SetCard(i, weatherTemp[k].temp2m.min, weatherTemp[k].temp2m.max, weatherTemp[i].weather);
        k++;
    }
    for(let j = 0; j < todaysDate; j++){
        SetCard(i, weatherTemp[k].temp2m.min, weatherTemp[k].temp2m.max, weatherTemp[i].weather);
        k++;
    }

    
}



function SetCard(day, min, max, weatherPic) {
    $forecast.append(
        `
        <div class="card" style="width: calc(95% / 7);">
            <h6 class="card-title" style="padding-top: 5px">${weekdays[day].substring(0, 3)}</h6>
            
            <div class="card-body">
                <img src="imgs/${weatherPic}.jpeg" alt="${weatherPic}">
                <span class="card-text" style="font-weight: bold;">${ConvertToFaranHeight(max)}\u00B0</span>
                <span class="card-text">${ConvertToFaranHeight(min)}\u00B0</span>
            </div>
        </div>
        `
    );

    $forecast.addClass("d-inline-flex justify-content-between text-center");
}