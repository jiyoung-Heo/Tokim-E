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
import RiskMap from '../pages/RiskMap'; // 새로 추가

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/address-search" element={<AddressSearch />} />
      <Route
        path="/land-purchase-knowledge"
        element={<LandPurchaseKnowledge />}
      />
      <Route path="/land-terms" element={<LandTerms />} />
      <Route path="/land-terms/:term" element={<LandTermDetail />} />
      <Route path="/my-page" element={<MyPage />} />
      <Route path="/investment" element={<InvestmentPage />} />
      <Route path="/investment-register" element={<InvestmentRegisterPage />} />
      <Route
        path="/investment-detail"
        element={<InvestmentDetailPage />} // 투자 예정지 상세 페이지 추가
      />
      <Route path="/land-purchase-quiz" element={<LandPurchaseQuiz />} />
      <Route path="/risk-map" element={<RiskMap />} />{' '}
      {/* 위험 지도 라우터 추가 */}
    </Routes>
  );
}

export default AppRouter;
