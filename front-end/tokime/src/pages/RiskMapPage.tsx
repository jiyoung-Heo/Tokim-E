import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { getDangerInfoDetail } from '../api/dangerAxios'; // Import your API function

const MapContainer = styled.div`
  width: 100%;
  height: 100vh; // Set height to viewport height
`;

const RiskMapPage: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadNaverMapApi = () => {
      return new Promise((resolve, reject) => {
        if (window.naver && window.naver.maps) {
          resolve(true);
        } else {
          const script = document.createElement('script');
          script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVERMAP_API_KEY}`;
          script.async = true;
          script.onload = () => resolve(true);
          script.onerror = () =>
            reject(new Error('Failed to load Naver Maps API.'));
          document.body.appendChild(script);
        }
      });
    };

    const initMap = () => {
      if (mapContainer.current) {
        return new window.naver.maps.Map(mapContainer.current, {
          center: new window.naver.maps.LatLng(37.4189122, 127.0430025), // Initial center coordinates
          zoom: 14,
          draggable: true,
          zoomControl: true,
          scaleControl: true,
          minZoom: 10,
          maxZoom: 25,
        });
      }
      return null; // Explicitly return null
    };

    const createMarker = (map: any, lat: number, lng: number) => {
      return new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(lat, lng),
        map,
        icon: {
          url: 'markers/default.png', // Default marker image
          scaledSize: new window.naver.maps.Size(30, 30),
        },
      });
    };

    const fetchData = async () => {
      const map = initMap(); // Initialize the map
      if (!map) return; // Exit if map initialization fails

      // Fetch data for IDs 1 to 100
      const fetchPromises = Array.from({ length: 100 }, (_, index) => {
        return getDangerInfoDetail(index + 1)
          .then((data) => {
            if (data) {
              const { lat, lng } = data;
              createMarker(map, lat, lng); // Add marker
            } else {
              console.error(`No data for ID: ${index + 1}`);
            }
          })
          .catch((error) => {
            console.error(`Fetch error for ID ${index + 1}:`, error);
          });
      });

      await Promise.all(fetchPromises); // Wait for all requests to complete
    };

    loadNaverMapApi()
      .then(() => {
        fetchData(); // Fetch data after loading the API
      })
      .catch((error) => console.error(error));
  }, []);

  return <MapContainer ref={mapContainer} />; // Render the map container
};

export default RiskMapPage;
