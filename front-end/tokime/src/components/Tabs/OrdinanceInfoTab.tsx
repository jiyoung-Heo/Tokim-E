import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store'; // RootState 경로에 맞게 수정 필요

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
      <h1>지역별 조례정보</h1>
      {ordinances.length > 0 ? (
        <div>
          <h2>{ordinances[currentIndex].lawName}</h2>
          <p>{ordinances[currentIndex].lawContent}</p>
          <p>법령 번호: {ordinances[currentIndex].lawItemNumber}</p>
          <p>용도: {ordinances[currentIndex].lawLandUse}</p>
          <p>지구: {ordinances[currentIndex].lawDistrict}</p>
          <p>
            시행일:{' '}
            {new Date(
              ordinances[currentIndex].lawImplementAt,
            ).toLocaleDateString()}
          </p>
          <div>
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              이전
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={currentIndex === ordinances.length - 1}
            >
              다음
            </button>
          </div>
        </div>
      ) : (
        <p>조례 정보를 불러오는 중입니다...</p>
      )}
    </div>
  );
}

export default OrdinanceInfoTab;
