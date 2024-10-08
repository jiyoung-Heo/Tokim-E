import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
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
import ProtectedRoute from './ProtectedRoute';

function AppRouter() {
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
          <ProtectedRoute
            element={
              <Layout>
                <MyPage />
              </Layout>
            }
          />
        } // 보호된 라우트
      />
      <Route
        path="/investment"
        element={
          <ProtectedRoute
            element={
              <Layout>
                <InvestmentPage />
              </Layout>
            }
          />
        }
      />
      <Route
        path="/investment-register"
        element={
          <ProtectedRoute
            element={
              <Layout>
                <InvestmentRegisterPage />
              </Layout>
            }
          />
        }
      />
      <Route
        path="/investment-detail/:invest"
        element={
          <ProtectedRoute
            element={
              <Layout>
                <InvestmentDetailPage />
              </Layout>
            }
          />
        }
      />
      <Route
        path="/land-purchase-quiz"
        element={
          <ProtectedRoute
            element={
              <Layout>
                <LandPurchaseQuiz />
              </Layout>
            }
          />
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
      <Route path="*" element={<Navigate to="/main" replace />} />{' '}
      {/* 모든 잘못된 경로를 /main으로 리디렉션 */}
    </Routes>
  );
}

export default AppRouter;
