import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Graph from '../charts/GaugeGraph'; // 그래프 컴포넌트
import userQuizAverageAxios from '../../api/userQuizAverageAxios'; // 점수 API 호출

// 점수와 백분위 컨테이너 스타일 정의
const GaugeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

// 점수 텍스트 스타일
const Score = styled.p`
  font-size: 6vw;
  font-weight: bold;
  margin-top: -2vh;
  color: #333333;
`;

// 백분위 텍스트 스타일
const Percentile = styled.p`
  font-size: 4vw;
  margin-top: -2vh;
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
  font-size: calc(1vw + 1vh);
  font-weight: bold;
  border: none;
  border-radius: 1vh;
  margin-top: 2vh;
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
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
`;

function MyLandScoreTab() {
  const [score, setScore] = useState<number | null>(null);
  const [percentile, setPercentile] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 사용자 퀴즈 데이터를 불러오는 함수
    const fetchUserQuizData = async () => {
      try {
        const response = await userQuizAverageAxios();

        // 응답 데이터 확인
        console.log('API 응답 데이터:', response);

        if (response) {
          const { quizScore, top } = response; // quizScore와 top 필드 접근

          if (quizScore !== undefined && top !== undefined) {
            setScore(quizScore);
            setPercentile(`상위 ${top}%`);
          } else {
            throw new Error('유효한 데이터를 받지 못했습니다.');
          }
        } else {
          throw new Error('응답에 데이터가 없습니다.');
        }
      } catch (err) {
        console.error('사용자 점수를 불러오는 중 오류 발생:', err);
        setFetchError((err as Error).message); // 에러 메시지 설정
      }
    };

    fetchUserQuizData();
  }, []);

  return (
    <Container>
      <GaugeWrapper>
        {fetchError ? (
          <p>{fetchError}</p> // 에러 메시지 출력
        ) : score !== null ? (
          <>
            <Graph score={score} />
            <Score>{score}점</Score>
            <Percentile>{percentile}</Percentile>
          </>
        ) : (
          <p>로딩 중...</p>
        )}
      </GaugeWrapper>

      <StyledButton
        $bgColor="rgba(121, 121, 130, 0.1)"
        $textColor="#27C384"
        onClick={() => navigate('/land-purchase-knowledge')}
      >
        토지 구매 상식 더 공부하러 가기
      </StyledButton>

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
