import React from 'react';
import styled, { keyframes } from 'styled-components';

// 모달 배경 페이드 인 애니메이션
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// 모달 내용 확대 애니메이션
const scaleUp = keyframes`
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

// 경고창 깜박이는 애니메이션 (빤짝빤짝)
const blink = keyframes`
  0%, 100% {
    box-shadow: 0 0 10px red;
    border: 2px solid red;
  }
  50% {
    box-shadow: 0 0 20px yellow;
    border: 2px solid yellow;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out; /* 페이드 인 애니메이션 */
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  animation:
    ${scaleUp} 0.3s ease-out,
    ${blink} 1s infinite; /* 확대 + 깜박이는 애니메이션 */
`;

const Button = styled.button<{ color?: string }>`
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.color || '#007bff'};
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

interface ModalProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal: React.FC<ModalProps> = ({
  isVisible,
  onConfirm,
  onCancel,
}) => {
  if (!isVisible) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h4>⚠️ 정말로 삭제하시겠습니까?</h4>
        <p>삭제한 데이터는 복구할 수 없습니다.</p>
        <Button color="#ff4d4d" onClick={onConfirm}>
          확인
        </Button>
        <Button onClick={onCancel}>취소</Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default DeleteModal;
