import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import highImage from '../../assets/images/score/high.png';
import lowImage from '../../assets/images/score/low.png';
import evenImage from '../../assets/images/score/even.png';
import userQuizAverageAxios from '../../api/userQuizAverageAxios';
import ChartComponent from '../charts/ChartComponents'; // 분리한 차트 컴포넌트 import

// 컨테이너 스타일 정의 (스크롤 허용)
const Container = styled.div`
  min-height: 100vh;
  margin-top: 3vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  overflow-y: auto;
  position: relative;
`;

// 상단 텍스트 컨테이너 스타일
const TextContainer = styled.div`
  font-family: 'KoddiUD OnGothic';
  font-weight: 700;
  font-size: 5.5vw;
  line-height: 1.2;
  color: #333333;
  text-align: left;
  width: 100%;
  padding-left: 10px;
  margin-bottom: 10px;
`;

// 이미지 컨테이너 스타일
const ImageContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 50px;
`;

// 각 이미지 스타일
const Image = styled.img`
  width: 30vw;
  height: 30vw;
  max-width: 100px;
  max-height: 100px;
`;

// 그래프 컨테이너
const GraphContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 6vh;
  position: relative;
`;

// 그래프 바 스타일
const GraphBar = styled.div<{ width: string; color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width};
  height: 20px;
  background-color: ${(props) => props.color};
  border-radius: 30px;
  position: relative;
`;

// 그래프 배경
const GraphBackground = styled.div`
  width: 130px;
  height: 20px;
  background: rgba(121, 121, 130, 0.1);
  border-radius: 30px;
  position: relative;
`;

// 점수 텍스트
const ScoreText = styled.p`
  font-family: 'KoddiUD OnGothic';
  font-size: 12px;
  font-weight: 700;
  color: #333333;
  white-space: nowrap; /* 줄바꿈 방지 */
`;

// VS 텍스트 스타일 (그래프 사이에 위치)
const VsText = styled.div`
  font-family: 'Pretendard Variable';
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  position: absolute;
  left: 50%;
  top: -25px;
  transform: translateX(-50%);
  z-index: 1;
`;

// 전체 중 상위 퍼센트 텍스트 스타일
const PercentText = styled.div`
  font-family: 'KoddiUD OnGothic';
  font-weight: bold;
  font-size: 20px;
  color: #333333;
  margin-left: 8.33vw;
  width: 100%; /* 부모 컨테이너의 너비를 꽉 채움 */
  text-align: left; /* 명시적으로 왼쪽 정렬 */
`;

function AnalysisTab() {
  const [userScore, setUserScore] = useState<number>(0);
  const [peerAverage, setPeerAverage] = useState<number>(0);
  const [userTop, setUserTop] = useState<number>(0); // 상위 % 값
  const [scoreList, setScoreList] = useState<number[][]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userQuizAverageAxios();

        setUserScore(data.quizScore);
        setPeerAverage(data.totalAverage);
        setUserTop(data.top); // 상위 % 값 가져오기
        setScoreList(data.scoreList);
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, []);

  const scoreDifference = Math.abs(userScore - peerAverage);

  return (
    <Container>
      <TextContainer>
        {userScore > peerAverage
          ? `전체 평균보다 ${scoreDifference}점 높아요`
          : userScore < peerAverage
            ? `전체 평균보다 ${scoreDifference}점 낮아요`
            : '평균과 같아요'}
      </TextContainer>

      <ImageContainer>
        <Image
          src={
            userScore > peerAverage
              ? highImage
              : userScore < peerAverage
                ? lowImage
                : evenImage
          }
          alt="나의 점수 이미지"
        />
        <Image
          src={
            peerAverage > userScore
              ? highImage
              : peerAverage < userScore
                ? lowImage
                : evenImage
          }
          alt="또래 점수 이미지"
        />
      </ImageContainer>

      <GraphContainer>
        <div>
          <GraphBackground>
            <GraphBar width={`${(userScore / 100) * 130}px`} color="#00C99C">
              <ScoreText>{userScore}점</ScoreText>
            </GraphBar>
          </GraphBackground>
        </div>
        <VsText>VS</VsText>
        <div>
          <GraphBackground>
            <GraphBar width={`${(peerAverage / 100) * 130}px`} color="#797982">
              <ScoreText>{peerAverage}점</ScoreText>
            </GraphBar>
          </GraphBackground>
        </div>
      </GraphContainer>

      {/* 전체 중 상위 % 텍스트 추가 */}
      <PercentText>전체 중 상위 {userTop}%</PercentText>

      {/* 차트 컴포넌트 추가 */}
      {scoreList.length > 0 && (
        <ChartComponent scoreList={scoreList} userScore={userScore} />
      )}
    </Container>
  );
}

export default AnalysisTab;
