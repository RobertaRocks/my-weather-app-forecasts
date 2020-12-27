// Handle Submit Button to get Searched City
function handleSubmit (event) {
event.preventDefault ();
let city = document.querySelector("#city-input");
console.log(city.value);
search(city.value);
}

// Call API with Searched City input
function search (city) {
let apiKey = "b1d85d3727e610039e9f3b93d686021e";
let apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);

apiUrl= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);}

// Display temperature
function displayTemperature (response){
console.log(response.data);
console.log(response.data.main.temp);
let temperature = document.querySelector ("#temperature");
temperature.innerHTML = Math.round(response.data.main.temp);
let city = document.querySelector ("#city");
city.innerHTML = response.data.name;
let country = document.querySelector("#country");
country.innerHTML = response.data.sys.country;
celsius = response.data.main.temp
let description = document.querySelector ("#description");
description.innerHTML = response.data.weather[0].main;
let icon = document.getElementById ("icon");
icon.src = `img/${description.innerHTML}.gif`;
let humidity = document.querySelector ("#humidity");
humidity.innerHTML = Math.round(response.data.main.humidity);
let wind = document.querySelector ("#wind");
wind.innerHTML = Math.round(response.data.wind.speed);
let date = document.querySelector ("#date");
date.innerHTML = formatDate(response.data.dt * 1000);
}

// Format date
function formatDate (timestamp) {
        let date = new Date (timestamp);
        let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        let day = days[date.getDay()];
        let fulldate= date.getDate();
        let months = [ "January", "February", "March", "April","May","June", "July", "August", "September","October","November", "December"];
        let month = months[date.getMonth()];
        return `Updated: ${day}, ${fulldate} ${month}, ${formatHours(timestamp)}`;
}

// forma hours for foecasts
function formatHours (timestamp){
        let date = new Date (timestamp);
        let hour = date.getHours();
        if (hour < 10) {hour =  `0${hour}`;}
        if (hour<=5 && hour>=21) { document.getElementById("weatherapp").style.backgroundImage = "URL(img/Night.png)"};
        let mins = date.getMinutes();
        if (mins < 10) {mins =  `0${mins}`;}
        return `${hour}:${mins}`;
}
// Get current position
function getCurrentPosition (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCoords);
}

function getCoords (position) {
    console.log(position);
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "b1d85d3727e610039e9f3b93d686021e";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
    console.log (apiUrl);
    axios.get(apiUrl).then(displayCity);
}

function displayCity (response) {
    let city = document.querySelector ("#city-input");
    city.innerHTML = response.data.name;
    console.log(response.data.name);
    search (response.data.name);
}

// convert Celsuis to Fahrenheit
function getFar (event) {
event.preventDefault();
let temperature = document.querySelector ("#temperature");
let far = (celsius*9)/5 + 32;
temperature.innerHTML = Math.round(far);
// change CSS class
celsiusLink.classList.remove("active");
farhenheit.classList.add("active");
}
// convert Fahrenheit to Celsuis
function getCelsius (event) {
event.preventDefault();
let temperature = document.querySelector ("#temperature");
temperature.innerHTML = Math.round(celsius);
// change CSS class
celsiusLink.classList.add("active");
farhenheit.classList.remove("active");
}

// forecast
function displayForecast (response) {
console.log(response.data);
console.log (response.data.list[0]);
let forecastElement = document.querySelector ("#forecast");
forecastElement.innerHTML = null;
let forecast = null;
for (let index = 0; index < 6; index++) {
forecast = response.data.list[index];
forecastElement.innerHTML += `
  <div class="col-2 forecast-row">
    <ul>
        <li><span class="hour" id="hour-for"> ${formatHours(forecast.dt * 1000)}</span></li>
        <li> <img class="weather-icon-for" src="img/${forecast.weather[0].main}.gif" id="icon-for"></li>
        <li class="temp-for"><strong class="max-temp" id="temp-max-for"> ${Math.round(forecast.main.temp_max)}° </strong></li>
    </ul>
    </div>`;
}}

let celsius = null;
// Add event listner to the form (submit)
let form = document.querySelector("#search-form")
form.addEventListener ("submit", handleSubmit);
// Add event listener to current button
let current= document.querySelector("#current-button");
current.addEventListener ("click", getCurrentPosition);
// Add event listener on Farhenheit link
let farhenheit = document.querySelector ("#far")
farhenheit.addEventListener ("click", getFar)
// Add event listener on Celsius link
let celsiusLink = document.querySelector ("#celsius")
celsiusLink.addEventListener ("click", getCelsius)
search ("New York");