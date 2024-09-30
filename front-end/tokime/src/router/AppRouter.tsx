import React from 'react';
import { Route, Routes } from 'react-router-dom';
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
        element={<LandPurchaseKnowledge />}
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
          <Layout>
            <MyPage />
          </Layout>
        }
      />
      <Route
        path="/investment"
        element={
          <Layout>
            <InvestmentPage />
          </Layout>
        }
      />
      <Route
        path="/investment-register"
        element={
          <Layout>
            <InvestmentRegisterPage />
          </Layout>
        }
      />
      <Route
        path="/investment-detail"
        element={
          <Layout>
            <InvestmentDetailPage />
          </Layout>
        }
      />
      <Route
        path="/land-purchase-quiz"
        element={
          <Layout>
            <LandPurchaseQuiz />
          </Layout>
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
    </Routes>
  );
}

export default AppRouter;
