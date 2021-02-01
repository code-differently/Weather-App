

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
          
          console.log(results);

          const city1 = data.results[0].components.city;
          const stateData = data.results[0].components.state_code;

          cityState.textContent = `${city1}, ${stateData}`;

          currentTemp(city1, stateData);
        }
        catch(error) {
          console.log(error);
        }
}




// Fetch weather at openweathermap api
    const currentTemp = async (city, state) => {
      try {
        const temp = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=0312d87f192d54ce3485295a535d403f`)
        const data = await temp.json();

        let currTemp = convertTemp(data.main.temp);

        temperature.innerHTML = `${currTemp}&#x2109`;

      }
      catch(error) {
        console.log(error);
      }
    }

    navigator.geolocation.getCurrentPosition(successfulLookup, console.log);