import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setQuizScore } from '../redux/slices/userSlice'; // 리덕스 액션 가져오기
import userQuizListAxios from '../api/quizListAxios'; // 퀴즈 API 호출
import modifyUserQuizAxios from '../api/modifyUserQuizAxios'; // 퀴즈 점수 수정 API 호출
import backIcon from '../assets/images/icon/left-actionable.png';

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
  width: 100%;
  height: 100%;
  background: #f3f7fb;
`;

const Title = styled.h2`
  margin: 0 0 3vh 0;
  font-size: 25px;
  font-weight: bold;
  font-family: 'KoddiUD OnGothic';
  color: #333333;
  display: flex;
  justify-content: left;
`;

// 뒤로가기 아이콘 정의
const BackIcon = styled.img``;

const Divider = styled.hr`
  width: 90%;
  border: none;
  border-top: 2px solid rgba(121, 121, 130, 0.1);
`;

const QuestionText = styled.p`
  margin-top: 5vh;
  margin-bottom: 5vh;
  font-family: 'Pretendard';
  font-weight: bold;
  font-size: 6vw;
  color: #27c384;
  white-space: normal;
  // word-break: keep-all;
  // overflow-wrap: break-word;
`;

const QuizContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Option = styled.button<{ isCorrect: boolean; isWrong: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 5vh;
  border: none;
  cursor: pointer;
  font-family: 'Pretendard';
  font-size: 5vw;
  font-weight: bold;
  text-align: left;
  background-color: ${({ isCorrect, isWrong }) => {
    if (isCorrect) return '#27c384'; // 정답일 때 초록색
    if (isWrong) return '#ff6b6b'; // 오답일 때 빨간색
    return 'transparent'; // 기본 투명 배경
  }};
  color: ${({ isCorrect, isWrong }) =>
    isCorrect || isWrong ? '#fff' : '#797982'};
  transition: background-color 0.3s ease;
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
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0); // 맞은 개수
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false); // 정답 확인 여부
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

  const goBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const handleOptionClick = (id: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(id); // 선택된 답변 설정
      const correctAnswer = quizzes[currentQuizIndex].answerNumber;
      setShowCorrectAnswer(true);

      if (id === correctAnswer) {
        setCorrectAnswersCount(correctAnswersCount + 1); // 맞은 개수 증가
      }

      // 다음 문제로 넘어가기
      setTimeout(() => {
        setShowCorrectAnswer(false);
        if (currentQuizIndex < quizzes.length - 1) {
          setCurrentQuizIndex(currentQuizIndex + 1);
        } else {
          // 퀴즈가 종료되었을 때
          const finalScore =
            (correctAnswersCount + (id === correctAnswer ? 1 : 0)) * 5; // 점수는 맞은 개수 * 5

          // 퀴즈 점수 리덕스 상태에 저장
          dispatch(setQuizScore(finalScore));

          // 점수 수정 요청 API 호출
          modifyUserQuizAxios(finalScore)
            .then((updatedScore) => {
              console.log(`서버에 점수 업데이트 완료: ${updatedScore}`);
            })
            .catch((e) => {
              console.error('점수 업데이트 실패:', e);
            });

          alert(`퀴즈가 종료되었습니다. 최종 점수: ${finalScore}`);
        }
        setSelectedAnswer(null); // 선택된 답변 초기화
      }, 1000); // 2초 후 다음 문제로
    }
  };

  if (quizzes.length === 0) {
    return <div>퀴즈 로딩 중...</div>;
  }

  const currentQuiz = quizzes[currentQuizIndex];
  const questionNumber = currentQuizIndex + 1;

  return (
    <Container>
      <Title>
        <BackIcon src={backIcon} alt="back Icon" onClick={goBack} />
        토지 상식 퀴즈
      </Title>
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
              isCorrect={
                showCorrectAnswer && currentQuiz.answerNumber === index + 1
              }
              isWrong={
                showCorrectAnswer &&
                selectedAnswer === index + 1 &&
                selectedAnswer !== currentQuiz.answerNumber
              }
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
