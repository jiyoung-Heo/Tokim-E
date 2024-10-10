import React from 'react';
import styled, { keyframes } from 'styled-components';
import tokime from '../assets/images/quiz/토킴이1누끼.png'; // 이미지 경로 확인

// 애니메이션 정의
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-20px);
  }
  to {
    transform: translateY(0);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.3s ease; /* 오버레이 애니메이션 */
`;

const ModalContainer = styled.div`
  background: linear-gradient(
    135deg,
    #ff6b6b,
    #ffcc6b
  ); /* 투명도 없는 그라데이션 */
  margin-bottom: 10vh;
  padding: 5vh; /* vh 단위로 패딩 조정 */
  border-radius: 2vw; /* vw 단위로 모서리 반경 조정 */
  box-shadow: 0 0.5vw 2vw rgba(0, 0, 0, 0.2); /* vw 단위로 그림자 조정 */
  text-align: center;
  width: 80vw; /* vw 단위로 너비 조정 */
  height: auto; /* 높이를 자동으로 설정 */
  max-height: 70vh; /* vh 단위로 최대 높이 설정 */
  max-width: 90vw; /* vw 단위로 최대 너비 설정 */
  animation: ${slideIn} 0.3s ease; /* 모달 슬라이드 인 애니메이션 */
`;

const Image = styled.img`
  width: 50vw; /* vw 단위로 이미지 너비 조정 */
  height: auto; /* 비율 유지 */
  margin-bottom: 2vh; /* vh 단위로 이미지와 메시지 간격 조정 */
`;

const Message = styled.p`
  font-size: 5vw; /* vw 단위로 글꼴 크기 조정 */
  color: black;
  font-weight: 900;
  margin: 1vh 0; /* vh 단위로 마진 조정 */
`;

const ButtonContainer = styled.div`
  flex-direction: column;
  display: flex;
`;

const RetryButton = styled.button`
  padding: 2vh 4vw; /* vh, vw 단위로 패딩 조정 */
  background: white; /* 기본 색상 */
  font-size: 18px;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: bold;
  border-radius: 10px;
  margin-bottom: 2vh; /* vh 단위로 아래 버튼과의 간격 조정 */
  animation: colorChange 1s infinite; /* 애니메이션 속도 조정 */

  @keyframes colorChange {
    0% {
      background: #27c384; /* 시작 색상 */
    }
    50% {
      background: #ff9f7f; /* 중간 색상 (밝은 주황색) */
    }
    100% {
      background: #27c384; /* 끝 색상 */
    }
  }

  &:hover {
    background: #2aa672; /* 호버 시 색상 */
    transition: background 0.9s ease; /* 부드러운 전환 효과 */
  }
`;

const ResultButton = styled.button`
  margin-top: 1vh; /* vh 단위로 마진 조정 */
  padding: 2vh 4vw; /* vh, vw 단위로 패딩 조정 */
  background: #27c384; /* 주황색에 잘 어울리는 밝은 주황색 */
  font-weight: bold;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  font-size: 18px;

  &:hover {
    box-shadow: 0 0.5vw 1vw rgba(255, 71, 87, 0.5);
    transform: translateY(-2px);
    transition: all 0.2s ease;
  }
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
        <Image src={tokime} alt="토킴이" /> {/* 이미지 추가 */}
        <Message>{message}</Message>
        <Message>
          맞춘 개수 : {correctAnswers} / {totalQuestions}
        </Message>
        <Message>
          점수 : {score} {feedbackMessage}
        </Message>
        <ButtonContainer>
          <RetryButton onClick={onRetry}>다시 풀기</RetryButton>
          <ResultButton onClick={onGoToResults}>결과 페이지로</ResultButton>
        </ButtonContainer>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
