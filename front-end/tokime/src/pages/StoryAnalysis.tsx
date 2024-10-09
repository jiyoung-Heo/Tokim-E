import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import backIcon from '../assets/images/icon/left-actionable.png'; // 뒤로 가기 아이콘
import mailIcon from '../assets/images/mail.png'; // 메일 아이콘

// 스타일 정의
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #f3f7fb;
  display: flex;
  flex-direction: column;
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

const SubTitle = styled.p`
  margin-top: 1vh;
  font-size: 3vw;
  font-weight: 400;
  color: rgba(51, 51, 51, 0.8);
  align-self: flex-start;
  margin-left: 5vw;
`;

const HighlightTitle = styled.h3`
  font-family: 'Pretendard Variable';
  font-weight: 800;
  font-size: 5vw;
  color: #333333;
  margin-top: -1vh;
  align-self: flex-start;
  margin-left: 5vw;
`;

const BackIcon = styled.img`
  margin-right: 2vw;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  width: 90%;
  height: 40vh;
  background: #ffffff;
  border-radius: 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2vh;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const MailIcon = styled.img`
  width: 40vw;
  height: 40vw;
  opacity: 0.5; /* 이미지 투명도 설정 */
`;

const FindButton = styled.button`
  width: 40vw;
  height: 4vh;
  background-color: rgba(0, 201, 156, 0.2);
  border: none;
  border-radius: 10vw;
  color: #00c99c;
  font-size: 3.5vw;
  font-weight: bold;
  margin-top: 3vh;
  cursor: pointer;
`;

const InfoText = styled.p`
  margin-top: 3vh;
  font-size: 3vw;
  font-weight: 400;
  color: rgba(51, 51, 51, 0.8);
  text-align: center;
  line-height: 1.5;
  margin-right: 5vh;
`;

const AnalyzeButton = styled.button`
  width: 90%;
  height: 7vh;
  background-color: #27c384;
  color: #ffffff;
  font-size: 4vw;
  font-weight: bold;
  border: none;
  border-radius: 2vw;
  margin-top: 3vh;
  cursor: pointer;
`;

// 사연 작성 뷰 스타일 정의
const InputContainer = styled.div`
  width: 90%;
  height: 40vh;
  background: #ffffff;
  border-radius: 2vw;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-top: 2vh;
`;

const InputHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2vh 4vw;
`;

const CancelButton = styled.button`
  background: none;
  border: none;
  color: #888;
  font-size: 3vw;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  text-align: left;
  &:hover {
    color: #000;
  }
`;

const CaseTitle = styled.h3`
  font-family: 'Pretendard Variable';
  font-weight: 600;
  font-size: 18px;
  color: #333333;
  left: 50%;
  transform: translateX(-50%);
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid rgba(51, 51, 51, 0.2);
`;

const CaseInput = styled.textarea`
  font-family: 'Pretendard Variable';
  width: 100%;
  height: 70%;
  font-size: 12px;
  font-weight: bold;
  color: #333333;
  border: none;
  padding: 10px;
  box-sizing: border-box;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.button`
  width: 90%;
  height: 7vh;
  background-color: #27c384;
  color: #ffffff;
  font-size: 4vw;
  font-weight: bold;
  border: none;
  border-radius: 2vw;
  margin-top: 3vh;
  cursor: pointer;
`;

const StoryAnalysis = () => {
  const [isWriting, setIsWriting] = useState(false); // 사연 작성 모드인지 여부
  const [caseText, setCaseText] = useState(''); // 사연 입력 내용

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // 뒤로 가기
  };

  // 사연 작성 모드로 변경하는 함수
  const startWriting = () => {
    setIsWriting(true);
  };

  // 사연 제출하는 함수 (작성한 내용은 props로 보내기 위한 준비)
  const submitCase = () => {
    console.log('작성한 사연:', caseText);
    // props로 caseText 내용을 보낼 준비
  };

  // 사연 작성 모드 취소 함수
  const cancelWriting = () => {
    setIsWriting(false); // 사연 작성 모드를 취소하여 원래 화면으로 돌아감
    setCaseText(''); // 입력된 사연 내용 초기화
  };

  return (
    <Container>
      <Title>
        <BackIcon src={backIcon} alt="뒤로 가기 아이콘" onClick={goBack} />
        구매 사연 분석
      </Title>
      {isWriting ? (
        <>
          <SubTitle>내 구매사연과 유사 케이스 찾기</SubTitle>
          <HighlightTitle>유사한 기사 및 판례 불러오기!</HighlightTitle>
          <InputContainer>
            <InputHeader>
              <CancelButton onClick={cancelWriting}>취소</CancelButton>
              <CaseTitle>사연</CaseTitle>
            </InputHeader>
            <Divider />
            <CaseInput
              placeholder="사연을 입력하세요"
              value={caseText}
              onChange={(e) => setCaseText(e.target.value)}
            />
          </InputContainer>
          <InfoText>
            토지 구매 과정에서 있었던 일과 판매 글의 핵심 <br />
            내용을 구체적으로 적어주시면, 관련 기사나 판례를 <br />더 정확하게
            찾아드릴 수 있습니다.
          </InfoText>
          <SubmitButton onClick={submitCase}>사연 제출</SubmitButton>
        </>
      ) : (
        <>
          <SubTitle>내 구매사연과 유사 케이스 찾기</SubTitle>
          <HighlightTitle>유사한 기사 및 판례 불러오기!</HighlightTitle>
          <ImageContainer>
            <MailIcon src={mailIcon} alt="메일 아이콘" />
            <FindButton onClick={startWriting}>기사 및 판례 찾기!</FindButton>
          </ImageContainer>
          <InfoText>
            토지 판매글의 내용과 구매할때
            <br />
            있었던 일에 대한 사연을 적고
            <br />
            비슷했던 기사와 판례를 찾아보세요.
          </InfoText>
          <AnalyzeButton onClick={startWriting}>사연 분석 하기</AnalyzeButton>
        </>
      )}
    </Container>
  );
};

export default StoryAnalysis;
