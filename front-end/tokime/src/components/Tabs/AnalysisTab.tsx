import React from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from 'chart.js'; // 필요한 모듈 임포트

import highImage from '../../assets/images/score/high.png'; // 이미지 import
import lowImage from '../../assets/images/score/low.png'; // 이미지 import
import evenImage from '../../assets/images/score/even.png'; // 이미지 import

// Chart.js 모듈 등록
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
);

// 컨테이너 스타일 정의 (스크롤 허용)
const Container = styled.div`
  width: 90vw;
  min-height: 100vh;
  margin-top: 3vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  overflow-y: auto; // 스크롤 허용
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
  margin-bottom: 50px;
  position: relative; // VS 텍스트 배치 위한 relative 추가
`;

// 그래프 바 스타일
const GraphBar = styled.div<{ width: string; color: string }>`
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
  color: #fff;
  position: absolute;
  left: 50%;
  top: 3px;
  transform: translateX(-50%);
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

// 전체 중 상위 퍼센트 텍스트
const PercentText = styled.div`
  font-family: 'KoddiUD OnGothic';
  font-weight: 700;
  font-size: 4vw;
  color: #333333;
  margin-bottom: 20px;
  text-align: center;
`;

// 부드러운 꺾은선 그래프 스타일
const ChartContainer = styled.div`
  width: 90%;
  height: 150px;
  margin-top: 10px;
`;

// 차트 데이터와 옵션 설정
const chartData = {
  labels: ['0점', '20점', '40점', '60점', '80점', '100점'],
  datasets: [
    {
      label: '전체 중 상위 43%',
      data: [0, 10, 30, 43, 60, 90], // 예시 데이터, 실제 데이터는 받아서 설정
      fill: false,
      borderColor: '#00C99C',
      tension: 0.4, // 부드러운 라인
    },
  ],
};

const chartOptions = {
  responsive: true,
  scales: {
    y: {
      display: false, // y축 숨기기
    },
    x: {
      display: true, // x축 표시
    },
  },
};

function AnalysisTab() {
  const userScore = 76;
  const peerAverage = 54;
  const age = 27;
  const ageRange = age < 30 ? '20대' : '다른연령대';

  const scoreDifference = Math.abs(userScore - peerAverage);
  const percentRank = 43; // 실제로는 axios로 받아올 값

  let scoreComparisonText = '';
  if (userScore > peerAverage) {
    scoreComparisonText = `${ageRange} 평균보다\n${scoreDifference}점 높아요`;
  } else if (userScore < peerAverage) {
    scoreComparisonText = `${ageRange} 평균보다\n${scoreDifference}점 낮아요`;
  } else {
    scoreComparisonText = `${ageRange} 평균과 같아요`;
  }

  const getImageForScore = (score: number, average: number) => {
    if (score > average) return highImage;
    if (score < average) return lowImage;
    return evenImage;
  };

  return (
    <Container>
      <TextContainer>{scoreComparisonText}</TextContainer>

      <ImageContainer>
        <Image
          src={getImageForScore(userScore, peerAverage)}
          alt="나의 점수 이미지"
        />
        <Image
          src={getImageForScore(peerAverage, userScore)}
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
        <VsText>VS</VsText> {/* 그래프 사이에 VS 텍스트 */}
        <div>
          <GraphBackground>
            <GraphBar width={`${(peerAverage / 100) * 130}px`} color="#797982">
              <ScoreText>{peerAverage}점</ScoreText>
            </GraphBar>
          </GraphBackground>
        </div>
      </GraphContainer>

      <PercentText>전체 중 상위 {percentRank}%</PercentText>

      {/* 부드러운 꺾은선 그래프 */}
      <ChartContainer>
        <Line data={chartData} options={chartOptions} />
      </ChartContainer>
    </Container>
  );
}

export default AnalysisTab;
