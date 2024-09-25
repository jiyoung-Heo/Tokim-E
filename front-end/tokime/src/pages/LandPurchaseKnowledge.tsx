import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트
import styled from 'styled-components';
import LandPurchaseProcedureTab from '../components/Tabs/LandPurchaseProcedureTab';
import EssentialKnowledgeTab from '../components/Tabs/EssentialKnowledgeTab';

const Tabs = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

// '$active'를 사용하여 DOM에 전달되지 않도록 함
const TabButton = styled.button<{ $active: boolean }>`
  background-color: ${(props) => (props.$active ? '#007bff' : '#f3f7fb')};
  color: ${(props) => (props.$active ? '#fff' : '#000')};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

function LandPurchaseKnowledge() {
  const [activeTab, setActiveTab] = useState<string>('purchaseProcedure');
  const navigate = useNavigate(); // useNavigate 훅 사용

  return (
    <div>
      <Tabs>
        <TabButton
          $active={activeTab === 'purchaseProcedure'} // '$active' 사용
          onClick={() => setActiveTab('purchaseProcedure')}
        >
          구매 절차
        </TabButton>
        <TabButton
          $active={activeTab === 'essentialKnowledge'} // '$active' 사용
          onClick={() => setActiveTab('essentialKnowledge')}
        >
          필수 상식
        </TabButton>
      </Tabs>

      {activeTab === 'purchaseProcedure' && <LandPurchaseProcedureTab />}
      {activeTab === 'essentialKnowledge' && <EssentialKnowledgeTab />}

      <button
        type="button"
        onClick={() => navigate('/land-purchase-quiz')} // navigate로 페이지 이동
      >
        토지구매상식 문제 풀어보기
      </button>
    </div>
  );
}

export default LandPurchaseKnowledge;
