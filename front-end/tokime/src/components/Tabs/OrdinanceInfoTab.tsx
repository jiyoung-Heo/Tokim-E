import styled, { css } from 'styled-components';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSwipeable } from 'react-swipeable';
import { RootState } from '../../redux/store'; // RootState 경로에 맞게 수정 필요
import LoadingSpinner from '../layouts/LoadingSpinner';
import nodataimg from '../../assets/images/Tokimlogo.png';
import { setLandDetail } from '../../redux/slices/landInfoSlice';
import { setLawInfo } from '../../redux/slices/lawInfoSlice';

// 스타일 정의
const LawInfoContainer = styled.div`
  height: 20vh;
  background: #ffffff;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 15px;
  box-sizing: border-box;
  overflow-y: auto;
  margin-bottom: 3vh;
`;

const LawDetailContainer = styled.div`
  height: 30vh;
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

const PaginationContainer = styled.div`
  position: absolute;
  bottom: 15vh;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1vw;
`;

const SlideButton = styled.button`
  position: absolute;
  top: 48%;
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

const NoDataMessage = styled.div`
  color: #27c384; // 원하는 색상
  font-weight: bold; // 볼드체
  font-size: 1.5em; // 폰트 크기
  margin-top: 10px; // 위쪽 여백
  text-align: center; // 중앙 정렬
`;

const Dot = styled.div<{ active: boolean }>`
  width: 2.5vw;
  height: 2.5vw;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? '#00C99C' : '#ddd')};
  transition:
    width 0.3s ease-in-out,
    height 0.3s ease-in-out;

  ${(props) =>
    props.active &&
    css`
      width: 2.5vw;
      height: 2.5vw;
    `}
`;

const LeftButton = styled(SlideButton)`
  left: 3vw;
  color: #00c99c;
`;

const RightButton = styled(SlideButton)`
  right: 3vw;
  color: #00c99c;
`;

function OrdinanceInfoTab({
  setActiveTab,
}: {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) {
  const dispatch = useDispatch();
  const ordinances = useSelector((state: RootState) => state.lawInfo.lawInfos); // 법령 정보 가져오기
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // error 상태 변수 이름 변경
  const totalItems = ordinances.length;
  const landDetails = useSelector(
    (state: RootState) => state.landinfo.landDetails,
  );
  const prevLandDetailsRef = useRef(landDetails);
  useEffect(() => {
    // landDetails가 변경되었을 때만 상태를 리셋
    if (landDetails !== prevLandDetailsRef.current) {
      if (landDetails.length > 0) {
        dispatch(setLandDetail(null));
        dispatch(setLawInfo([]));
        setActiveTab('landInfo');
      }
      prevLandDetailsRef.current = landDetails; // 이전 값 업데이트
    }
  }, [landDetails, dispatch, setActiveTab]);

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

  const handleIndexChange = (Index: number) => {
    setCurrentIndex(Index);
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrevious,
    trackMouse: true,
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (errorMessage) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <img
          src={nodataimg}
          alt="No data available"
          style={{ width: '300px', height: 'auto', opacity: 0.85 }} // 이미지 크기와 투명도
        />
        <NoDataMessage>법령 정보가 없습니다.</NoDataMessage>
      </div>
    );
  }

  return (
    <div>
      {ordinances.length > 0 ? (
        <div {...handlers}>
          <h3>{ordinances[currentIndex].lawName}</h3>
          <LawInfoContainer>
            <LawTitle>법령 정보</LawTitle>
            <LawDescription>
              <p>법령 번호: {ordinances[currentIndex].lawItemNumber}</p>
              <p>용도: {ordinances[currentIndex].lawLandUse}</p>
              <p>
                시행일:{' '}
                {new Date(
                  ordinances[currentIndex].lawImplementAt,
                ).toLocaleDateString()}
              </p>
            </LawDescription>
          </LawInfoContainer>
          <LawDetailContainer>
            <LawTitle>법령 본문</LawTitle>
            <LawDescription>
              {ordinances[currentIndex].lawContent}
            </LawDescription>
          </LawDetailContainer>
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
          <PaginationContainer>
            {Array.from({ length: totalItems }, (_, i) => (
              <Dot
                key={i}
                active={i === currentIndex}
                onClick={() => handleIndexChange(i)}
              />
            ))}
          </PaginationContainer>
        </div>
      ) : (
        <p>조례 정보를 불러오는 중입니다...</p>
      )}
    </div>
  );
}

export default OrdinanceInfoTab;
