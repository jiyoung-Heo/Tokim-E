import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #f3f7fb;
`;

const StyledTextInput = styled.textarea`
  height: 50vh;
  width: 100%;
  border: 1px solid #ccc; /* Add border */
  border-radius: 5px; /* Rounded corners */
  padding: 10px; /* Padding inside the input */
  margin-bottom: 20px; /* Space below the input */
  font-size: 16px; /* Text size */
  background-color: #00000; /* Background color */
  resize: none; /* Disable resizing */
`;

const RegistContainer = styled.div`
  display: flex;
  justify-content: right;
`;

// 투자 예정지 등록 버튼 스타일
const RegisterButton = styled.button`
  padding: 1.5vh 5vw;
  background-color: #27c384;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  z-index: 800; /* z-index 추가 */
  margin-top: 3vh;
  font-size: 15px;
  margin: 3vh 2vw 0 2vw;
`;

interface StoryWritingRegistrationTabProps {
  story: string;
  setStory: React.Dispatch<React.SetStateAction<string>>;
  onRegister: () => void; // 다음 버튼을 위한 prop 타입 정의
  onPrevious: () => void; // 이전 버튼을 위한 prop 타입 정의
}

function StoryWritingRegistrationTab({
  story,
  setStory,
  onPrevious,
  onRegister,
}: StoryWritingRegistrationTabProps) {
  return (
    <Container>
      <p>
        땅을 사려는 이유, 땅을 소개받은 경위 등 자세하게 입력할수록 좋아요
        등등등 뭐라고 써야할지모르겠으니까 일단 임시로이렇게써두겠어
        이정도길이면 될까요?
      </p>
      <StyledTextInput
        placeholder="사연을 입력하세요."
        value={story}
        onChange={(e) => setStory(e.target.value)} // Update state on change
      />
      <RegistContainer>
        <RegisterButton onClick={onPrevious}>이전</RegisterButton>
        <RegisterButton onClick={onRegister}>등록</RegisterButton>
      </RegistContainer>
    </Container>
  );
}

export default StoryWritingRegistrationTab;
