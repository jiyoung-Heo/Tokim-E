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
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const ContentContainer = styled.div`
  border: 1px solid #ccc; /* 배경선 추가 */
  border-radius: 5px;
  padding: 10px;
  max-height: 200px; /* 최대 높이 설정 */
  overflow-y: auto; /* 스크롤 가능하게 설정 */

  /* 스크롤바 색상 변경 */
  &::-webkit-scrollbar {
    width: 8px; /* 스크롤바 너비 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #27c384; /* 스크롤바 색상 */
    border-radius: 4px; /* 스크롤바 둥글기 */
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1; /* 스크롤바 트랙 색상 */
    border-radius: 4px; /* 트랙 둥글기 */
  }
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
        <h2>{markerData.dangerTitle}</h2>
        <ContentContainer>
          <p>{markerData.dangerContent}</p>
        </ContentContainer>
        <p>위도: {markerData.lat}</p>
        <p>경도: {markerData.lng}</p>
      </ModalContent>
    </ModalOverlay>
  );
};

export default RiskMapModal;
