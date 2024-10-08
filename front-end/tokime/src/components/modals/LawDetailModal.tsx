import React from 'react';
import styled from 'styled-components';
import lawIcon from '../../assets/images/icon/law.png'; // 아이콘 경로 확인 필요

// Ordinance 타입 정의
interface Ordinance {
  lawName: string;
  lawItemNumber: string;
  lawContent: string;
}

interface LawDetailModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  ordinance: Ordinance;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: #ffffff;
  width: 85vw; // 반응형으로 너비를 화면 크기의 85%로 설정
  height: 75vh; // 반응형 높이 설정
  border-radius: 10px;
  padding: 4vw; // 반응형 패딩 설정
  position: relative;
`;

const LawHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const LawIcon = styled.img`
  width: 5vw; // 반응형 크기 설정
  height: 5vw; // 반응형 크기 설정
  margin-right: 2vw; // 반응형 간격 설정
`;

const ModalTitle = styled.div`
  font-size: 3.5vw; // 반응형 폰트 크기 설정
  font-weight: bold;
  color: rgba(51, 51, 51, 0.8);
`;

const LawName = styled.div`
  font-size: 4vw; // 반응형 폰트 크기 설정
  font-weight: bold;
  color: #333333;
  text-align: center;
  margin-top: 10px;
  word-break: keep-all;
  white-space: normal;
`;

const Divider = styled.div`
  height: 2px;
  background-color: rgba(121, 121, 130, 0.22);
  margin: 3vw 0; // 반응형 간격 설정
`;

const LawContent = styled.div`
  font-size: 3.5vw; // 반응형 폰트 크기 설정
  font-weight: 400;
  color: #333333;
  white-space: pre-wrap;
  overflow-y: auto;
  max-height: 50vh;
  line-height: 1.5;
  word-break: break-word; // 특수 문자와 이모티콘 포함 줄바꿈 처리
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2vw; // 반응형 설정
  right: 2vw; // 반응형 설정
  background: none;
  border: none;
  font-size: 5vw; // 반응형 크기 설정
  cursor: pointer;
`;

const LawDetailModal: React.FC<LawDetailModalProps> = ({
  isOpen,
  onRequestClose,
  ordinance,
}) => {
  if (!isOpen) return null;

  // 본문 내용에서 이모티콘 또는 특수 문자가 있는 경우 줄바꿈을 강제로 처리하는 함수
  const formatLawContent = (content: string) => {
    const lines = content.split('\n'); // 줄바꿈을 기준으로 분리

    return lines.map((line, index) => {
      // 번호가 포함된 줄에 대한 스타일링 (예: '제 8조', '1.', '2.' 등)
      const isNumbered = /^제\s?\d+조/.test(line) || /^\d+\./.test(line);
      // 특수 문자나 이모티콘 뒤에 줄바꿈을 강제로 추가 (u 플래그 추가)
      const formattedLine = line.replace(
        /([\u2600-\u27BF\uD83C-\uDBFF\uDC00-\uDFFF])/gu,
        '$1<br>',
      );

      return (
        <div
          key={index}
          style={{
            marginBottom: isNumbered ? '10px' : '5px',
            fontWeight: isNumbered ? 'bold' : 'normal',
          }}
          dangerouslySetInnerHTML={{ __html: formattedLine }} // <br> 태그 적용을 위해 innerHTML 사용
        />
      );
    });
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={onRequestClose}>×</CloseButton>
        <LawHeader>
          <LawIcon src={lawIcon} />
          <ModalTitle>법령 정보</ModalTitle>
        </LawHeader>
        <LawName>{ordinance.lawName}</LawName>
        <Divider />
        <LawContent>{formatLawContent(ordinance.lawContent)}</LawContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default LawDetailModal;
