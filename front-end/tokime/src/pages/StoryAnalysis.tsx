import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import backIcon from '../assets/images/icon/left-actionable.png'; // 뒤로 가기 아이콘
import mailIcon from '../assets/images/mail.png'; // 메일 아이콘
import { storyRegistAxios } from '../api/storyAxios'; // 사연 제출 API 호출
import LandInformationRegistrationModal from '../components/modals/LandInformationRegistrationModal';

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
  margin-top: -2vh;
  margin-bottom: -2vh;
`;

const CancelButton = styled.button`
  background: none;
  border: none;
  color: #888;
  font-size: 3vw;
  font-weight: 600;
  cursor: pointer;
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
  margin-right: 40vw;
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
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [success, setSuccess] = useState(false); // 성공 메시지 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const goBack = () => {
    navigate('/main'); // 뒤로 가기
  };

  // 사연 작성 모드로 변경하는 함수
  const startWriting = () => {
    setIsWriting(true);
  };

  // 사연 제출하는 함수
  const submitCase = async () => {
    if (caseText.trim().length === 0) {
      setIsModalOpen(true); // 모달 열기
      return;
    }

    setLoading(true);
    const response = await storyRegistAxios(caseText); // 사연을 제출하는 API 호출
    setLoading(false);

    if (response) {
      setSuccess(true); // 성공 상태 설정
      console.log('사연 제출 성공:', response);
      navigate('/story-analysis/:result'); // 사연 제출 후 이동
    } else {
      console.log('사연 제출 실패');
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  //
  // 사연 작성 모드 취소 함수
  const cancelWriting = () => {
    setIsWriting(false); // 사연 작성 모드를 취소하여 원래 화면으로 돌아감
    setCaseText(''); // 입력된 사연 내용 초기화
    setSuccess(false); // 성공 상태 초기화
  };

  // 3000자 제한 함수
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= 3000) {
      setCaseText(text);
    }
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
              placeholder="사연을 입력하세요. (최대 3000자)"
              value={caseText}
              onChange={handleTextChange} // 3000자 제한 처리
            />
          </InputContainer>
          <InfoText>
            토지 구매 과정에서 있었던 일과 판매 글의 핵심 <br />
            내용을 구체적으로 적어주시면, 관련 기사나 판례를 <br />더 정확하게
            찾아드릴 수 있습니다.
          </InfoText>
          <SubmitButton onClick={submitCase} disabled={loading}>
            {loading ? '제출 중...' : '사연 제출'}
          </SubmitButton>
          {success && <p>사연 제출 성공!</p>}
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
      {/* 모달 컴포넌트 렌더링 */}
      {isModalOpen && (
        <LandInformationRegistrationModal
          message="사연을 작성해 주세요."
          onClose={closeModal}
        />
      )}
    </Container>
  );
};

export default StoryAnalysis;
