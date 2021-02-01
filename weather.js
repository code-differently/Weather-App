

/* DOM Elements */
const cityState = document.querySelector(".cityState");
const temperature = document.querySelector(".temperature");


/* Helper Functions */

function convertTemp(temp) {
  const celsius = temp -273;
  let fahrenheit = Math.floor(celsius * (9/5) + 32);
  return fahrenheit;
}

/*  Fetch Functions */

// Fetch location using Geolocator as shown in https://www.youtube.com/watch?v=Xd43hZKaUS0&feature=youtu.be
    const successfulLookup = async (position) => {
        try {
          const {latitude, longitude} = position.coords; 
          const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=68824d84dff94b6a8921c156b462a3d1`)
          const data = await response.json();

          const cityData = data.results[0].components.city;
          const stateData = data.results[0].components.state_code;

          cityState.textContent = `${cityData}, ${stateData}`;

          currentTemp(latitude, longitude);
        }
        catch(error) {
          console.log(error);
        }
}




// Fetch weather at openweathermap api
    const currentTemp = async (latitude, longitude) => {
      try {
        const temp = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&exclude={part}&appid=0312d87f192d54ce3485295a535d403f=0312d87f192d54ce3485295a535d403f`)
        const data = await temp.json();

        let currTemp = convertTemp(data.current.temp);

        temperature.innerHTML = `${currTemp}&#x2109`;

      }
      catch(error) {
        console.log(error);
      }
    }

    navigator.geolocation.getCurrentPosition(successfulLookup, console.log);