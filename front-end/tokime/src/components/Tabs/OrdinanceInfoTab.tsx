import React, { useEffect, useState } from 'react';
import { getLandLawInfo, getSearchLandInfo } from '../../api/landAxios';

interface Ordinance {
  lawId: number;
  lawName: string;
  lawContent: string;
  lawItemNumber: string;
  lawLandUse: string;
  lawDistrict: number;
  lawImplementAt: string; // ISO 형식의 날짜 문자열
}

interface OrdinanceInfoTabProps {
  district: string;
  address: string;
}

function OrdinanceInfoTab({ district, address }: OrdinanceInfoTabProps) {
  const [ordinances, setOrdinances] = useState<Ordinance[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // error 상태 변수 이름 변경

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. 토지 정보를 가져옵니다.
        const landInfo = await getSearchLandInfo(district, address);

        if (landInfo) {
          // 2. 가져온 데이터 중 landDistrictCode를 사용하여 조례 정보를 가져옵니다.
          const landDistrictCode = landInfo[0]?.landDistrictCode; // 첫 번째 요소의 landDistrictCode를 사용

          if (landDistrictCode) {
            const lawData = await getLandLawInfo(landDistrictCode.toString());
            setOrdinances(lawData); // 조례 정보 저장
          } else {
            setErrorMessage('해당 지역의 법령 정보가 없습니다.'); // 에러 메시지 상태 업데이트
          }
        } else {
          setErrorMessage('토지 정보를 가져오는 중 오류 발생');
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
        setErrorMessage('데이터를 가져오는 중 오류 발생'); // 에러 메시지 상태 업데이트
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [district, address]);

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
