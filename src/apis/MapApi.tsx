export const getUserLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      reject("Geolocation not available");
    }
  });
};

// FREE parks data using OpenStreetMap Overpass API
export const fetchNearbyParks = async (lat: number, lng: number): Promise<any[]> => {
  try {
    const query = `
      [out:json];
      (
        node["leisure"="park"](around:700,${lat},${lng});
        way["leisure"="park"](around:700,${lat},${lng});
        relation["leisure"="park"](around:700,${lat},${lng});
      );
      out center;
    `;

    const url = "https://overpass-api.de/api/interpreter";

    const response = await fetch(url, {
      method: "POST",
      body: query,
    });

    const data = await response.json();

    const parksData = data.elements.map((el: any) => ({
      name: el.tags?.name || "Unnamed Park",
      location: {
        lat: el.lat || el.center?.lat,
        lng: el.lon || el.center?.lon,
      },
    }));

    return parksData;
  } catch (error) {
    console.error("Error fetching parks:", error);
    return [];
  }
};