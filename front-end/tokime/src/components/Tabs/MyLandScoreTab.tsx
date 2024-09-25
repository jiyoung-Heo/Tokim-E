// src/components/Tabs/MyLandScoreTab.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function MyLandScoreTab({ onOpenModal }: { onOpenModal: () => void }) {
  const navigate = useNavigate();

  return (
    <div>
      <h2>나의 토지점수</h2>
      <p>토지 점수는 76점입니다.</p>

      {/* 모달 열기 */}
      <button type="button" onClick={onOpenModal}>
        토지점수 기록 보기
      </button>

      {/* navigate로 페이지 이동 */}
      <button
        type="button"
        onClick={() => navigate('/land-purchase-knowledge')}
      >
        토지 구매 상식 더 공부하러 가기
      </button>

      <button type="button" onClick={() => navigate('/land-purchase-quiz')}>
        토지 상식 퀴즈 다시 풀어보기
      </button>
    </div>
  );
}

export default MyLandScoreTab;
