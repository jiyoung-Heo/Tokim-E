// src/pages/RiskMap.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function RiskMapPage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/risk-map/report');
  };

  return (
    <div>
      <button type="button" onClick={handleButtonClick}>
        제보하기
      </button>
    </div>
  );
}

export default RiskMapPage;
