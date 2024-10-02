// LandDetailTab.tsx
import React, { useEffect, useState } from 'react';
import { getSearchLandInfo } from '../../api/landAxios';

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

interface LandDetailTabProps {
  district: string;
  address: string;
}

function LandDetailTab({ district, address }: LandDetailTabProps) {
  const [landDetails, setLandDetails] = useState<LandDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLandDetails = async () => {
      try {
        const data = await getSearchLandInfo(district, address); // 수정된 부분
        if (data) {
          setLandDetails(data); // 데이터를 상태에 저장
        } else {
          setError('데이터를 가져오는 중 오류가 발생했습니다.');
        }
      } catch (err) {
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (district && address) {
      fetchLandDetails();
    }
  }, [district, address]);

  if (loading) {
    return <div>주소를 먼저 입력해주세요.</div>;
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
            <p>면적: {detail.landScale} ㎡</p>
            <p>용도: {detail.landUse}</p>
            <p>용도 상태: {detail.landUseStatus}</p>
            <p>지형: {detail.landGradient}</p>
            <p>도로: {detail.landRoad}</p>
            <p>가격: ㎡당 {detail.landPrice.toLocaleString()} 원</p>
            <p>개발가능성: {detail.landDanger}</p>
          </div>
        ))
      ) : (
        <div>상세 정보가 없습니다.</div>
      )}
    </div>
  );
}

export default LandDetailTab;
