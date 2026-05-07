const API_KEY = "a9ec1692dccc41279c0121957240312";
const BASE_URL = "https://api.weatherapi.com/v1";

export const fetchWeatherData = async (location: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=5&aqi=yes&alerts=yes`
    );

    if (!response.ok) {
      console.log("API failed:", response.status);
      return { forecast: null };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Network error:", error);
    return { forecast: null };
  }
};