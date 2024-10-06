import React, { useState } from 'react';
import styled from 'styled-components';
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

// 버튼 클래스
const Button = styled.button`
  padding: 6px 16px;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  margin-top: vh;

  @media (max-width: 768px) {
    padding: 5px 10px;
    font-size: 15px;
  }
`;

// 다음 버튼
const NextButton = styled(Button)`
  background-color: #27c384;
  font-size: 4.5vw;
`;

// 취소 버튼
const CancelButton = styled(Button)`
  background-color: rgb(255, 0, 0);
  font-size: 4.5vw;
`;

const LandInfoFieldContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LandInfoFieldLabel = styled.span`
  flex: 1;
  @media (max-width: 768px) {
    margin-bottom: 5px;
  }
`;

const LandInfoFieldValue = styled.span`
  flex: 2;
  box-sizing: border-box;
  width: 253.81px;
  height: 30px;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 10px;
  padding: 5px;

  @media (max-width: 768px) {
    width: 100%; /* 전체 너비로 설정 */
  }
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
  display: flex; /* Flexbox 추가 */
  align-items: center; /* 수직 중앙 정렬 */
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;

  @media (max-width: 768px) {
    margin-left: 0; /* 왼쪽 여백 제거 */
  }
`;

const ButtonContainer = styled.div`
  @media (max-width: 768px) {
    flex-direction: column; /* 세로 방향으로 변경 */
    gap: 5px; /* 간격 조정 */
  }
`;

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
      <InputContainer>
        <InputLabel htmlFor="address">주소</InputLabel>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Input
            id="address"
            type="text"
            value={address}
            readOnly
            placeholder="주소를 검색하세요"
          />
        </div>
      </InputContainer>
      <NextButton type="button" onClick={handleAddressSearch}>
        검색
      </NextButton>

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
            <LandInfoFieldContainer>
              <LandInfoFieldLabel>용도</LandInfoFieldLabel>
              <LandInfoFieldValue>{landInfo.landUse}</LandInfoFieldValue>
            </LandInfoFieldContainer>
            <LandInfoFieldContainer>
              <LandInfoFieldLabel>용도 상태</LandInfoFieldLabel>
              <LandInfoFieldValue>{landInfo.landUseStatus}</LandInfoFieldValue>
            </LandInfoFieldContainer>
            <LandInfoFieldContainer>
              <LandInfoFieldLabel>지형</LandInfoFieldLabel>
              <LandInfoFieldValue>{landInfo.landGradient}</LandInfoFieldValue>
            </LandInfoFieldContainer>
            <LandInfoFieldContainer>
              <LandInfoFieldLabel>도로</LandInfoFieldLabel>
              <LandInfoFieldValue>{landInfo.landRoad}</LandInfoFieldValue>
            </LandInfoFieldContainer>
            <LandInfoFieldContainer>
              <LandInfoFieldLabel>가격 ㎡당</LandInfoFieldLabel>
              <LandInfoFieldValue>
                {`${landInfo.landPrice.toLocaleString()} 원`}
              </LandInfoFieldValue>
            </LandInfoFieldContainer>
            <LandInfoFieldContainer>
              <LandInfoFieldLabel>개발가능성</LandInfoFieldLabel>
              <LandInfoFieldValue>{landInfo.landDanger}</LandInfoFieldValue>
            </LandInfoFieldContainer>
          </div>
        </div>
      )}

      {/* New input fields for expected area and price */}
      <InputContainer>
        <InputLabel htmlFor="expectedArea">투자예정평수</InputLabel>
        <Input
          id="expectedArea"
          type="number"
          min="0" // Minimum value set to 0
          value={expectedArea}
          onChange={(e) => {
            const value = Number(e.target.value);
            setExpectedArea(value >= 0 ? value : ''); // Only allow non-negative numbers
          }}
          placeholder="예: 100"
        />
      </InputContainer>
      <InputContainer>
        <InputLabel htmlFor="expectedPrice">투자예정가격</InputLabel>
        <Input
          id="expectedPrice"
          type="number"
          min="0" // Minimum value set to 0
          value={expectedPrice}
          onChange={(e) => {
            const value = Number(e.target.value);
            setExpectedPrice(value >= 0 ? value : ''); // Only allow non-negative numbers
          }}
          placeholder="예: 50000000"
        />
      </InputContainer>

      <ButtonContainer>
        <CancelButton type="button" onClick={handleCancel}>
          취소
        </CancelButton>
        <NextButton type="button" onClick={handleNext}>
          다음
        </NextButton>
      </ButtonContainer>
    </div>
  );
}

export default LandInformationRegistrationTab;
