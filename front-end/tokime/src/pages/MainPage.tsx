// src/pages/MainPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <div>
      <h1>메인 페이지</h1>
      <ul>
        <li>
          <Link to="/address-search">지번 검색</Link>
        </li>
        <li>
          <Link to="/land-purchase-knowledge">토지 구매 상식</Link>
        </li>
        <li>
          <Link to="/land-terms">토지 용어 사전</Link>
        </li>
        <li>
          <Link to="/risk-map">위험 지도</Link>
        </li>
        <li>
          <Link to="/investment">투자 예정지</Link>
        </li>
      </ul>
    </div>
  );
}

export default MainPage;
