import React, { useState } from 'react';
import styled from 'styled-components';

// `TabButtonProps`의 타입 명시
interface TabButtonProps {
  active: boolean;
}

// 스타일 정의
const Tabs = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const TabButton = styled.button<TabButtonProps>`
  background-color: ${(props) => (props.active ? '#007bff' : '#f3f7fb')};
  color: ${(props) => (props.active ? '#fff' : '#000')};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const TabContent = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

function LandPurchaseKnowledge() {
  const [activeTab, setActiveTab] = useState<string>('purchaseProcedure');

  const handleQuizRedirect = () => {
    window.location.href = '/land-purchase-quiz';
  };

  return (
    <div>
      <Tabs>
        <TabButton
          active={activeTab === 'purchaseProcedure'}
          onClick={() => setActiveTab('purchaseProcedure')}
        >
          구매 절차
        </TabButton>
        <TabButton
          active={activeTab === 'essentialKnowledge'}
          onClick={() => setActiveTab('essentialKnowledge')}
        >
          필수 상식
        </TabButton>
      </Tabs>

      {activeTab === 'purchaseProcedure' && (
        <TabContent>
          {/* 구매 절차 내용 */}
          <p>구매 절차에 대한 내용입니다.</p>
        </TabContent>
      )}

      {activeTab === 'essentialKnowledge' && (
        <TabContent>
          {/* 필수 상식 내용 */}
          <p>필수 상식에 대한 내용입니다.</p>
        </TabContent>
      )}

      <button type="button" onClick={handleQuizRedirect}>
        토지구매상식 문제 풀어보기
      </button>
    </div>
  );
}

export default LandPurchaseKnowledge;
