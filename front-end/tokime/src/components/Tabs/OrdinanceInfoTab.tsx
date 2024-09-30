import React, { useEffect, useState } from 'react';

interface Ordinance {
  lawId: number;
  lawName: string;
  lawContent: string;
  lawItemNumber: string;
  lawLandUse: string;
  lawDistrict: number;
  lawImplementAt: string; // ISO 형식의 날짜 문자열
}

function OrdinanceInfoTab() {
  const [ordinances, setOrdinances] = useState<Ordinance[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://j11b207.p.ssafy.io/api/land/bylaw/4833010300',
        );
        const data = await response.json();
        setOrdinances(data);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, []);

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
