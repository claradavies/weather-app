function formatDate(now) {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let day = days[now.getDay()];

    let date = now.getDate();

    let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    let month = months[now.getMonth()];

    let hour = now.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }

    let minute = now.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`;
    }

    return `${day} - ${date}, ${month}, ${hour}:${minute}`;

}

function showTemperature(response) {
    document.querySelector("#city").innerHTML = response.data.name;

    let temp = Math.round(response.data.main.temp);
    let currentTemp = document.querySelector("#currentTemp");
    currentTemp.innerHTML = temp;

    let newDescription = response.data.weather[0].main;
    let description = document.querySelector(".weather-detail");
    description.innerHTML = newDescription;

    let newFeelslike = Math.round(response.data.main.feels_like);
    let feelsLike = document.querySelector(".feels-like");
    feelsLike.innerHTML = `Feels like ${newFeelslike}˚`;

    let newTempmin = Math.round(response.data.main.temp_min);
    let tempMin = document.querySelector("#tempMin");
    tempMin.innerHTML = `↓ ${newTempmin}˚`;

    let newTempmax = Math.round(response.data.main.temp_max);
    let tempMax = document.querySelector("#tempMax");
    tempMax.innerHTML = `↑ ${newTempmax}˚`;

    let newWindspeed = Math.round(response.data.wind.speed);
    let windSpeed = document.querySelector("#windSpeed");
    windSpeed.innerHTML = `${newWindspeed}km/h`;

    let newHumidity = response.data.main.humidity;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `${newHumidity}%`
}

function searchCity(city) {
    let apiKey = "6ec0f1834392517657ca106147c93622";
    let unit = "metric";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
    let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${unit}`;

    axios.get(apiUrl).then(showTemperature);
};

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#cityInput").value;
  searchCity(city);
}

function searchLocation(event) {
    navigator.geolocation.getCurrentPosition(handlePosition);
}

function handlePosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "6ec0f1834392517657ca106147c93622";
    let unit = "metric";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
    let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;

    axios.get(apiUrl).then(showTemperature);
}

function convertCelsius(event){
    event.preventDefault();
    let tempCelsius = 19;
    let currentTemp = document.querySelector("#currentTemp");
    currentTemp.innerHTML = tempCelsius;
}

function convertFahrenheit(event) {
    event.preventDefault();
    let tempFahrenheit = 66;
    let currentTemp = document.querySelector("#currentTemp");
    currentTemp.innerHTML = tempFahrenheit;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#citySearch");
searchForm.addEventListener("submit", handleSubmit);

let locationButton = document.querySelector("button");
locationButton.addEventListener("click", searchLocation);

let tempCelsius = document.querySelector(".tempCelsius");
tempCelsius.addEventListener("click", convertCelsius);

let tempFahrenheit = document.querySelector(".tempFahrenheit");
tempFahrenheit.addEventListener("click", convertFahrenheit);

searchCity("Lisbon");