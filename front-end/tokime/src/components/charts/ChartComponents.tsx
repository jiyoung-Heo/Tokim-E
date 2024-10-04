import React from 'react';
import Chart from 'react-apexcharts';

// 각 등급의 상위 퍼센트 비율
const gradePercentages = [4, 7, 11, 17, 20, 17, 11, 7, 4];

// 차트 데이터와 옵션 설정
const getChartData = (scoreList: number[][], userScore: number) => {
  // 점수 리스트를 높은 점수 순으로 정렬
  const sortedScores = [...scoreList].sort(
    ([scoreA], [scoreB]) => scoreB - scoreA, // 점수 기준으로 내림차순 정렬
  );

  const totalScores = sortedScores.reduce((acc, [, count]) => acc + count, 0); // 총 점수 개수

  let accumulatedPercentage = 0;
  const gradeCounts = new Array(9).fill(0);
  let currentGradeIndex = 0;

  sortedScores.forEach(([score, count]) => {
    const percentage = (count / totalScores) * 100;
    accumulatedPercentage += percentage;

    // 상위 퍼센트가 등급 기준 퍼센트를 넘으면 등급을 변경
    while (
      currentGradeIndex < 8 &&
      accumulatedPercentage >
        gradePercentages
          .slice(0, currentGradeIndex + 1)
          .reduce((a, b) => a + b, 0)
    ) {
      currentGradeIndex += 1; // ++ 대신 += 1 사용
    }

    gradeCounts[currentGradeIndex] += count; // 해당 등급에 속하는 점수 개수 누적
  });

  // 유저 점수가 속한 등급 찾기
  const sortedUserIndex = sortedScores.findIndex(
    ([score]) => score === userScore,
  );
  const accumulatedUserPercentage = sortedScores
    .slice(0, sortedUserIndex + 1)
    .reduce((acc, [, count]) => acc + (count / totalScores) * 100, 0);

  let userGradeIndex = 0;
  let accumulatedGradePercentage = 0;

  for (let i = 0; i < gradePercentages.length; i += 1) {
    accumulatedGradePercentage += gradePercentages[i];
    if (accumulatedUserPercentage <= accumulatedGradePercentage) {
      userGradeIndex = i;
      break;
    }
  }

  return {
    series: [
      {
        name: '등급별 빈도', // '점수 분포'를 '등급별 빈도'로 변경
        data: gradeCounts,
      },
    ],
    options: {
      chart: {
        type: 'line' as const,
        height: 60,
        width: 250,
        toolbar: {
          show: false, // 확대나 홈 기능 제거
        },
        zoom: {
          enabled: false, // 확대 기능 비활성화
        },
      },
      xaxis: {
        categories: [
          '1등급',
          '2등급',
          '3등급',
          '4등급',
          '5등급',
          '6등급',
          '7등급',
          '8등급',
          '9등급',
        ], // X축 레이블
        labels: {
          style: {
            fontSize: '10px',
          },
        },
      },
      yaxis: {
        min: 0,
        show: false,
      },
      stroke: {
        curve: 'smooth' as const,
        colors: ['rgba(121, 121, 130, 0.2)'], // 그래프 색상 및 투명도 적용
        width: 5,
      },
      grid: {
        show: false,
      },
      markers: {
        size: [6], // 오직 유저 점수에만 마커 표시
        colors: ['rgba(121, 121, 130)'], // 유저 점수 마커 색상
        strokeColors: 'rgba(121, 121, 130)', // 테두리 색상
        strokeWidth: 1,
        hover: {
          size: 8,
        },
        discrete: [
          {
            seriesIndex: 0,
            dataPointIndex: userGradeIndex, // 나의 점수에만 마커 표시
            fillColor: '#27C384',
            size: 8,
          },
        ],
      },
      tooltip: {
        enabled: true, // 툴팁 활성화
        x: {
          show: true,
        },
        fillSeriesColor: false,
        style: {
          fontSize: '12px',
          fontWeight: 700,
          backgroundColor: 'rgba(121, 121, 130, 0.2)', // 툴팁 배경 색상 설정
        },
        marker: {
          fillColors: ['#27C384'], // 마커 색상 설정
        },
      },
      annotations: {
        points: [
          {
            x: `${userGradeIndex + 1}등급`, // 유저가 속한 등급에 맞는 X축 위치
            seriesIndex: 0,
            marker: {
              size: 8,
              fillColor: '#F3F7FB', // 마커 색상
              strokeColor: '#F3F7FB',
              strokeWidth: 3,
            },
            label: {
              borderColor: '#F3F7FB', // 테두리 색상
              text: `${userScore}점으로 ${userGradeIndex + 1}등급입니다.`,
              style: {
                color: '#000000',
                background: 'rgba(121, 121, 130, 0.2)',
                fontSize: '12px',
                fontWeight: 700, // 텍스트 bold 처리
                whiteSpace: 'pre-line', // 줄바꿈 처리
              },
              offsetY: 30, // Y축에서 그래프와의 간격을 줄임
            },
          },
        ],
      },
    },
  };
};

// 차트 컴포넌트
interface ChartComponentProps {
  scoreList: number[][];
  userScore: number; // 유저 점수
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  scoreList,
  userScore,
}) => {
  const chartData = getChartData(scoreList, userScore);

  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="line"
      height={250} // 차트 높이를 250px로 설정
      width={300} // 차트 너비를 300px로 설정
    />
  );
};

export default ChartComponent;
