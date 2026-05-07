import axios from "axios";

const apiKey = "AlzaSyOrGCpl99wzYPTPTYSuPZG6aHHbjl1X07A";

export const getUserLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      reject("Geolocation not available");
    }
  });
};

export const fetchNearbyParks = (lat: number, lng: number): Promise<any[]> => {
  return axios
    .get(
      `https://maps.gomaps.pro/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=700&type=park&key=${apiKey}`
    )
    .then((response) => {
      const parksData = response.data.results.map((park: any) => ({
        name: park.name,
        location: {
          lat: park.geometry.location.lat,
          lng: park.geometry.location.lng,
        },
      }));
      return parksData;
    })
    .catch((error) => {
      console.error("Error fetching parks:", error);
      return [];
    });
};
