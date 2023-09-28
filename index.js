function displayTemp(response) {
  let cityElement = document.querySelector("#city-element");
  cityElement.innerHTML = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = temp;
  let description = response.data.weather[0].description;
  let currentDescription = document.querySelector("#currentDescription");
  currentDescription.innerHTML = description;
  let lows = response.data.main.temp_min;
  let currentLows = document.querySelector("#currentLows");
  currentLows.innerHTML = lows + "°C";
  let highs = response.data.main.temp_max;
  let currentHighs = document.querySelector("#currentHighs");
  currentHighs.innerHTML = highs + "°C";
  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#currentHumidity");
  currentHumidity.innerHTML = humidity + "%";
  let windSpeed = response.data.wind.speed;
  let currentWind = document.querySelector("#currentWind");
  currentWind.innerHTML = windSpeed + "mph";
}

function searchCity(event) {
  event.preventDefault();
  let selectedCity = document.querySelector("#city-input");
  let cityElement = document.querySelector("#city-element");
  let city = selectedCity.value;
  cityElement.innerHTML = `${city}`;
  let apiKey = "6bfa54f242cbb59343d4e58db578dc61";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemp);
}

let searchButton = document.querySelector("#form_search");
searchButton.addEventListener("submit", searchCity);

let h3time = document.querySelector("h3");
let currentTime = new Date();
let day = currentTime.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let hours = currentTime.getHours();
let minuts = currentTime.getMinutes();
h3time.innerHTML = `${days[day]} ${hours}:${minuts}`;

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "99b8f9330a1bfba3a85e523fd3c2e528";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayTemp);
}

function handleCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

navigator.geolocation.getCurrentPosition(showPosition);

let currentElement = document.querySelector("#current-button");
currentElement.addEventListener("click", handleCurrentLocation);
