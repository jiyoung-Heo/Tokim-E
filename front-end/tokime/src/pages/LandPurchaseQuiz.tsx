import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setQuizScore } from '../redux/slices/userSlice'; // 리덕스 액션 가져오기
import userQuizListAxios from '../api/quizListAxios'; // 퀴즈 API 호출

// 이미지 미리 import
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
import Tokim11 from '../assets/images/quiz/토킴이11누끼.png';
import Tokim12 from '../assets/images/quiz/토킴이12누끼.png';
import Tokim13 from '../assets/images/quiz/토킴이13누끼.png';
import Tokim14 from '../assets/images/quiz/토킴이14누끼.png';
import Tokim15 from '../assets/images/quiz/토킴이15누끼.png';
import Tokim16 from '../assets/images/quiz/토킴이16누끼.png';
import Tokim17 from '../assets/images/quiz/토킴이17누끼.png';
import Tokim18 from '../assets/images/quiz/토킴이18누끼.png';
import Tokim19 from '../assets/images/quiz/토킴이19누끼.png';
import Tokim20 from '../assets/images/quiz/토킴이20누끼.png';

// 필요한 스타일 정의
const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-family: 'Pretendard Variable';
  font-weight: 800;
  font-size: 8vw;
  color: #333333;
  margin-top: 5vh;
  text-align: center;
`;

const Divider = styled.hr`
  width: 90%;
  border: none;
  border-top: 2px solid #333333;
  margin: 2vh 0;
`;

const QuestionText = styled.p`
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 5vw;
  color: #27c384;
  text-align: center;
  margin-top: 3vh;
  max-width: 90%; /* 문제 텍스트의 최대 너비를 제한 */
  white-space: normal; /* 줄바꿈을 정상적으로 처리 */
  word-break: keep-all; /* 단어 중간에 줄바꿈 금지 */
  overflow-wrap: break-word; /* 단어가 길 때 자동으로 줄바꿈 처리 */
`;

const QuizContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  margin-top: 6vh;
  padding: 0 5vw;
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-left: 2vh;
`;

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
`;

const OptionIcon = styled.img`
  width: 8vw;
  height: 8vw;
  max-width: 30px;
  max-height: 30px;
  margin-right: 3vw;
`;

const QuizImage = styled.img<{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  max-width: ${(props) => props.size}px;
  max-height: ${(props) => props.size}px;
`;

// 아이콘 이미지도 미리 import
const optionIcons = [Option1Icon, Option2Icon, Option3Icon, Option4Icon];

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
  Tokim11,
  Tokim12,
  Tokim13,
  Tokim14,
  Tokim15,
  Tokim16,
  Tokim17,
  Tokim18,
  Tokim19,
  Tokim20,
];

// 퀴즈 컴포넌트
function LandPurchaseQuiz() {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0); // 맞은 개수
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchQuizzes = async () => {
      const data = await userQuizListAxios();
      if (data) {
        setQuizzes(data); // 백엔드에서 20개의 퀴즈를 받음
      }
    };

    fetchQuizzes();
  }, []);

  const handleOptionClick = (id: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(id); // 선택된 답변 설정
      const correctAnswer = quizzes[currentQuizIndex].answerNumber;
      if (id === correctAnswer) {
        setCorrectAnswersCount(correctAnswersCount + 1); // 맞은 개수 증가
      }

      // 다음 문제로 넘어가기
      setTimeout(() => {
        if (currentQuizIndex < quizzes.length - 1) {
          setCurrentQuizIndex(currentQuizIndex + 1);
        } else {
          // 퀴즈가 종료되었을 때
          const finalScore = correctAnswersCount * 5; // 점수는 맞은 개수 * 5
          dispatch(setQuizScore(finalScore)); // 최종 점수 리덕스 상태에 저장
          alert(`퀴즈가 종료되었습니다. 최종 점수: ${finalScore}`);
        }
        setSelectedAnswer(null); // 선택된 답변 초기화
      }, 100); // 1초 후 다음 문제로
    }
  };

  if (quizzes.length === 0) {
    return <div>퀴즈 로딩 중...</div>;
  }

  const currentQuiz = quizzes[currentQuizIndex];
  const questionNumber = currentQuizIndex + 1;

  return (
    <Container>
      <Title>토지 상식 퀴즈</Title>
      <Divider />
      <QuestionText>
        {questionNumber}. {currentQuiz.question}
      </QuestionText>

      <QuizContent>
        {/* 문제 보기들 */}
        <OptionContainer>
          {currentQuiz.selectList.map((option: string, index: number) => (
            <Option
              key={index}
              onClick={() => handleOptionClick(index + 1)}
              style={{
                backgroundColor:
                  selectedAnswer === index + 1 ? '#d1ffd7' : 'transparent',
              }}
            >
              <OptionIcon
                src={optionIcons[index]} // 미리 import한 아이콘 배열 사용
                alt={`Option ${index + 1}`}
              />
              {option}
            </Option>
          ))}
        </OptionContainer>

        {/* 문제에 맞는 이미지 */}
        <QuizImage
          src={tokimImages[questionNumber - 1]} // 미리 불러온 이미지 배열 사용
          size={150}
          alt="Quiz image"
        />
      </QuizContent>
    </Container>
  );
}

export default LandPurchaseQuiz;
