import React from 'react';
import Chart from 'react-apexcharts';

// 차트 데이터와 옵션 설정
const getChartData = (scoreList: number[][]) => {
  const filteredScores = [0, 20, 40, 60, 80, 100].map((targetScore) => {
    const matchedScore = scoreList.find(([score]) => score === targetScore);
    return matchedScore ? matchedScore[1] : 0;
  });

  return {
    series: [
      {
        name: '점수 분포',
        data: filteredScores,
      },
    ],
    options: {
      chart: {
        type: 'line' as const, // 타입 명시적으로 지정
        height: 60,
        width: 250,
      },
      xaxis: {
        categories: ['0점', '20점', '40점', '60점', '80점', '100점'],
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
        curve: 'smooth' as const, // 타입을 명시적으로 'smooth'로 설정
      },
      grid: {
        show: false,
      },
      markers: {
        size: 0,
      },
    },
  };
};

// 차트 컴포넌트
interface ChartComponentProps {
  scoreList: number[][];
}

const ChartComponent: React.FC<ChartComponentProps> = ({ scoreList }) => {
  const chartData = getChartData(scoreList);

  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="line"
      height={250} // 차트 높이를 250px로 설정
      width={350} // 차트 너비를 350px로 설정
    />
  );
};

export default ChartComponent;
