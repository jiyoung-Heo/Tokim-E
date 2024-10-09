import React from 'react';
import styled from 'styled-components';

// 모달 배경 스타일
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// 모달 컨테이너 스타일
const ModalContainer = styled.div`
  position: relative; /* X 버튼 위치를 위해 relative 추가 */
  width: 80%;
  max-height: 70vh;
  background: white;
  border-radius: 10px;
  padding: 20px;
  overflow-y: auto;
  z-index: 1001; /* ModalBackground보다 높게 설정 */
`;

// 닫기 버튼 스타일 (X 버튼)
const CloseButton = styled.button`
  position: absolute;
  top: 2vh;
  right: 2vw;
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #ff0000;
  }
`;

const ModalTitle = styled.h3`
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
  color: #333;
`;

const StoryItem = styled.div`
  padding: 10px;
  background-color: #f9f9f9;
  margin-bottom: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0f7fa;
  }
`;

const CloseButtonFooter = styled.button`
  background: #27c384;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
`;

interface PreviousStoryModalProps {
  isOpen: boolean;
  stories: string[];
  onClose: () => void;
  onSelectStory: (story: string) => void;
}

const PreviousStoryModal: React.FC<PreviousStoryModalProps> = ({
  isOpen,
  stories,
  onClose,
  onSelectStory,
}) => {
  if (!isOpen) return null;

  // 최근 10개의 사연만 가져오기
  const recentStories = stories.slice(-10);

  // 모달 바깥을 클릭했을 때 모달 닫기
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose(); // 모달 닫기
    }
  };

  return (
    <ModalBackground onClick={handleBackgroundClick}>
      <ModalContainer>
        {/* X 버튼 추가 */}
        <CloseButton onClick={onClose}>×</CloseButton>

        <ModalTitle>이전 사연</ModalTitle>
        {recentStories.length > 0 ? (
          recentStories.map((story, index) => (
            <StoryItem key={index} onClick={() => onSelectStory(story)}>
              {story.length > 100 ? `${story.slice(0, 100)}...` : story}
            </StoryItem>
          ))
        ) : (
          <p>이전 사연이 없습니다.</p>
        )}
        <CloseButtonFooter onClick={onClose}>닫기</CloseButtonFooter>
      </ModalContainer>
    </ModalBackground>
  );
};

export default PreviousStoryModal;
