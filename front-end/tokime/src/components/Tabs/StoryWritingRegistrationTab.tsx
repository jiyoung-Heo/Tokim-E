import React from 'react';

interface StoryWritingRegistrationTabProps {
  onPrevious: () => void; // 이전 버튼을 위한 prop 타입 정의
  onRegister: () => void; // 등록 버튼을 위한 prop 타입 정의
}

function StoryWritingRegistrationTab({
  onPrevious,
  onRegister,
}: StoryWritingRegistrationTabProps) {
  return (
    <div>
      <h3>사연 작성 등록 탭 내용</h3>
      {/* 사연 작성 내용을 여기에 추가하세요 */}
      <div>
        <button type="button" onClick={onPrevious}>
          이전
        </button>
        <button type="button" onClick={onRegister}>
          등록
        </button>
      </div>
    </div>
  );
}

export default StoryWritingRegistrationTab;
