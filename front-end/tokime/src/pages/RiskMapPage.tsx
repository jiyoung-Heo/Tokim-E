import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import { getDangerInfoDetail } from '../api/dangerAxios'; // Import your API function
import backIcon from '../assets/images/icon/left-actionable.png'; // Back icon import

// Styled-components for positioning and styling
const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #f3f7fb;
`;

const Title = styled.h2`
  margin: 0 0 3vh 0;
  font-size: 25px;
  font-weight: bold;
  font-family: 'KoddiUD OnGothic';
  color: #333333;
  display: flex;
  justify-content: left;
`;

// Back icon styling
const BackIcon = styled.img`
  margin-right: 10px; // Optional: add margin to the back icon
`;

// Styled components for registration button and map container
const RegistContainer = styled.div`
  position: fixed; /* Fix the position on the screen */
  bottom: 13vh; /* Space from the bottom of the screen */
  right: 5vw; /* Space from the right of the screen */
`;

const RegisterButton = styled.button`
  padding: 1.5vh 5vw;
  background-color: #27c384;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  z-index: 800; /* Ensure button is on top */
  margin-top: 3vh;
  font-size: 15px;

  &:hover {
    background-color: #1ea774; /* Slightly darker green on hover */
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 70vh; // Set height to viewport height
`;

const RiskMapPage: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); // Initialize navigate function

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

  const handleReportClick = () => {
    navigate('report'); // Navigate to /risk-map/report (relative to current path)
  };

  return (
    <Container>
      <Title>
        <BackIcon src={backIcon} alt="Back Icon" onClick={() => navigate(-1)} />
        위험 지도
      </Title>
      <MapContainer ref={mapContainer} /> {/* Render the map container */}
      <RegistContainer>
        <RegisterButton onClick={handleReportClick}>신고하기</RegisterButton>{' '}
        {/* Add the styled report button */}
      </RegistContainer>
    </Container>
  );
};

export default RiskMapPage;
