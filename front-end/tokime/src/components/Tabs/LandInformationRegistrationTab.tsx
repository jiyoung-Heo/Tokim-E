import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getSearchLandInfo } from '../../api/landAxios'; // Adjust this path as necessary.
import multiply from '../../assets/images/icon/Multiply.png'; // x아이콘

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

// 필요한 스타일 정의
const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #f3f7fb;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const InputLabel = styled.label`
  font-size: 15px;
  font-weight: bold;
  width: 15%;
`;

const Address = styled.div`
  font-weight: bold;
  width: 55%;
`;

// 버튼 클래스
const SearchButton = styled.button`
  width: 25%;
  padding: 6px 16px;
  background-color: #27c384;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
`;

// x아이콘
const MultiplyIcon = styled.img`
  width: 8vw;
`;

const LandInfoContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  width: 100%;
`;

const LandInfoFieldContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1vh 0;
`;

const LandInfoFieldLabel = styled.span`
  width: 50%;
  font-weight: bold;
  margin-right: 1vh;
  @media (max-width: 768px) {
    margin-bottom: 5px;
  }
`;

const UserSearchInput = styled.input`
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 10px;
  padding: 1vh;
  width: 50%;
  @media (max-width: 768px) {
    width: 100%; /* 전체 너비로 설정 */
  }
`;

// 가로선
const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 3px solid rgba(121, 121, 130, 0.1);
  margin: 3vh 0;
`;

const RegistContainer = styled.div`
  display: flex;
  justify-content: right;
`;

// 투자 예정지 등록 버튼 스타일
const RegisterButton = styled.button`
  padding: 1.5vh 5vw;
  background-color: #27c384;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  z-index: 800; /* z-index 추가 */
  margin-top: 3vh;
  font-size: 15px;
  margin: 3vh 2vw 0 2vw;
`;

function LandInformationRegistrationTab({
  onNext,
}: LandInformationRegistrationTabProps) {
  const navigate = useNavigate();
  const [address, setAddress] = useState(''); // Selected address state
  const [landInfo, setLandInfo] = useState<LandInfo | null>(null); // API response state
  const [expectedArea, setExpectedArea] = useState<number | ''>(''); // State for expected area
  const [expectedPrice, setExpectedPrice] = useState<number | ''>(''); // State for expected price

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
            if (response[0] === undefined) {
              setAddress('');
            } else {
              setLandInfo(response[0] || null);
            }
            console.log('Land information:', response[0]);
          })
          .catch((error: Error) => {
            console.error('Error fetching land information:', error);
          });
      },
    }).open();
  };

  const handleCancel = () => {
    navigate('/investment');
  };

  const handleNext = () => {
    if (!address) {
      // 이거 모달로 바꿔야해요
      alert('주소를 입력하세요.'); // Alert for missing address
      return;
    }
    if (expectedArea === '') {
      // 이거 모달로 바꿔야해요
      alert('투자예정평수를 입력하세요.'); // Alert for missing expected area
      return;
    }
    if (expectedPrice === '') {
      // 이거 모달로 바꿔야해요
      alert('투자예정가격을 입력하세요.'); // Alert for missing expected price
      return;
    }
    onNext();
  };

  return (
    <Container>
      <h3>투자예정지 검색</h3>

      <InputContainer>
        <InputLabel htmlFor="address">주소</InputLabel>
        {address === '' ? (
          <SearchButton type="button" onClick={handleAddressSearch}>
            검색
          </SearchButton>
        ) : (
          <>
            <Address>{address}</Address>
            <SearchButton type="button" onClick={handleAddressSearch}>
              재검색
            </SearchButton>
            <MultiplyIcon
              src={multiply}
              alt="multiply"
              onClick={() => {
                setLandInfo(null);
                setAddress('');
              }}
            />
          </>
        )}
      </InputContainer>
      <InputContainer>
        <InputLabel> </InputLabel>
        {landInfo !== null ? (
          <LandInfoContainer>
            <LandInfoFieldContainer>
              <LandInfoFieldLabel>용도</LandInfoFieldLabel>
              <UserSearchInput value={landInfo.landUse} readOnly />
            </LandInfoFieldContainer>
            <LandInfoFieldContainer>
              <LandInfoFieldLabel>용도 상태</LandInfoFieldLabel>
              <UserSearchInput value={landInfo.landUseStatus} readOnly />
            </LandInfoFieldContainer>
            <LandInfoFieldContainer>
              <LandInfoFieldLabel>지형</LandInfoFieldLabel>
              <UserSearchInput value={landInfo.landGradient} readOnly />
            </LandInfoFieldContainer>
            <LandInfoFieldContainer>
              <LandInfoFieldLabel>도로</LandInfoFieldLabel>
              <UserSearchInput value={landInfo.landRoad} readOnly />
            </LandInfoFieldContainer>
            <LandInfoFieldContainer>
              <LandInfoFieldLabel>가격 ㎡당</LandInfoFieldLabel>
              <UserSearchInput
                value={`${landInfo.landPrice.toLocaleString()} 원`}
                readOnly
              />
            </LandInfoFieldContainer>
            <LandInfoFieldContainer>
              <LandInfoFieldLabel>위험정도</LandInfoFieldLabel>
              <UserSearchInput
                value={
                  landInfo.landDanger === 1
                    ? '중간'
                    : landInfo.landDanger === 2
                      ? '높음'
                      : '낮음'
                }
                readOnly
              />
            </LandInfoFieldContainer>
          </LandInfoContainer>
        ) : (
          <div> </div>
        )}
      </InputContainer>
      <Divider />

      <h3>투자예정지 정보</h3>
      <LandInfoFieldContainer>
        <LandInfoFieldLabel>평수</LandInfoFieldLabel>
        <UserSearchInput
          type="number"
          min="0"
          value={expectedArea === '' ? '' : expectedArea} // 빈 문자열 처리
          onChange={(e) => {
            const value = e.target.value === '' ? '' : Number(e.target.value);
            setExpectedArea(
              typeof value === 'number' && value >= 0 ? value : '',
            ); // 빈 문자열 또는 0 이상인 값만 허용
          }}
          placeholder="예: 100"
        />
      </LandInfoFieldContainer>

      <LandInfoFieldContainer>
        <LandInfoFieldLabel>가격</LandInfoFieldLabel>
        <UserSearchInput
          type="number"
          min="0"
          value={expectedPrice === '' ? '' : expectedPrice} // 빈 문자열 처리
          onChange={(e) => {
            const value = e.target.value === '' ? '' : Number(e.target.value);
            setExpectedPrice(
              typeof value === 'number' && value >= 0 ? value : '',
            ); // 빈 문자열 또는 0 이상인 값만 허용
          }}
          placeholder="예: 50000000"
        />
      </LandInfoFieldContainer>
      <RegistContainer>
        <RegisterButton onClick={handleCancel}>취소</RegisterButton>
        <RegisterButton onClick={handleNext}>다음</RegisterButton>
      </RegistContainer>
    </Container>
  );
}

export default LandInformationRegistrationTab;
