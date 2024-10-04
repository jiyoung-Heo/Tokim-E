// Modal.tsx
import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 360px;
  height: 360px;
  max-height: 60%;
  max-width: 90%;
`;

const CloseButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background: #27c384;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;

interface ModalProps {
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
  return (
    <Overlay>
      <ModalContainer>
        <h2>퀴즈 </h2>
        <p>{message}</p>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
