import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StartPage from '../pages/StartPage';
import MainPage from '../pages/MainPage';
import AddressSearch from '../pages/AddressSearch';
import LandPurchaseKnowledge from '../pages/LandPurchaseKnowledge';
import LandTerms from '../pages/LandTerms';
import LandTermDetail from '../pages/LandTermDetail';
import MyPage from '../pages/MyPage';
import InvestmentPage from '../pages/InvestmentPage';
import InvestmentRegisterPage from '../pages/InvestmentRegisterPage';
import InvestmentDetailPage from '../pages/InvestmentDetailPage'; // 투자 예정지 상세 페이지 추가
import LandPurchaseQuiz from '../pages/LandPurchaseQuiz';
import LoginRequiredPage from '../pages/LoginRequiredPage';
import RiskMapPage from '../pages/RiskMapPage'; // 새로 추가
import Layout from '../components/layouts/layout'; // Layout 추가
import RiskMapReportPage from '../pages/RiskMapReportPage';
import LandScorePage from '../pages/LandScorePage';
import { RootState } from '../redux/store';

function AppRouter() {
  const user = useSelector((state: RootState) => state.user);
  console.log(user);
  return (
    <Routes>
      <Route path="/" element={<StartPage />} /> {/* 하단탭과 사이드바 없음 */}
      <Route path="/login-required" element={<LoginRequiredPage />} />{' '}
      {/* 하단탭과 사이드바 없음 */}
      <Route
        path="/main"
        element={
          <Layout>
            <MainPage />
          </Layout>
        }
      />
      <Route
        path="/address-search"
        element={
          <Layout>
            <AddressSearch />
          </Layout>
        }
      />
      <Route
        path="/land-purchase-knowledge"
        element={
          <Layout>
            <LandPurchaseKnowledge />
          </Layout>
        }
      />
      <Route
        path="/land-terms"
        element={
          <Layout>
            <LandTerms />
          </Layout>
        }
      />
      <Route
        path="/land-terms/:term"
        element={
          <Layout>
            <LandTermDetail />
          </Layout>
        }
      />
      <Route
        path="/my-page"
        element={
          user.email ? ( // 인증 여부 확인
            <Layout>
              <MyPage />
            </Layout>
          ) : (
            <Navigate to="/login-required" replace /> // 비회원일 경우 로그인 페이지로 이동
          )
        }
      />
      <Route
        path="/investment"
        element={
          user.email ? ( // 인증 여부 확인
            <Layout>
              <InvestmentPage />
            </Layout>
          ) : (
            <Navigate to="/login-required" replace /> // 비회원일 경우 로그인 페이지로 이동
          )
        }
      />
      <Route
        path="/investment-register"
        element={
          user.email ? ( // 인증 여부 확인
            <Layout>
              <InvestmentRegisterPage />
            </Layout>
          ) : (
            <Navigate to="/login-required" replace /> // 비회원일 경우 로그인 페이지로 이동
          )
        }
      />
      <Route
        path="/investment-detail/:invest"
        element={
          user.email ? ( // 인증 여부 확인
            <Layout>
              <InvestmentDetailPage />
            </Layout>
          ) : (
            <Navigate to="/login-required" replace /> // 비회원일 경우 로그인 페이지로 이동
          )
        }
      />
      <Route
        path="/land-purchase-quiz"
        element={
          user.email ? (
            <Layout>
              <LandPurchaseQuiz />
            </Layout>
          ) : (
            <Navigate to="/login-required" replace /> // 비회원일 경우 로그인 페이지로 이동
          )
        }
      />
      <Route
        path="/risk-map"
        element={
          <Layout>
            <RiskMapPage />
          </Layout>
        }
      />
      <Route
        path="/risk-map/report"
        element={
          <Layout>
            <RiskMapReportPage />
          </Layout>
        }
      />
      <Route
        path="/land-score"
        element={
          <Layout>
            <LandScorePage />
          </Layout>
        }
      />
    </Routes>
  );
}

export default AppRouter;
