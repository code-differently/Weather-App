const url = 'http://api.zippopotam.us/us/90210';

let longitude = 0.0;
let latitude = 0.0;

var zippopotamApi = new XMLHttpRequest();
zippopotamApi.onreadystatechange = () => {
    if(zippopotamApi.readyState == 4 ){

        const locationData = JSON.parse(zippopotamApi.responseText);
        const city = locationData.places[0]['place name'];
        const state = locationData.places[0]['state abbreviation'];
        const postCode = locationData['post code'];
        longitude = parseFloat(locationData.places[0].longitude);
        latitude = parseFloat(locationData.places[0].latitude);
            document.getElementById('paragraph1').innerHTML = `${city}, ${state}`;
            document.getElementById('paragraph3').innerHTML = `ZipCode: ${postCode}`;

        
    
        console.dir(locationData);
        console.dir(longitude);
        console.dir(latitude);
       
        seventimerApi.open('GET',`http://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=civillight&output=json` );
        seventimerApi.send();

    }


};
zippopotamApi.open('GET', url);
zippopotamApi.send();

var seventimerApi = new XMLHttpRequest();
seventimerApi.onreadystatechange = () => {
    if(seventimerApi.readyState == 4 ){
        const seventimer = JSON.parse(seventimerApi.responseText);
        const dataseries = seventimer.dataseries[0]['temp2m'];
        const dataseriesMin = dataseries.min;
        const dataseriesMax = dataseries.max;
        const dataseriesWeather = seventimer.dataseries[0]['weather'];
        const FahMin = parseFloat(dataseries.min * 9 / 5 + 32).toFixed(0);
        const FahMax = parseFloat(dataseries.max * 9 / 5 + 32).toFixed(0);
        console.dir(seventimer); 
           console.dir(dataseries); 
           console.dir(FahMin); 
           console.dir(FahMax); 
           console.dir(dataseries.max); 
           console.dir(dataseries.min); 
           console.dir(dataseriesWeather); 
           document.getElementById('paragraph2').innerHTML  = `${dataseriesWeather} ${FahMin}°F`;
           let image = document.getElementById('image');
           image.src = 'http://www.7timer.info/bin/civillight.php?lon=-118.407&lat=34.09&lang=en&ac=0&unit=metric&tzshift=0';
           

    }


};

