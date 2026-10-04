# Live Weather Dashboard

A beginner-friendly asynchronous JavaScript project that fetches live weather data from public REST APIs.

## Features

- Search weather by city name
- Uses modern `fetch()` API
- Uses `async/await`
- Uses two REST APIs:
  - Open-Meteo Geocoding API
  - Open-Meteo Forecast API
- Comprehensive error handling
- Parses nested JSON responses
- Dynamically renders weather metrics
- Displays temperature, humidity, wind speed and feels-like temperature
- Shows the parsed JSON response
- Responsive design
- No API key required

## How It Works

### 1. User enters a city

Example:

`Hyderabad`

### 2. Geocoding API

The application sends the city name to the Open-Meteo Geocoding API.

The API returns information such as:

- City name
- Country
- Latitude
- Longitude

### 3. Forecast API

The latitude and longitude are then sent to the Open-Meteo Forecast API.

The application requests:

- Temperature
- Relative humidity
- Apparent/feels-like temperature
- Weather code
- Wind speed

### 4. DOM Rendering

JavaScript reads the JSON response and dynamically updates the HTML dashboard.

## How to Run

1. Extract the ZIP.
2. Open `index.html` in a browser.
3. Enter a city such as `Hyderabad`, `London`, or `New York`.
4. Click **Search Weather**.

For best results, use VS Code with the Live Server extension.

## Important Concepts Demonstrated

- REST API
- HTTP GET requests
- `fetch()`
- Promises
- `async/await`
- `try/catch/finally`
- URL encoding with `encodeURIComponent()`
- JSON parsing
- Nested JSON objects
- DOM manipulation
- Dynamic rendering
- Error handling
- Event handling

## API

This project uses Open-Meteo, which provides weather and geocoding APIs without requiring an API key for this type of use.

## Expected Outcome

A dynamic weather dashboard that retrieves and displays live weather metrics based on the user's city input.
