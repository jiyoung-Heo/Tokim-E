import React from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const CloseButton = styled.button`
  margin-top: 15px;
  padding: 8px 16px;
  background-color: #27c384;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

interface LandInformationRegistrationModalProps {
  message: string;
  onClose: () => void;
}

const LandInformationRegistrationModal: React.FC<
  LandInformationRegistrationModalProps
> = ({ message, onClose }) => {
  return (
    <ModalBackground>
      <ModalContainer>
        <h4>{message}</h4>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalContainer>
    </ModalBackground>
  );
};

export default LandInformationRegistrationModal;
