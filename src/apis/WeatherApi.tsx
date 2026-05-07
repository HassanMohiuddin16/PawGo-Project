const API_KEY = "a9ec1692dccc41279c0121957240312";
const BASE_URL = "https://api.weatherapi.com/v1";

export const fetchWeatherData = async (location: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=5&aqi=yes&alerts=yes`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
