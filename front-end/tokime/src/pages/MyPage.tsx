import React from 'react';
import { Link } from 'react-router-dom';

function MyPage() {
  return (
    <div>
      <h1>마이 페이지</h1>
      <ul>
        <li>
          <Link to="/land-score">내 토지 점수 페이지로 이동</Link>
        </li>
        <li>
          <Link to="/investment">내 투자 예정지 페이지로 이동</Link>
        </li>
      </ul>
    </div>
  );
}

export default MyPage;
