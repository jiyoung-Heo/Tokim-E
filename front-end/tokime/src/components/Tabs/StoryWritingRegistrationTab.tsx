import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledTextInput = styled.textarea`
  height: 300px; /* Adjust height as needed */
  width: 100%;
  border: 1px solid #ccc; /* Add border */
  border-radius: 5px; /* Rounded corners */
  padding: 10px; /* Padding inside the input */
  margin-bottom: 20px; /* Space below the input */
  font-size: 16px; /* Text size */
  background-color: #00000; /* Background color */
  resize: none; /* Disable resizing */
`;
const RegisterButton = styled.button`
  padding: 10px 20px;
  background-color: #27c384;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #219a6d;
  }
`;
interface StoryWritingRegistrationTabProps {
  onPrevious: () => void; // 이전 버튼을 위한 prop 타입 정의
  onRegister: () => void; // 등록 버튼을 위한 prop 타입 정의
}

function StoryWritingRegistrationTab({
  onPrevious,
  onRegister,
}: StoryWritingRegistrationTabProps) {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const [storyContent, setStoryContent] = useState(''); // State to hold story content

  const handleRegister = () => {
    // axios POST 요청을 보낼 수 있습니다.
    // 추후에 구현할 부분
    navigate('/investment'); // /investment 경로로 이동
  };

  return (
    <div>
      <StyledTextInput
        placeholder="사연을 입력하세요."
        value={storyContent}
        onChange={(e) => setStoryContent(e.target.value)} // Update state on change
      />
      <div style={{ display: 'flex', justifyContent: 'end', gap: '10px' }}>
        <RegisterButton>이전</RegisterButton>
        <RegisterButton onClick={handleRegister}>등록</RegisterButton>
      </div>
    </div>
  );
}

export default StoryWritingRegistrationTab;
