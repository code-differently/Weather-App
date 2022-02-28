const locationDisplay = document.querySelector('#location');
const weatherDisplay = document.querySelector('#weather');
const forecastDisplay= document.querySelector('#sevenDay');
// const userZip = prompt("Enter your Zipcode");
const userZip = 19720;
// const userZip = document.querySelector('input').value;
const userLink = `http://api.zippopotam.us/us/${userZip}`;

console.log(userZip)


function convertTemp(weatherLink) {
    const celsius = weatherLink -273;
    const fahrenheit = Math.floor(celsius * (9/5) + 32);
    return fahrenheit;
}

const client = new XMLHttpRequest();
    client.open("GET", userLink, true);
    client.onreadystatechange = function() {
	if(client.readyState == 4 && client.status === 200) {

        const zipData = JSON.parse(client.responseText);
        locationDisplay.innerHTML = `
            ${zipData.places[0]['place name']}, ${zipData.places[0]['state abbreviation']}
        `;
      
        userLon = `${zipData.places[0].longitude}`;
        userLat = `${zipData.places[0].latitude}`;

        const weatherLink = `https://api.openweathermap.org/data/2.5/onecall?lat=${userLat}&lon=${userLon}&exclude=minutely,hourly&appid=${apikey}`;
        
        const sevenTimer = new XMLHttpRequest();
        sevenTimer.open("GET", weatherLink, true);
        sevenTimer.onreadystatechange = () => {
            if(sevenTimer.readyState == 4 && sevenTimer.status === 200) {
                const weatherData = JSON.parse(sevenTimer.responseText);
                const currentTemp = convertTemp(weatherData.current.temp);
                weatherDisplay.innerHTML = `${currentTemp}\xB0F`;
            }
        }
        sevenTimer.send();

        const sevenDay = new XMLHttpRequest();
        sevenDay.open("GET", weatherLink, true);
        sevenDay.onreadystatechange = () => {
            if(sevenDay.readyState == 4 && sevenDay.status === 200) {
                const weatherData = JSON.parse(sevenDay.responseText);
                for(let i = 0; i <= 7; i++){
                    const sevenDayMin = convertTemp(weatherData.daily[i].temp.min);
                    const sevenDayMax = convertTemp(weatherData.daily[i].temp.max);
                    const div = document.createElement('div');
                    const divInnerHtml = 
                    `<div class="card">  
                    <div class="container">
                    <div class="row">
                      <h4 class="pName">Low ${sevenDayMin}\xB0F</h4>    
                      <h4 class="pNum">High ${sevenDayMax}\xB0F</h4>
                    </div>`
                    div.innerHTML = divInnerHtml;
                    forecastDisplay.appendChild(div);
                    }
                }
            }
        sevenDay.send();
	}
};  
client.send();
