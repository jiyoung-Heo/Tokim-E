import React, { useState } from 'react';
import styled from 'styled-components';
import Option1Icon from '../assets/images/icon/1.png';
import Option2Icon from '../assets/images/icon/2.png';
import Option3Icon from '../assets/images/icon/3.png';
import Option4Icon from '../assets/images/icon/4.png';
import Tokim1 from '../assets/images/quiz/토킴이1누끼.png';
import Tokim2 from '../assets/images/quiz/토킴이2누끼.png';
import Tokim3 from '../assets/images/quiz/토킴이3누끼.png';
import Tokim4 from '../assets/images/quiz/토킴이4누끼.png';
import Tokim5 from '../assets/images/quiz/토킴이5누끼.png';
import Tokim6 from '../assets/images/quiz/토킴이6누끼.png';
import Tokim7 from '../assets/images/quiz/토킴이7누끼.png';
import Tokim8 from '../assets/images/quiz/토킴이8누끼.png';
import Tokim9 from '../assets/images/quiz/토킴이9누끼.png';
import Tokim10 from '../assets/images/quiz/토킴이10누끼.png';

// 반응형을 위한 컨테이너 스타일
const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  box-sizing: border-box;
`;

// 퀴즈 제목 스타일
const Title = styled.h2`
  font-family: 'Pretendard Variable';
  font-weight: 800;
  font-size: 8vw;
  color: #333333;
  margin-top: 5vh;
  text-align: center;
`;

// 분할선 스타일
const Divider = styled.hr`
  width: 90%;
  border: none;
  border-top: 2px solid #333333;
  margin: 2vh 0;
`;

// 문제 텍스트 스타일
const QuestionText = styled.p`
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 5vw;
  color: #27c384;
  text-align: center;
  margin-top: 3vh;
`;

// 문제 보기와 이미지 전체를 감싸는 컨테이너
const QuizContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  margin-top: 6vh;
  padding: 0 5vw;
`;

// 보기 버튼 컨테이너 스타일
const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-left: 2vh;
`;

// 개별 보기 스타일
const Option = styled.button`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 2vh;
  border: none;
  cursor: pointer;
  font-family: 'Pretendard';
  font-size: 4vw;
  color: #797982;
  text-align: left;
  background-color: transparent;
  word-break: keep-all; /* 단어가 중간에 잘리지 않도록 */
  overflow-wrap: break-word; /* 긴 단어가 있을 때 줄바꿈 처리 */
  white-space: normal; /* 텍스트가 자동으로 줄바꿈 되도록 설정 */
`;

// 번호 아이콘 스타일
const OptionIcon = styled.img`
  width: 8vw;
  height: 8vw;
  max-width: 30px;
  max-height: 30px;
  margin-right: 3vw;
`;

// 문제 옆에 위치한 이미지 스타일
const QuizImage = styled.img<{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  max-width: ${(props) => props.size}px;
  max-height: ${(props) => props.size}px;
`;

const tokimImages = [
  Tokim1,
  Tokim2,
  Tokim3,
  Tokim4,
  Tokim5,
  Tokim6,
  Tokim7,
  Tokim8,
  Tokim9,
  Tokim10,
];

function LandPurchaseQuiz() {
  const questionNumber = 1;
  const [options] = useState([
    { id: 1, text: '0~5도', icon: Option1Icon },
    { id: 2, text: '경사도 ', icon: Option2Icon },
    { id: 3, text: '해당 없음', icon: Option3Icon },
    { id: 4, text: '0~5도', icon: Option4Icon },
  ]);

  const handleOptionClick = (id: number) => {
    console.log(`Option ${id} clicked`);
  };

  // 이미지 크기 계산을 위한 변수
  const imageSize = options.some((option) => option.text.length > 8)
    ? 150
    : 190;

  return (
    <Container>
      <Title>토지 상식 퀴즈</Title>
      <Divider />
      <QuestionText>1. 토지개발이 불가능한 경사도는?</QuestionText>

      <QuizContent>
        {/* 문제 보기들 */}
        <OptionContainer>
          {options.map((option) => (
            <Option
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
            >
              <OptionIcon src={option.icon} alt={`Option ${option.id}`} />
              {option.text}
            </Option>
          ))}
        </OptionContainer>

        {/* 문제에 맞는 이미지 */}
        <QuizImage
          src={tokimImages[questionNumber - 1]}
          size={imageSize}
          alt="Quiz image"
        />
      </QuizContent>
    </Container>
  );
}

export default LandPurchaseQuiz;
