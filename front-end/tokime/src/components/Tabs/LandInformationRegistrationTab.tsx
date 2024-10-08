import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { getSearchLandInfo } from '../../api/landAxios'; // Adjust this path as necessary.
import multiply from '../../assets/images/icon/Multiply.png'; // x아이콘
import Modal from '../modals/LandInformationRegistrationModal';

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
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  landInfo: LandInfo | null;
  setLandInfo: React.Dispatch<React.SetStateAction<LandInfo | null>>;
  expectedArea: number | '';
  setExpectedArea: React.Dispatch<React.SetStateAction<number | ''>>;
  expectedPrice: number | '';
  setExpectedPrice: React.Dispatch<React.SetStateAction<number | ''>>;
  landNickname: string | '';
  setLandNickname: React.Dispatch<React.SetStateAction<string | ''>>;
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
  justify-content: space-between;
  word-break: keep-all;
  white-space: normal;
`;

const InputLabel = styled.label`
  font-size: 15px;
  font-weight: bold;
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
  text-align: right;
  @media (max-width: 768px) {
    width: 100%; /* 전체 너비로 설정 */
  }
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
  font-size: 15px;
  margin: 0.5vh 2vw 0 2vw;
`;

function LandInformationRegistrationTab({
  address,
  setAddress,
  landInfo,
  expectedArea,
  setExpectedArea,
  expectedPrice,
  setExpectedPrice,
  landNickname,
  setLandNickname,
  setLandInfo,
  onNext,
}: LandInformationRegistrationTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const selectedDetail = location.state?.selectedDetail;
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태 추가
  const maxLandScale = landInfo
    ? Math.floor(landInfo.landScale / 3.3)
    : Number.MAX_SAFE_INTEGER;

  const openModal = (message: string) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (selectedDetail) {
      setAddress(
        `${selectedDetail.landDistrict} ${selectedDetail.landAddress}`,
      );
      setLandInfo(selectedDetail); // selectedDetail이 있을 경우 setLandInfo로 설정
    }
    // 새로 고침이 일어났을 때 selectedDetail을 날림
    const handleBeforeUnload = () => {
      window.history.replaceState({}, document.title); // state에서 selectedDetail을 날림
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [selectedDetail, setLandInfo, setAddress]);

  const handleAddressSearch = () => {
    // @ts-ignore
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        let fullAddress = '';
        if (data.jibunAddress === '') {
          fullAddress = data.autoJibunAddress;
        } else {
          fullAddress = data.jibunAddress;
        }
        setAddress(fullAddress); // Set selected address
        // Extract district and detailed address
        const addressParts = fullAddress.split(' ');
        const district = `${data.sigungu} ${data.bname}`;
        const addressDetail = addressParts.slice(-1)[0];

        // API call
        getSearchLandInfo(district, addressDetail)
          .then((response: LandInfo[]) => {
            // Save the first item from the response
            if (response[0] === undefined) {
              setLandInfo(null);
              setExpectedPrice('');
              setExpectedArea('');
              setErrorMessage('국토교통부에서 세부 정보를 제공하지 않습니다.');
            } else {
              setLandInfo(response[0] || null);
              setExpectedPrice('');
              setExpectedArea('');
              setErrorMessage('');
            }
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
      openModal('주소를 입력하세요.'); // 모달로 변경
      return;
    }
    if (expectedArea === '') {
      openModal('투자예정평수를 입력하세요.'); // 모달로 변경
      return;
    }
    if (expectedPrice === '') {
      openModal('투자예정가격을 입력하세요.'); // 모달로 변경
      return;
    }

    onNext();
  };
  const closeModal = () => {
    setIsModalOpen(false);
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
                setLandNickname('');
                setAddress('');
                setExpectedPrice('');
                setExpectedArea('');
              }}
            />
          </>
        )}
      </InputContainer>
      <LandInfoFieldContainer>
        <LandInfoFieldLabel>부지명</LandInfoFieldLabel>
        <UserSearchInput
          type="string"
          min=""
          value={landNickname === '' ? '' : landNickname} // 빈 문자열 처리
          onChange={(e) => {
            const value = e.target.value === '' ? '' : e.target.value;
            setLandNickname(typeof value === 'string' ? value : ''); // 빈 문자열 또는 0 이상인 정수만 허용, 최대값은 안전한 정수 범위 내
          }}
          placeholder="예: 대전시청"
        />
      </LandInfoFieldContainer>
      <LandInfoFieldContainer>
        <LandInfoFieldLabel>예정 평수</LandInfoFieldLabel>
        <UserSearchInput
          type="number"
          min="1"
          value={expectedArea === '' ? '' : expectedArea} // 빈 문자열 처리
          onChange={(e) => {
            const value = e.target.value === '' ? '' : Number(e.target.value);
            setExpectedArea(
              typeof value === 'number' &&
                value > 0 &&
                value <= maxLandScale &&
                Number.isInteger(value) // 정수인지 확인
                ? value
                : '',
            );
          }}
          placeholder={
            maxLandScale === Number.MAX_SAFE_INTEGER
              ? '구매 예정 평수를 입력하세요.'
              : `최대 입력 가능 값: ${maxLandScale} 평`
          }
        />
      </LandInfoFieldContainer>
      <LandInfoFieldContainer>
        <LandInfoFieldLabel>예정 가격</LandInfoFieldLabel>
        <UserSearchInput
          type="number"
          min="0"
          value={expectedPrice === '' ? '' : expectedPrice} // 빈 문자열 처리
          onChange={(e) => {
            const value = e.target.value === '' ? '' : Number(e.target.value);
            setExpectedPrice(
              typeof value === 'number' &&
                value > 0 &&
                Number.isInteger(value) && // 정수인지 확인
                value <= Number.MAX_SAFE_INTEGER // 최대 안전 정수 범위 확인
                ? value
                : '',
            ); // 빈 문자열 또는 0 이상인 정수만 허용, 최대값은 안전한 정수 범위 내
          }}
          placeholder="예: 50000000"
        />
      </LandInfoFieldContainer>
      <LandInfoFieldContainer>
        <LandInfoFieldLabel>예상 평당가</LandInfoFieldLabel>
        <UserSearchInput
          value={
            Number(expectedArea) > 0 && Number(expectedPrice) > 0
              ? `${Math.floor(Number(expectedPrice) / Number(expectedArea)).toLocaleString()} 원`
              : '값이 없습니다.'
          }
        />
      </LandInfoFieldContainer>
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
            <LandInfoFieldLabel>㎡당 공시지가</LandInfoFieldLabel>
            <UserSearchInput
              value={`${landInfo.landPrice.toLocaleString()} 원`}
              readOnly
            />
          </LandInfoFieldContainer>
          <LandInfoFieldContainer>
            <LandInfoFieldLabel>개발가능성</LandInfoFieldLabel>
            <UserSearchInput
              value={
                landInfo.landDanger === 1
                  ? '보통'
                  : landInfo.landDanger === 2
                    ? '안전'
                    : '주의'
              }
              readOnly
            />
          </LandInfoFieldContainer>
        </LandInfoContainer>
      ) : (
        <div> </div>
      )}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}{' '}
      <RegistContainer>
        <RegisterButton onClick={handleCancel}>취소</RegisterButton>
        <RegisterButton onClick={handleNext}>다음</RegisterButton>
      </RegistContainer>
      {isModalOpen && <Modal message={modalMessage} onClose={closeModal} />}
    </Container>
  );
}

export default LandInformationRegistrationTab;
