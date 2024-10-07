import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PulseLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setQuizScore } from '../redux/slices/userSlice'; // 리덕스 액션 가져오기
import userQuizListAxios from '../api/quizListAxios'; // 퀴즈 API 호출
import modifyUserQuizAxios from '../api/modifyUserQuizAxios'; // 퀴즈 점수 수정 API 호출
import Modal from './Modal'; // 모달 컴포넌트 가져오기
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
  align-items: center;
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

const BackIcon = styled.img``;

const Divider = styled.hr`
  width: 90%;
  border: none;
  border-top: 2px solid rgba(121, 121, 130, 0.1);
  margin: 1vh 0; // 상하 여백 추가
`;

const QuestionText = styled.p`
  margin: 1vh 0; // 상하 여백 통일
  font-family: 'KoddiUD OnGothic'; // 폰트 설정
  color: #504644; // 텍스트 색상
  font-size: 1.5rem; // 텍스트 크기 증가
  font-weight: bold; // 글씨 두껍게
  background-color: #f9f9f9; // 배경색 추가
  padding: 2vh; // 내부 여백 추가
  border-radius: 30px; // 모서리 둥글게
  border: 1px solid #ccc; // 테두리 추가
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); // 부드러운 그림자 추가
`;

const QuizContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
  width: 100%;
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1vh 0;
`;

const Option = styled.button<{ isCorrect: boolean; isWrong: boolean }>`
  display: flex;
  align-items: center;
  padding: 2px;
  margin-bottom: 5vh;
  border: none;
  font-family: 'KoddiUD OnGothic';
  font-size: 5.5vw;
  font-weight: bold;
  text-align: left;
  border-radius: 20px;
  background-color: ${({ isCorrect, isWrong }) => {
    if (isCorrect) return '#27c384'; // 정답일 때 초록색
    if (isWrong) return '#ff6b6b'; // 오답일 때 빨간색
    return 'transparent'; // 기본 투명 배경
  }};
  color: ${({ isCorrect, isWrong }) =>
    isCorrect || isWrong ? '#fff' : '#797982'};
  transition:
    background-color 0.6s ease,
    transform 0.2s ease;
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

const TextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto; // 자동 높이 조정
  width: 80%; // 반응형 너비
  max-width: 200px; // 최대 너비 설정
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  font-family: 'Pretendard', sans-serif;
  color: #333;
  font-size: 1.2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;
`;

const SpinnerPlace = styled.div`
  display: flex;
  justify-content: center; // 가로 가운데 정렬
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
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 여부
  const [finalScore, setFinalScore] = useState(0); // 최종 점수 저장
  const dispatch = useDispatch();
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null); // 피드백 메시지 상태
  const [correctAnswers, setCorrectAnswers] = useState(0);
  useEffect(() => {
    const fetchQuizzes = async () => {
      const data = await userQuizListAxios();
      if (data) {
        setQuizzes(data); // 백엔드에서 20개의 퀴즈를 받음
      }
    };
    const preloadImages = (imageArray: string[]) => {
      imageArray.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    };

    fetchQuizzes();
    preloadImages(tokimImages);
  }, []);

  const goBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const openModal = (score: number, correctCount: number) => {
    setFinalScore(score);
    setCorrectAnswers(correctAnswersCount);
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  const handleOptionClick = (id: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(id); // 선택된 답변 설정
      const correctAnswer = quizzes[currentQuizIndex].answerNumber;
      setShowCorrectAnswer(true);

      if (id === correctAnswer) {
        setCorrectAnswersCount(correctAnswersCount + 1); // 맞은 개수 증가
        setFeedbackMessage('정답입니다! 당신은 땅천재!');
      } else {
        setFeedbackMessage('진짜 "땅"을 사시려는거죠?');
      }

      // 다음 문제로 넘어가기
      setTimeout(() => {
        setShowCorrectAnswer(false);
        setFeedbackMessage(null);
        if (currentQuizIndex < quizzes.length - 1) {
          setCurrentQuizIndex(currentQuizIndex + 1);
        } else {
          // 퀴즈가 종료되었을 때
          const computedFinalScore =
            (correctAnswersCount + (id === correctAnswer ? 1 : 0)) * 5; // 점수는 맞은 개수 * 5

          // 퀴즈 점수 리덕스 상태에 저장
          dispatch(setQuizScore(computedFinalScore));

          // 점수 수정 요청 API 호출
          modifyUserQuizAxios(computedFinalScore)
            .then((updatedScore) => {
              console.log(`서버에 점수 업데이트 완료: ${updatedScore}`);
            })
            .catch((e) => {
              console.error('점수 업데이트 실패:', e);
            });

          openModal(
            computedFinalScore,
            correctAnswersCount + (id === correctAnswer ? 1 : 0),
          ); // 모달 열기
        }
        setSelectedAnswer(null); // 선택된 답변 초기화
      }, 1300); // 1초 후 다음 문제로
    }
  };

  if (quizzes.length === 0) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // 화면 전체 높이
        }}
      >
        <div>
          <h2>퀴즈 로딩 중...</h2>
          <SpinnerPlace>
            <PulseLoader color="#00c99c" size={25} />
          </SpinnerPlace>
        </div>
      </div>
    );
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
        {/* QuizImage와 TextBox를 나란히 배치 */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <QuizImage
            src={tokimImages[questionNumber - 1]} // 미리 불러온 이미지 배열 사용
            size={150}
            alt="Quiz image"
          />
          <TextBox>{feedbackMessage}</TextBox>
        </div>
      </QuizContent>

      {/* 모달 렌더링 */}
      {isModalOpen && (
        <Modal
          message={`축하합니다 ! ${finalScore}점입니다 !`}
          score={finalScore}
          correctAnswers={correctAnswers}
          totalQuestions={quizzes.length}
          feedbackMessage={feedbackMessage || ''}
          onClose={closeModal}
          onRetry={() => {
            // 퀴즈를 처음부터 다시 시작하는 로직
            setCurrentQuizIndex(0);
            setCorrectAnswersCount(0);
            setIsModalOpen(false);
            setQuizzes([]); // 퀴즈 데이터 초기화 필요시
            // fetchQuizzes()를 호출하여 퀴즈를 다시 가져올 수 있음
          }}
          onGoToResults={() => navigate('/LandScorePage')} // 결과 페이지로 이동
        />
      )}
    </Container>
  );
}

export default LandPurchaseQuiz;
