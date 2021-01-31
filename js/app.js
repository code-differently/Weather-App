const dom = document.querySelector(".placeName");
const userZip = prompt("Enter Your Zip Code");
const userLink = 'http://api.zippopotam.us/us/' + parseInt(userZip);
const wLoc = 'https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=dcf230f9ec9de3db7414b60015a4b1bf';

let longitude = 0.0;
let latitude = 0.0;

var client = new XMLHttpRequest();

client.open("GET", userLink,);
client.onreadystatechange = function() {
	if(client.readyState == 4) {
    };
    
	if(client.readyState == 4 && client.status === 200) {		
        let zipData = JSON.parse(client.responseText);
        const {places: 
            [{"place name": placeName, state: state, latitude: lat, longitude: lon}]
             } = zipData;
        dom.textContent = placeName + ", " + state;        
        let request = client.open("GET", "wLoc");
            //  console.log(request);
	}
}


// http://www.7timer.info/bin/api.pl?lon=39.5929&lat=-75.6515&product=civil&output=json
// http://www.7timer.info/bin/api.pl?lon=39.5929&lat=-75.6515&product=civillight&output=json
//  -75.6515 39.5929

client.send();