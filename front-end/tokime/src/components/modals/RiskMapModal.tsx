import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
  text-align: center; /* Center align text */
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const ContentContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  max-height: 200px;
  overflow-y: auto;
  width: 100%;
  word-wrap: break-word;
  white-space: normal;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #27c384;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
`;

const TitleContainer = styled.div`
  border-radius: 5px;
  padding: 10px;
  overflow: hidden;
  width: 100%;
  background: transparent;
  word-wrap: break-word;
  white-space: normal;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: clamp(5px, 4vw, 18px); /* 화면 크기에 맞춰 반응형 폰트 크기 */
  white-space: nowrap; /* 한 줄로 표시 */
  overflow: hidden; /* 넘치는 부분 숨기기 */
  text-overflow: ellipsis; /* 넘치는 텍스트에 ... 추가 */
  max-width: 100%; /* 제목이 모달 너비를 넘지 않도록 설정 */
`;

// New styled component for the image
const ImageContainer = styled.div`
  margin-bottom: 10px; /* Space between image and title */
`;

interface RiskMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  markerData: {
    lat: number;
    lng: number;
    dangerTitle: string;
    dangerContent: string;
  } | null;
}

const RiskMapModal: React.FC<RiskMapModalProps> = ({
  isOpen,
  onClose,
  markerData,
}) => {
  if (!markerData) return null;

  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>

        {/* Image added here */}
        <ImageContainer>
          <img
            src="/icons/icon-siren.png"
            alt="Siren Icon"
            style={{ width: '50px', height: '50px' }}
          />
        </ImageContainer>

        <TitleContainer>
          <Title>{markerData.dangerTitle}</Title>
        </TitleContainer>
        <ContentContainer>
          <p>{markerData.dangerContent}</p>
        </ContentContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default RiskMapModal;
