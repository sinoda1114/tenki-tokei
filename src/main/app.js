import { getCurrentTime, formatTime } from './time.js';
import { getWeatherData, displayWeather } from './weather.js';
import { handleError } from './error-handler.js';
import { cacheData, getCachedData } from './cache.js';

// DOM Elements
const timeDisplay = document.getElementById('time-display');
const weatherDisplay = document.getElementById('weather-display');
const locationInput = document.getElementById('location-input');
const getWeatherButton = document.getElementById('get-weather-button');

// State
let currentLocation = '';

// Initialize
function initializeApp() {
  updateTime();
  setInterval(updateTime, 1000);

  getWeatherButton.addEventListener('click', fetchWeather);
}

// Update Time
function updateTime() {
  const currentTime = getCurrentTime();
  const formattedTime = formatTime(currentTime);
  timeDisplay.textContent = formattedTime;
}

// Fetch Weather
async function fetchWeather() {
  currentLocation = locationInput.value;

  const cachedWeather = getCachedData(currentLocation);
  if (cachedWeather) {
    displayWeather(cachedWeather);
    return;
  }

  try {
    const weatherData = await getWeatherData(currentLocation);
    cacheData(currentLocation, weatherData);
    displayWeather(weatherData);
  } catch (error) {
    handleError(error);
  }
}


initializeApp();