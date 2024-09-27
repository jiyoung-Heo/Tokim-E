import React from 'react';
import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';
import { ApexOptions } from 'apexcharts'; // ApexOptions 타입을 import
import landImage from '../../assets/images/score/land.png';
import sproutImage from '../../assets/images/score/sprout.png';
import treeImage from '../../assets/images/score/tree.png';
import forestImage from '../../assets/images/score/forest.png';

// 게이지 바 전체를 감싸는 컨테이너
const GaugeWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 이미지가 들어갈 중앙 영역
const CenteredImage = styled.img`
  position: absolute;
  width: 40px;
  height: 40px;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

interface GaugeGraphProps {
  score: number;
}

// 점수에 따라 이미지를 반환하는 함수
const getScoreImage = (score: number) => {
  if (score <= 25) return landImage;
  if (score <= 50) return sproutImage;
  if (score <= 75) return treeImage;
  return forestImage;
};

const GaugeGraph: React.FC<GaugeGraphProps> = ({ score }) => {
  const chartOptions: ApexOptions = {
    chart: {
      type: 'radialBar',
      offsetY: -20,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: '#e7e7e7',
          strokeWidth: '100%', // 트랙의 선 굵기
          margin: 10,
        },
        dataLabels: {
          show: false, // 점수 텍스트 표시 안 함
        },
      },
    },
    stroke: {
      lineCap: 'round', // 둥근 끝 설정
      width: 5, // 선의 굵기
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91],
        colorStops: [
          {
            offset: 0,
            color: '#00C99C',
            opacity: 1,
          },
        ],
      },
    },
    labels: ['Score'],
  };

  const series = [score];

  return (
    <GaugeWrapper>
      {/* 게이지 그래프 */}
      <ReactApexChart
        options={chartOptions}
        series={series}
        type="radialBar"
        height={250} /* 그래프 크기 조정 */
      />
      {/* 중앙 이미지 */}
      <CenteredImage src={getScoreImage(score)} alt="점수 이미지" />
    </GaugeWrapper>
  );
};

export default GaugeGraph;
