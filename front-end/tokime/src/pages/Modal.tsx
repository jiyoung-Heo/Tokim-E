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

const RetryButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background: #007bff; /* 재시도 버튼 색상 */
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;

const ResultButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background: #ff6b6b; /* 결과 페이지 버튼 색상 */
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;

interface ModalProps {
  message: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  feedbackMessage: string;
  onClose: () => void;
  onRetry: () => void;
  onGoToResults: () => void;
}

const Modal: React.FC<ModalProps> = ({
  message,
  score,
  correctAnswers,
  totalQuestions,
  feedbackMessage,
  onClose,
  onRetry,
  onGoToResults,
}) => {
  return (
    <Overlay>
      <ModalContainer>
        <h2>💯 퀴즈 결과 💯 </h2>
        <p>{message}🎉</p>
        <p>
          정답 : {correctAnswers} / {totalQuestions}
        </p>
        <p>점수: {score}</p>
        <p>{feedbackMessage}</p>
        {/* <CloseButton onClick={onClose}>닫기</CloseButton> */}
        <RetryButton onClick={onRetry}>다시 풀기</RetryButton>
        <ResultButton onClick={onGoToResults}>결과 페이지로</ResultButton>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
