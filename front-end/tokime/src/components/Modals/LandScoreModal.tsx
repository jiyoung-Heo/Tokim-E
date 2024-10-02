// src/components/modals/LandScoreModal.tsx
import React from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  width: 300px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  text-align: center;
`;

const CloseButton = styled.button`
  background: red;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 20px;
`;

interface ModalProps {
  onClose: () => void;
}

function LandScoreModal({ onClose }: ModalProps) {
  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>토지점수 기록 보기</h2>
        <p>여기에 토지점수 기록 내용이 표시됩니다.</p>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalContent>
    </ModalBackground>
  );
}

export default LandScoreModal;
