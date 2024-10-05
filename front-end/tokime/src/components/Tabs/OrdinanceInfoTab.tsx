import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store'; // RootState 경로에 맞게 수정 필요

// 스타일 정의
const LawContainer = styled.div`
  height: 25vh;
  background: #ffffff;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 15px;
  box-sizing: border-box;
  overflow-y: auto;
  margin-bottom: 3vh;
`;

const LawDescription = styled.div`
  font-family: 'KoddiUD OnGothic';
  font-weight: 400;
  font-size: 4vw;
  line-height: 5vw;
  color: #000000;
`;

const LawTitle = styled.div`
  font-family: 'KoddiUD OnGothic';
  font-weight: 700;
  font-size: 4vw;
  text-align: left;
  color: #333333;
  margin-bottom: 1vh;
`;

const SlideButton = styled.button`
  position: absolute;
  top: 53%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  z-index: 10;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const LeftButton = styled(SlideButton)`
  left: 3vw;
  color: #00c99c;
`;

const RightButton = styled(SlideButton)`
  right: 3vw;
  color: #00c99c;
`;

function OrdinanceInfoTab() {
  const ordinances = useSelector((state: RootState) => state.lawInfo.lawInfos); // 법령 정보 가져오기
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // error 상태 변수 이름 변경

  useEffect(() => {
    if (ordinances.length === 0) {
      setErrorMessage('법령 정보가 없습니다.'); // 에러 메시지 상태 업데이트
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [ordinances]);

  const handleNext = () => {
    if (currentIndex < ordinances.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>; // 상태 업데이트된 에러 메시지 출력
  }

  return (
    <div>
      {ordinances.length > 0 ? (
        <div>
          <h3>{ordinances[currentIndex].lawName}</h3>
          <LawContainer>
            <LawTitle>법령 정보</LawTitle>
            <LawDescription>
              <p>법령 번호: {ordinances[currentIndex].lawItemNumber}</p>
              <p>용도: {ordinances[currentIndex].lawLandUse}</p>
              <p>지구: {ordinances[currentIndex].lawDistrict}</p>
              <p>
                시행일:{' '}
                {new Date(
                  ordinances[currentIndex].lawImplementAt,
                ).toLocaleDateString()}
              </p>
            </LawDescription>
          </LawContainer>
          <LawContainer>
            <LawTitle>법령 본문</LawTitle>
            <LawDescription>
              {ordinances[currentIndex].lawContent}
            </LawDescription>
          </LawContainer>
          <div>
            <LeftButton onClick={handlePrevious} disabled={currentIndex === 0}>
              {'<'}
            </LeftButton>
            <RightButton
              onClick={handleNext}
              disabled={currentIndex === ordinances.length - 1}
            >
              {'>'}
            </RightButton>
          </div>
        </div>
      ) : (
        <p>조례 정보를 불러오는 중입니다...</p>
      )}
    </div>
  );
}

export default OrdinanceInfoTab;
