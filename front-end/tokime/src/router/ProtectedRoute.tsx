import React from 'react';
import { Navigate } from 'react-router-dom';

function getCookieValue(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop();
    if (cookieValue) {
      return cookieValue.split(';').shift() || null; // split이나 shift가 undefined일 경우 null 반환
    }
  }
  return null;
}

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const authCookie = getCookieValue('Authorization');

  // 쿠키가 없으면 로그인 페이지로 리디렉션
  if (!authCookie) {
    return <Navigate to="/login-required" replace />;
  }

  return element; // element가 항상 ReactElement임을 보장
};

export default ProtectedRoute;
