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
import LandPurchaseQuiz from '../pages/LandPurchaseQuiz';

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
      <Route path="/land-purchase-quiz" element={<LandPurchaseQuiz />} />
    </Routes>
  );
}

export default AppRouter;
