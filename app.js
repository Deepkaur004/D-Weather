// api key : 82005d27a116c2880c8f0fcb866998a0

//Select the elements
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

//App data
const weather = {};

weather.temperature = {
    unit : "celcius"
}

//App constants and variables
const kelvin = 273;

//API key
const apiKey = "82005d27a116c2880c8f0fcb866998a0"

//Check user Browse support geolocations
if(`geolocation` in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showErr)
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browse doesn't support geolocation</p>"
}

//Set the user location
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude,longitude)
}  

//Show error if there has any geolocation error
function showErr(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>${error.message}</p>`
}

//Get the weather from the api provider
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    console.log(api);

    fetch(api).then(function (response){
        let data = response.json();
        return data;
    }).then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - kelvin);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    }).then(function(){
        displayWeather();
    })
}

//Display Weather to UI
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

//Celcius to Farenhite Conversion
function celciusToFarenhite(temperature){
    return (temperature *9/5) + 32;
}

//When The user clicks on the temperature
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;

    if(weather.temperature.unit === "celcius"){
        let Farenhite = celciusToFarenhite(weather.temperature.value);
        Farenhite = Math.floor(Farenhite);
        tempElement.innerHTML = `${Farenhite}°<span>F</span>`;
        weather.temperature.unit = "farenhite";
    }
    else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celcius";
    }
})