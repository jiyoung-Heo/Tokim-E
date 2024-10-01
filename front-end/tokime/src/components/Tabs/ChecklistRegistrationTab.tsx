import React from 'react';

interface ChecklistRegistrationTabProps {
  onNext: () => void; // 다음 버튼을 위한 prop 타입 정의
  onPrevious: () => void; // 이전 버튼을 위한 prop 타입 정의
}

function ChecklistRegistrationTab({
  onNext,
  onPrevious,
}: ChecklistRegistrationTabProps) {
  return (
    <div>
      <h3>체크리스트 등록 탭 내용</h3>
      {/* 체크리스트 내용을 여기에 추가하세요 */}
      <div>
        <button type="button" onClick={onPrevious}>
          이전
        </button>
        <button type="button" onClick={onNext}>
          다음
        </button>
      </div>
    </div>
  );
}

export default ChecklistRegistrationTab;
