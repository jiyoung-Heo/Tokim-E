import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSearchLandInfo } from '../../api/landAxios'; // 실제 경로를 확인하여 수정하세요.

interface LandInfo {
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

interface LandInformationRegistrationTabProps {
  onNext: () => void;
}

function LandInformationRegistrationTab({
  onNext,
}: LandInformationRegistrationTabProps) {
  const navigate = useNavigate();
  const [address, setAddress] = useState(''); // 선택된 주소를 저장할 상태
  const [landInfo, setLandInfo] = useState<LandInfo | null>(null); // API 응답을 저장할 상태

  const handleCancel = () => {
    console.log('Cancel button clicked, navigating to /investment');
    navigate('/investment');
  };

  const handleAddressSearch = () => {
    console.log('Address search initiated');
    // @ts-ignore
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        console.log('Address search completed:', data);

        // 전체 주소 생성
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
            console.log('Added bname to extraAddress:', extraAddress);
          }
          if (data.buildingName !== '') {
            extraAddress +=
              (extraAddress !== '' ? ', ' : '') + data.buildingName;
            console.log('Added buildingName to extraAddress:', extraAddress);
          }
          fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        console.log('Full address constructed:', fullAddress);
        setAddress(fullAddress); // 선택된 주소 설정

        // 주소에서 구역과 상세 주소 추출하기
        const addressParts = fullAddress.split(' ');
        const district = addressParts[2];
        const addressDetail = addressParts.slice(3).join(' ');

        // API 호출
        getSearchLandInfo(district, addressDetail)
          .then((response: LandInfo[]) => {
            // 응답에서 첫 번째 항목을 저장
            setLandInfo(response[0] || null);
            console.log('Land information:', response[0]);
          })
          .catch((error: Error) => {
            console.error('Error fetching land information:', error);
          });
      },
    }).open();
  };

  return (
    <div>
      <h3>토지 정보 등록</h3>
      <div style={{ marginBottom: '20px' }}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="address">주소</label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            id="address"
            type="text"
            value={address}
            readOnly
            placeholder="주소를 검색하세요"
            style={{
              width: '300px',
              padding: '8px',
              marginRight: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <button
            type="button"
            onClick={handleAddressSearch}
            style={{
              padding: '8px 12px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            주소 검색
          </button>
        </div>
      </div>

      {landInfo && (
        <div>
          <h4>토지 정보</h4>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p>용도: {landInfo.landUse}</p>
            <p>용도 상태: {landInfo.landUseStatus}</p>
            <p>지형: {landInfo.landGradient}</p>
            <p>도로: {landInfo.landRoad}</p>
            <p>가격 ㎡당: {landInfo.landPrice.toLocaleString()} 원</p>
            <p>개발가능성: {landInfo.landDanger}</p>
          </div>
        </div>
      )}

      <div>
        <button type="button" onClick={handleCancel}>
          취소
        </button>
        <button
          type="button"
          onClick={() => {
            console.log('Next button clicked');
            onNext();
          }}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default LandInformationRegistrationTab;
