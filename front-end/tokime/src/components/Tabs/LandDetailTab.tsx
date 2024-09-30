// LandDetailTab.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface LandDetail {
  landId: string;
  landDistrictCode: number;
  landDistrict: string;
  landAddress: string;
  landAddressName: string;
  landScale: number;
  landUse: string;
  landUseStatus: string;
  landGradient: string;
  landRoad: string;
  landPrice: number;
  landDanger: number;
}

function LandDetailTab() {
  const [landDetails, setLandDetails] = useState<LandDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const district = '덕명동'; // 동 정보를 여기에 넣으세요
  const address = '596-5'; // 지번 정보를 여기에 넣으세요

  useEffect(() => {
    const fetchLandDetails = async () => {
      try {
        const response = await axios.get(
          'https://j11b207.p.ssafy.io/api/land/search',
          {
            params: { district, address },
          },
        );
        console.log(response.data); // 응답 데이터 출력
        setLandDetails(response.data); // 데이터를 상태에 저장
      } catch (err) {
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchLandDetails();
  }, [district, address]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>토지 상세 정보</h2>
      {landDetails.length > 0 ? (
        landDetails.map((detail) => (
          <div key={detail.landId}>
            <h3>
              주소: {detail.landDistrict} {detail.landAddress}
            </h3>
            <p>면적: {detail.landScale} 평</p>
            <p>용도: {detail.landUse}</p>
            <p>용도 상태: {detail.landUseStatus}</p>
            <p>지형: {detail.landGradient}</p>
            <p>도로: {detail.landRoad}</p>
            <p>가격: {detail.landPrice.toLocaleString()} 원</p>
            <p>위험도: {detail.landDanger}</p>
          </div>
        ))
      ) : (
        <div>상세 정보가 없습니다.</div>
      )}
    </div>
  );
}

export default LandDetailTab;
