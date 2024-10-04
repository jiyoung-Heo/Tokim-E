import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSearchLandInfo } from '../../api/landAxios'; // Adjust this path as necessary.

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

const LandInfoField: React.FC<{
  label: string;
  value: string | number | undefined;
}> = ({ label, value }) => (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
    <span style={{ flex: 1 }}>{label}:</span>
    <span
      style={{
        flex: 2,
        boxSizing: 'border-box',
        width: '253.81px',
        height: '30px',
        background: '#FFFFFF',
        border: '1px solid #000000',
        borderRadius: '10px',
        padding: '5px',
      }}
    >
      {value}
    </span>
  </div>
);

function LandInformationRegistrationTab({
  onNext,
}: LandInformationRegistrationTabProps) {
  const navigate = useNavigate();
  const [address, setAddress] = useState(''); // Selected address state
  const [landInfo, setLandInfo] = useState<LandInfo | null>(null); // API response state
  const [expectedArea, setExpectedArea] = useState<number | ''>(''); // State for expected area
  const [expectedPrice, setExpectedPrice] = useState<number | ''>(''); // State for expected price

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

        // Construct full address
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
        setAddress(fullAddress); // Set selected address

        // Extract district and detailed address
        const addressParts = fullAddress.split(' ');
        const district = addressParts[2];
        const addressDetail = addressParts.slice(3).join(' ');

        // API call
        getSearchLandInfo(district, addressDetail)
          .then((response: LandInfo[]) => {
            // Save the first item from the response
            setLandInfo(response[0] || null);
            console.log('Land information:', response[0]);
          })
          .catch((error: Error) => {
            console.error('Error fetching land information:', error);
          });
      },
    }).open();
  };

  const handleNext = () => {
    // Validation check
    if (!address) {
      alert('주소를 입력하세요.'); // Alert for missing address
      return;
    }
    if (expectedArea === '') {
      alert('투자예정평수를 입력하세요.'); // Alert for missing expected area
      return;
    }
    if (expectedPrice === '') {
      alert('투자예정가격을 입력하세요.'); // Alert for missing expected price
      return;
    }

    console.log('Next button clicked');
    onNext();
  };

  return (
    <div>
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
        <div style={{ marginTop: '20px' }}>
          <h4>토지 정보</h4>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '10px',
            }}
          >
            {/* Use LandInfoField for each property */}
            <LandInfoField label="용도" value={landInfo.landUse} />
            <LandInfoField label="용도 상태" value={landInfo.landUseStatus} />
            <LandInfoField label="지형" value={landInfo.landGradient} />
            <LandInfoField label="도로" value={landInfo.landRoad} />
            <LandInfoField
              label="가격 ㎡당"
              value={`${landInfo.landPrice.toLocaleString()} 원`}
            />
            <LandInfoField label="개발가능성" value={landInfo.landDanger} />
          </div>
        </div>
      )}

      {/* New input fields for expected area and price */}
      <div style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="expectedArea">투자예정평수</label>
          <input
            id="expectedArea"
            type="number"
            min="0" // Minimum value set to 0
            value={expectedArea}
            onChange={(e) => {
              const value = Number(e.target.value);
              setExpectedArea(value >= 0 ? value : ''); // Only allow non-negative numbers
            }}
            placeholder="예: 100"
            style={{
              width: '300px',
              padding: '8px',
              marginLeft: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="expectedPrice">투자예정가격</label>
          <input
            id="expectedPrice"
            type="number"
            min="0" // Minimum value set to 0
            value={expectedPrice}
            onChange={(e) => {
              const value = Number(e.target.value);
              setExpectedPrice(value >= 0 ? value : ''); // Only allow non-negative numbers
            }}
            placeholder="예: 50000000"
            style={{
              width: '300px',
              padding: '8px',
              marginLeft: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>
      </div>

      <div>
        <button type="button" onClick={handleCancel}>
          취소
        </button>
        <button
          type="button"
          onClick={handleNext} // Call the new handleNext function
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default LandInformationRegistrationTab;
