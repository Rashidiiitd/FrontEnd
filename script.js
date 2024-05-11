const apiKey = `9f06a38d8502347c14778678b7a8b4c5`;

async function fetchWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("Unable to fetch the weather data");
    }

    const data = await response.json();
    updateWeatherUi(data); // Call the UI update function with the fetched data
  } catch (error) {
    console.error(error);
  }
}

function updateWeatherUi(data) {
  const cityNameElement = document.querySelector(".city");
  const tempElement = document.querySelector(".desc-text");
  const windSpeedElement = document.querySelector(".wind-speed");
  const humidityElement = document.querySelector(".water-speed");
  const visibilityElement = document.querySelector(".third1");
  const weatherDescElement = document.querySelector(".weather-condition");

  cityNameElement.textContent = data.name;
  tempElement.textContent = `${Math.round(data.main.temp)}°C`;
  windSpeedElement.textContent = `${data.wind.speed} Km/hr`;
  humidityElement.textContent = `${data.main.humidity}%`;
  visibilityElement.textContent = `${data.visibility / 1000} Km`;
  weatherDescElement.textContent = data.weather[0].description;

  const currentDate = new Date();
  const dateElement = document.querySelector(".date");
  dateElement.textContent = currentDate.toDateString();

  const weatherIcon = getWeatherIcon(data.weather[0].main);
  weatherIconElement.innnerHTML = `<i class = "material-icons">${weatherIcon}</i>`;

}

const formElement = document.querySelector(".search-form");

formElement.addEventListener('submit', function (e) {
  e.preventDefault();

  const inputElement = document.querySelector(".city-input");
  const city = inputElement.value.trim();

  if (city !== "") {
    fetchWeatherData(city);
    inputElement.value = "";
  }
});
function getWeatherIcon(weatherCondition) {
    switch (weatherCondition) {
      case "Clear":
        return "wb_sunny";
      case "Clouds":
        return "cloud";
      case "Rain":
        return "umbrella";
      case "Thunderstorm":
        return "flash_on";
      case "Snow":
        return "ac_unit";
      default:
        return "wb_sunny"; // Default to sunny icon
    }
  }
  