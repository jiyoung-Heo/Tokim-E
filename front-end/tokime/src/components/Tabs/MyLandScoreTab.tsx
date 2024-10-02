import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Graph from '../charts/GaugeGraph'; // 그래프 컴포넌트

// 점수와 백분위 컨테이너 스타일 정의
const GaugeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
`;

// 점수 텍스트 스타일
const Score = styled.p`
  font-size: 6vw; // 반응형으로 360px 기준 20px
  font-weight: bold;
  margin-top: -20px;
  color: #333333;
`;

// 백분위 텍스트 스타일
const Percentile = styled.p`
  font-size: 4vw; // 반응형으로 360px 기준 14px
  color: #333333;
`;

// 버튼 스타일 정의
const StyledButton = styled.button<{
  $bgColor: string;
  $textColor: string;
}>`
  width: 90vw;
  height: 6vh;
  max-width: 360px;
  background-color: ${(props) => props.$bgColor};
  color: ${(props) => props.$textColor};
  font-size: 13px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

// 컨테이너 스타일 정의
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  overflow: hidden;
  position: fixed; // fixed로 설정하여 스크롤 방지
  top: 0;
  left: 0;
`;

function MyLandScoreTab() {
  const navigate = useNavigate();
  const score = 76; // 예시 점수
  const percentile = '상위 43%'; // 예시 백분위

  return (
    <Container>
      <GaugeWrapper>
        <Graph score={score} /> {/* 그래프 크기는 적절히 설정 */}
        <Score>{score}점</Score>
        <Percentile>{percentile}</Percentile>
      </GaugeWrapper>

      {/* "토지 구매 상식 더 공부하러 가기" 버튼 */}
      <StyledButton
        $bgColor="rgba(121, 121, 130, 0.1)"
        $textColor="#27C384"
        onClick={() => navigate('/land-purchase-knowledge')}
      >
        토지 구매 상식 더 공부하러가기
      </StyledButton>

      {/* "토지 상식 퀴즈 다시 풀어보기" 버튼 */}
      <StyledButton
        $bgColor="#27C384"
        $textColor="#FFFFFF"
        onClick={() => navigate('/land-purchase-quiz')}
      >
        토지 상식 퀴즈 다시 풀어보기
      </StyledButton>
    </Container>
  );
}

export default MyLandScoreTab;
