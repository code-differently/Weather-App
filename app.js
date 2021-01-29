// DOM elements for current weather
const place = document.querySelector('.placeName');
const currentWeatherDiv = document.querySelector('.currentWeather');
// DOM elements for future weather
const weatherPic = document.querySelector('img');
const futureDates = document.querySelectorAll('.date');
const icons = document.querySelectorAll('.icons');
const minWeather = document.querySelectorAll('.min');
const maxWeather = document.querySelectorAll('.max');

const weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
//get browser's location
const getBrowsersLocation = async () => {
    navigator.geolocation.getCurrentPosition(passLocation, error);
    
}
function error(){
    placeName.innerText = "please enable location";
}

//
const passLocation = async (position) => {
    try{
        const {latitude, longitude} = position.coords;
        const res = await axios.get(`http://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${APILocationKey}`);
        const {data: 
                {results:
                   [{components: 
                        {city: city, "state_code": stateCode}}] }} = res;
        place.innerHTML = `${city}, ${stateCode}`;
        getAllWeather(longitude, latitude);
    }catch(e){
        console.log(e);
    }
}

const getAllWeather = async (longitude, latitude) => {
    try {
        const res = await axios.get(`http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=imperial&appid=${APIKey}`);
        
        getCurrentWeather(res);
        getDailyWeather(res);
    }
    catch (e) {
        console.log(e);
    }
}

const getCurrentWeather = async (res) => {
    //assign res current weather data to a variable
    const {data: 
            {current :
                {temp: temperature,
                    weather:
                    [{icon: iconlogo}]  
            }}} =  res;
    // show icon value on html
        currentWeatherDiv.innerText = Math.trunc(temperature);
        weatherPic.src = `http://openweathermap.org/img/wn/${iconlogo}@2x.png`;

}

const getDailyWeather = async (res) => { 
    res.data.daily.map((i) => ({date: i.dt, min:i.temp.min, max:i.temp.max, icon:i.weather[0].icon})).map(convertDate).forEach(showDay);
}

function convertDate ({date, min, max, icon }){
   return {day:weekday[new Date(date * 1000).getDay()],
    min, max, icon}
}

function showDay({day, min,max,icon},index){
        futureDates[index].innerText = day;
        icons[index].src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        minWeather[index].innerText = Math.trunc(min);
        maxWeather[index].innerText = Math.trunc(max);
}

getBrowsersLocation();