import errorHandler from './error-handler.js';
import cache from './cache.js';

async function getCoordinates(postalCode) {
  const cachedData = cache.get(`coordinates-${postalCode}`);
  if (cachedData) {
    return cachedData;
  }

  const url = `https://nominatim.openstreetmap.org/search?postalcode=${postalCode}&country=japan&format=json`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Geocoding error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    if (data.length === 0) {
      throw new Error('No results found for the provided postal code.');
    }
    const { lat, lon } = data[0];
    const coordinates = { lat, lon };
    cache.set(`coordinates-${postalCode}`, coordinates);
    return coordinates;
  } catch (error) {
    errorHandler(error);
    return null;
  }
}

async function getWeatherData(coordinates) {
  const cachedData = cache.get(`weather-${coordinates.lat}-${coordinates.lon}`);
  if (cachedData) {
    return cachedData;
  }

  const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${coordinates.lat}&lon=${coordinates.lon}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    cache.set(`weather-${coordinates.lat}-${coordinates.lon}`, data);
    return data;
  } catch (error) {
    errorHandler(error);
    return null;
  }
}

async function updateWeatherDisplay(postalCode) {
  const coordinates = await getCoordinates(postalCode);
  if (!coordinates) return;

  const weatherData = await getWeatherData(coordinates);
  if (!weatherData) return;

  // データ変換と表示更新のロジックをここに実装
  // 例:
  // const temperature = weatherData.properties.timeseries[0].data.instant.details.air_temperature;
  // document.getElementById('temperature').textContent = temperature;
  console.log(weatherData); // デバッグ用
}


export { getCoordinates, getWeatherData, updateWeatherDisplay };