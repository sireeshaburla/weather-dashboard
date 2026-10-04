// Live Weather Dashboard
// Uses Open-Meteo public APIs:
// 1. Geocoding API -> converts city name to latitude/longitude
// 2. Forecast API -> gets current weather metrics

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const statusEl = document.getElementById("status");
const weatherCard = document.getElementById("weatherCard");
const welcome = document.getElementById("welcome");

const cityName = document.getElementById("cityName");
const weatherDescription = document.getElementById("weatherDescription");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const feelsLike = document.getElementById("feelsLike");
const coordinates = document.getElementById("coordinates");
const jsonOutput = document.getElementById("jsonOutput");

const WEATHER_CODES = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail"
};

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.classList.toggle("error", isError);
}

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

async function searchWeather() {
  const city = cityInput.value.trim();

  if (!city) {
    setStatus("Please enter a city name.", true);
    cityInput.focus();
    return;
  }

  searchBtn.disabled = true;
  setStatus("Fetching live weather data...");
  weatherCard.classList.add("hidden");

  try {
    // Step 1: Search the city using the geocoding REST API.
    const geoUrl =
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

    const geoData = await fetchJson(geoUrl);

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error(`City "${city}" was not found.`);
    }

    const place = geoData.results[0];

    // Step 2: Use the returned coordinates to fetch current weather.
    const weatherUrl =
      `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}` +
      `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m` +
      `&timezone=auto`;

    const weatherData = await fetchJson(weatherUrl);
    const current = weatherData.current;

    // Step 3: Dynamically update the DOM with parsed JSON values.
    cityName.textContent = `${place.name}, ${place.country}`;
    weatherDescription.textContent =
      WEATHER_CODES[current.weather_code] || "Weather information available";

    temperature.textContent = Math.round(current.temperature_2m);
    humidity.textContent = `${current.relative_humidity_2m}%`;
    windSpeed.textContent = `${current.wind_speed_10m} km/h`;
    feelsLike.textContent = `${Math.round(current.apparent_temperature)}°C`;
    coordinates.textContent =
      `${Number(place.latitude).toFixed(2)}, ${Number(place.longitude).toFixed(2)}`;

    jsonOutput.textContent = JSON.stringify(
      {
        location: place,
        currentWeather: current
      },
      null,
      2
    );

    weatherCard.classList.remove("hidden");
    welcome.classList.add("hidden");
    setStatus(`Updated successfully for ${place.name}.`);
  } catch (error) {
    console.error(error);
    setStatus(
      error.message || "Unable to fetch weather data. Check your internet connection.",
      true
    );
    welcome.classList.remove("hidden");
  } finally {
    searchBtn.disabled = false;
  }
}

searchBtn.addEventListener("click", searchWeather);

cityInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    searchWeather();
  }
});
