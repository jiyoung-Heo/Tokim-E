import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// 캐러셀 섹션 스타일 (props로 배경색을 받음)
const CarouselContainer = styled(Link)<{ bgColor: string }>`
  width: 89vw;
  height: 21.56vh;
  background: ${(props) => props.bgColor};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4.17vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2vw;
  margin-top: 5vh;
  text-decoration: none; // 밑줄 제거
`;

// 캐러셀 내용 및 이미지 스타일
const CarouselContent = styled.div`
  color: white;
  font-size: 4.16vw;
  font-weight: 700;
  margin-left: 5.55vw;
  white-space: pre-line;
`;

const CarouselImage = styled.img`
  width: 21.11vw;
  height: 21.11vw;
  margin-right: 5vw;
`;

interface CarouselProps {
  to: string;
  bgColor: string;
  content: string;
  imageSrc: string;
}

const Carousel: React.FC<CarouselProps> = ({
  to,
  bgColor,
  content,
  imageSrc,
}) => {
  return (
    <CarouselContainer to={to} bgColor={bgColor}>
      <CarouselContent>{content}</CarouselContent>
      <CarouselImage src={imageSrc} alt="캐러셀 이미지" />
    </CarouselContainer>
  );
};

export default Carousel;
