import { getCoordinates, getWeatherData } from '../src/scripts/weather';

// Mock API responses
const mockCoordinates = { lat: 35.6895, lon: 139.6917 }; // Tokyo
const mockWeatherData = {
  properties: {
    timeseries: [
      {
        time: '2024-12-20T12:00:00Z',
        data: { instant: { details: { air_temperature: 15 } } },
      },
    ],
  },
};

// Mock fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockWeatherData),
  })
);

describe('Weather module', () => {
  it('should fetch coordinates', async () => {
    const coordinates = await getCoordinates('Tokyo');
    expect(coordinates).toEqual(mockCoordinates); // Replace with actual expected data
  });

  it('should fetch weather data', async () => {
    const weatherData = await getWeatherData(mockCoordinates);
    expect(weatherData).toEqual(mockWeatherData);
  });

  it('should handle API errors for coordinates', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));
    await expect(getCoordinates('Invalid Location')).rejects.toThrow('Network error');
  });

  it('should handle API errors for weather data', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));
    await expect(getWeatherData(mockCoordinates)).rejects.toThrow('Network error');
  });

  // Add more tests for data transformation and error handling as needed
});