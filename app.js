// DOM elements for current weather
const place = document.querySelector('.placeName');
const currentWeatherDiv = document.querySelector('.currentWeather');
// DOM elements for future weather
const weatherPic = document.querySelector('img');
const futureDates = document.querySelectorAll('.date');
const icons = document.querySelectorAll('.icons');
const minWeather = document.querySelectorAll('.min');
const maxWeather = document.querySelectorAll('.max');

console.log(futureDates);

let datesData = [];

const weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(getBrowserLocation, console.log);
}

const getBrowserLocation = async (position) => {
    try{
        const {latitude, longitude} = position.coords;
        const res = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${APILocationKey}`);
        console.log(res.data.results);
        const {data: 
                {results:
                   [{components: 
                        {city: city, "state_code": stateCode}}] }} = res;
        place.innerHTML = `${city}, ${stateCode}`;
        getWeather(longitude, latitude);
    }catch(e){
        console.log(e);
    }
}

const getWeather = async (longitude, latitude) => {
    try {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=imperial&appid=${APIKey}`);

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
    //show day on html (map)
    const dailyDates = res.data.daily.map((i) => ({date: i.dt, min:i.temp.min, max:i.temp.max, icon:i.weather[0].icon})).map(convertDate).forEach(showDay);

}

function convertDate ({date, min, max, icon }){
    //console.log({date,min,max,icon});

   return {day:weekday[new Date(date * 1000).getDay()],
    min, max, icon}
}

function showDay({day, min,max,icon},index){
       // console.log(day)
        let currentDay = futureDates[index];
        let currentIconLogo = icons[index];
        let currentMin = minWeather[index];
        let currentMax = maxWeather[index];
        currentDay.innerText = day;
        currentIconLogo.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        currentMin.innerText = Math.trunc(min);
        currentMax.innerText = Math.trunc(max);
   // futureDates[index].innerText = `${day} ${min} ${max}`;
}
