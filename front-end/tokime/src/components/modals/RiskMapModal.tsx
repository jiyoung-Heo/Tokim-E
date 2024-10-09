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
  border: 1px solid #ccc; /* Border for content */
  border-radius: 5px;
  padding: 10px;
  max-height: 200px; /* Max height */
  overflow-y: auto; /* Scrollable */
  width: 100%; /* Full width */
  word-wrap: break-word; /* Break long words */
  white-space: normal; /* Normal whitespace handling */

  /* Scrollbar styles */
  &::-webkit-scrollbar {
    width: 8px; /* Scrollbar width */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #27c384; /* Scrollbar color */
    border-radius: 4px; /* Scrollbar rounded corners */
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1; /* Scrollbar track color */
    border-radius: 4px; /* Track rounded corners */
  }
`;

// TitleContainer styled component with updated styles
const TitleContainer = styled.div`
  border-radius: 5px; /* Same radius as content */
  padding: 10px;
  overflow: hidden; /* Prevent overflow */
  width: 100%; /* Full width */
  background: transparent; /* Transparent background */
  word-wrap: break-word; /* Break long words */
  white-space: normal; /* Normal whitespace handling */
  margin-bottom: 10px; /* Margin added for space between title and content */
`;

const Title = styled.h2`
  margin: 0; /* Remove default margin */
  font-size: 18px; /* Adjust font size as needed */
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
