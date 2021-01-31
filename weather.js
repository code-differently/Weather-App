

// DOM Elements
const cityState = document.querySelector(".cityState");
const temperature = document.querySelector(".temperature");

//Ask user zip code
// const userZip = prompt(`What's your Zip Code?`);
// const userLink = '' + parseInt(userZip);  



/*  Fetch Functions */

// Fetch location using Geolocator as shown in https://www.youtube.com/watch?v=Xd43hZKaUS0&feature=youtu.be
    const successfulLookup = async (position) => {
        try {
          const {latitude, longitude} = position.coords; 
          const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=68824d84dff94b6a8921c156b462a3d1`)
          const data = await response.json();
          const city = data.results[0].components.city;
          const state = data.results[0].components.state_code;
          console.log(`${city}, ${state}`);

          cityState.textContent = `$[city], ${state}`;
          currentTemp(city, state);
        }
        catch(error) {
          console.log(error);
        }
}


navigator.geolocation.getCurrentPosition(successfulLookup, console.log);

// Fetch weather at openweathermap api
    const currentTemp = async (city, state) => {
      try {
        const temp = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=0312d87f192d54ce3485295a535d403f`)
        const data = await temp.json();
        let currTemp = Math.trunc(data.main.temp/10);
        //currTemp = 29;
        temperature.innerHTML = `${currTemp}&#x2109`;

      }
      catch(error) {
        console.log(error);
      }
    }

