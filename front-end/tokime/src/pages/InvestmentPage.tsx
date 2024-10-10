import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import backIcon from '../assets/images/icon/left-actionable.png';
import searchIcon from '../assets/images/icon/search.svg';
import multiply from '../assets/images/icon/Multiply.png'; // x아이콘
import dangerIcon from '../assets/images/icon/dangericon.svg';
import okIcon from '../assets/images/icon/okicon.svg';
import nodataimg from '../assets/images/Tokimlogo.png';
import checklistimg from '../assets/images/icon/checklisticon.svg';

import {
  getAllInvestLand,
  getAllInvestLandFilter,
  deleteInvestDetail,
} from '../api/landInvestAxios';
import { setLandDetail } from '../redux/slices/landInfoSlice';
import { setLawInfo } from '../redux/slices/lawInfoSlice';
import NaverMapProps from '../components/Tabs/NaverMapProps';

// 필요한 스타일 정의
const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #f3f7fb;
`;

const Title = styled.h2`
  margin: 0 0 3vh 0;
  font-size: 25px;
  font-weight: bold;
  font-family: 'KoddiUD OnGothic';
  color: #333333;
  display: flex;
  justify-content: left;
`;

// 뒤로가기 아이콘 정의
const BackIcon = styled.img``;

// 가로선
const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 3px solid rgba(121, 121, 130, 0.1);
  margin: 3vh 0;
`;
// 투자예정지 리스트 박스
const InvestBox = styled.div`
  width: 100%;
  background-color: white; /* 흰색 배경 */
  border-radius: 5px; /* 모서리 둥글게 */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* 약간의 그림자 추가 */
  margin-bottom: 1vh; /* 아래쪽 여백 */
`;

// 전체지역 + 검색창
const SearchContainer = styled.div`
  background-color: #f3f7fb;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 좌우로 공간 분배 */
  margin-bottom: 4vh;
`;

// 지역선택드롭다운시작
const DropdownContainer = styled.div`
  position: relative;
  height: 5vh;
  width: 35%;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  justify-content: center; /* 가로 가운데 정렬 */
  align-items: center; /* 세로 가운데 정렬 */
`;

const DropdownHeader = styled.div`
  color: #27c384;
  font-weight: bold;
  cursor: pointer;
  display: flex;
`;

const DropdownListContainer = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  width: 100%;
  z-index: 1;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-height: 150px;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const DropdownList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const OptGroupLabel = styled.div`
  font-weight: bold;
  padding: 10px;
  color: #27c384;
  background-color: #f3f7fb;
`;
// 지역선택드롭다운
const ListItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f3f7fb;
  }
`;

// 별칭검색상자
const SearchBox = styled.div`
  height: 5vh;
  width: 85vw; /* 너비 조정 */
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding-left: 19px;
`;
// 검색아이콘
const SearchIcon = styled.img`
  width: 5vw;
  height: 5vh;
`;
// x아이콘
const MultiplyIcon = styled.img`
  width: 8vw;
  margin-right: 2vw;
`;
// 별칭검색 인풋박스
const SearchInput = styled.input`
  border: none;
  font-size: 16px;
  font-weight: 700;
  color: #27c384;
  margin-left: 10px;
  width: 100%;
  background: none;
  font-family: 'KoddiUD OnGothic';

  &::placeholder {
    color: rgba(39, 195, 132, 0.5);
  }
  &:focus {
    outline: none;
    color: #27c384;
  }
`;
const Test = styled.div`
  visible: true;
`;
// 투자예정지내역나올 컨테이너
const InvestContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  box-sizing: border-box;
  max-height: 60vh; /* 스크롤을 적용할 최대 높이 */
  overflow-y: auto; /* 수직 스크롤 추가 */
  width: 100%; /* 너비를 100%로 설정 */

  &::-webkit-scrollbar {
    transition: opacity 0.3s; /* 부드러운 전환 효과 */
  }
`;

// 하나의 투자예정지 랩
const InvestWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

// 네이버 지도
const NaverMap = styled.div`
  width: 36.11vw;
  height: 14.19vh;
  background-color: black;
  margin-right: 5vw;
  border-radius: 10px;

  display: block;
  color: #333333;
`;

// 투자예정지 왼쪽 글 정보
const Invest = styled.div`
  width: 60vw;
  display: block;
  font-weight: 700;
  color: #333333;
  text-decoration: none;
  font-family: 'KoddiUD OnGothic';
`;

// 주소
const Address = styled.p`
  margin: 0;
  color: #b48a28;
  font-size: 14px;
  word-break: keep-all; / 단어가 중간에 끊기지 않도록 설정 /
  white-space: normal;
`;

// 별칭
const NickName = styled.p`
  margin: 0;
  font-weight: 900;
  font-family: 'Pretendard';
  font-size: 19px;
  word-break: keep-all; / 단어가 중간에 끊기지 않도록 설정 /
  white-space: normal;
`;

// 위험정도나타내줄곳
const WarningScore = styled.p`
  margin: 0;
  font-size: 14px;
`;

// 투자예정지 오른쪽 맵
const Map = styled.div`
  width: 30vw;
  height: 30vw;
  background-color: yellow;
  margin-right: 5vw;
`;
const RegistContainer = styled.div`
  position: fixed; /* 화면에 고정 */
  bottom: 13vh; /* 화면 아래에서 위로 띄움 */
  right: 5vw; /* 화면 오른쪽에서 왼쪽으로 띄움 */
`;
// 투자 예정지 등록 버튼 스타일
const RegisterButton = styled.button`
  position: fixed; /* 화면에 고정 */
  bottom: 12vh; /* 화면 아래에서 위로 띄움 */
  right: 5vw; /* 화면 오른쪽에서 왼쪽으로 띄움 */
  padding: 1.5vh 5vw;
  background-color: #00c99c;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-family: 'KoddiUD OnGothic';
  font-weight: bold;
  cursor: pointer;
  z-index: 800; /* z-index 추가 */
  margin-top: 3vh;
  font-size: 15px;
  @media (max-width: 360px) {
    font-size: 12px; /* 작은 화면에서 글자 크기 조정 */
  }
  @media (min-width: 361px) and (max-width: 640px) {
    font-size: 14px; /* 중간 화면에서 글자 크기 조정 */
  }
  @media (min-width: 641px) {
    font-size: 15px; /* 큰 화면에서 기본 크기 */
  }
`;

const options = [
  {
    options: [{ value: '전국', label: '전국' }],
  },
  {
    label: '특별시',
    options: [
      { value: '서울시', label: '서울시' },
      { value: '세종시', label: '세종시' },
    ],
  },
  {
    label: '광역시',
    options: [
      { value: '부산광역시', label: '부산광역시' },
      { value: '대구광역시', label: '대구광역시' },
      { value: '인천광역시', label: '인천광역시' },
      { value: '광주광역시', label: '광주광역시' },
      { value: '대전광역시', label: '대전광역시' },
      { value: '울산광역시', label: '울산광역시' },
    ],
  },
  {
    label: '도',
    options: [
      { value: '경기도', label: '경기도' },
      { value: '강원도', label: '강원도' },
      { value: '충청북도', label: '충청북도' },
      { value: '충청남도', label: '충청남도' },
      { value: '전라북도', label: '전라북도' },
      { value: '전라남도', label: '전라남도' },
      { value: '경상북도', label: '경상북도' },
      { value: '경상남도', label: '경상남도' },
      { value: '제주특별자치도', label: '제주도' },
    ],
  },
];
function InvestmentPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchAlias, setSearchAlias] = useState('');
  const [allInvest, setAllInvest] = useState<any[]>([]);
  const [filterInvest, setFilterInvest] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('전국');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (label: string) => {
    setSelectedOption(label);
    setIsOpen(false);
  };

  // 초성 추출 함수 (리스트 형태로 반환)
  const getChosungArray = (word: string) => {
    const CHOSUNG = [
      'ㄱ',
      'ㄲ',
      'ㄴ',
      'ㄷ',
      'ㄸ',
      'ㄹ',
      'ㅁ',
      'ㅂ',
      'ㅃ',
      'ㅅ',
      'ㅆ',
      'ㅇ',
      'ㅈ',
      'ㅉ',
      'ㅊ',
      'ㅋ',
      'ㅌ',
      'ㅍ',
      'ㅎ',
    ];

    return [...word].map((char) => {
      const unicode = char.charCodeAt(0) - 44032; // 한글의 유니코드 시작 값
      if (unicode < 0 || unicode > 11171) return ''; // 유효하지 않은 경우
      const chosungIndex = Math.floor(unicode / 588); // 초성 계산
      return CHOSUNG[chosungIndex]; // 초성 반환
    });
  };

  const filterByChosung = (items: any[], search: string) => {
    const searchChosungs = getChosungArray(search); // 입력된 초성 배열

    return items.filter((invest) => {
      // invest가 유효한지 확인
      if (!invest || typeof invest.landNickname !== 'string') {
        return false; // invest가 유효하지 않거나 landNickname이 문자열이 아닌 경우 필터링
      }

      const { landNickname } = invest; // 비구조화 할당으로 landNickname 가져오기
      const landChosungs = getChosungArray(landNickname); // 토지 이름의 초성 배열

      // 입력된 초성이 landNickname의 초성의 시작 부분에서 정확히 일치하는지 확인
      // searchChosungs.length와 landChosungs.length를 비교하여 길이 체크
      if (searchChosungs.length > landChosungs.length) {
        return false; // 입력된 초성이 더 길면 필터링
      }

      // 초성이 일치하는지 확인
      for (let i = 0; i < searchChosungs.length; i += 1) {
        if (landChosungs[i] !== searchChosungs[i]) {
          return false; // 초성이 일치하지 않으면 필터링
        }
      }

      return true; // 모든 초성이 일치하면 true 반환
    });
  };

  // 등록 버튼 클릭 시 투자 예정지 등록 페이지로 이동
  const handleRegisterClick = () => {
    navigate('/investment-register'); // 투자 예정지 등록 페이지 경로로 이동
  };
  const goBack = () => {
    // navigate(-1); // 이전 페이지로 이동
    navigate('/main');
  };

  useEffect(() => {
    const fetchInvestmentData = async () => {
      const data = await getAllInvestLand();
      if (data) {
        setAllInvest(data);
      }
    };
    fetchInvestmentData();
  }, [navigate]);

  useEffect(() => {
    const fetchInvestmentFilterData = async () => {
      if (selectedOption === '전국') {
        const data = await getAllInvestLand();
        if (data) {
          // console.log(data);
          setAllInvest(data);
        }
      } else {
        const data = await getAllInvestLandFilter(selectedOption);
        if (data) {
          setAllInvest(data);
        }
      }
    };
    fetchInvestmentFilterData();
  }, [selectedOption]);

  useEffect(() => {
    if (searchAlias === '') {
      setFilterInvest(allInvest);
      // 초성만 입력된 검색
    } else {
      // 단어 검색
      setFilterInvest(
        allInvest.filter((invest) => invest.landNickname.includes(searchAlias)),
      );
    }
  }, [allInvest, searchAlias]);

  const handleDetailClick = (detail: any) => {
    // console.log(detail);
    dispatch(setLandDetail(detail));
    // 라우터 이동
    navigate(`/investment-detail/${detail.investmentPlannedLandId}`);
  };

  return (
    <Container>
      <Title>
        <BackIcon src={backIcon} alt="back Icon" onClick={goBack} />
        나의 투자 예정지
      </Title>
      <SearchContainer>
        <SearchBox>
          <SearchIcon src={searchIcon} alt="search" />
          <SearchInput
            type="text"
            placeholder="부지명 검색"
            value={searchAlias}
            onChange={(e) => setSearchAlias(e.target.value)}
          />
          <MultiplyIcon
            src={multiply}
            alt="multiply"
            onClick={() => setSearchAlias('')}
          />
        </SearchBox>
      </SearchContainer>

      <InvestContainer>
        {filterInvest.length > 0 ? (
          filterInvest.map((invest) => (
            <InvestBox key={invest.investmentPlannedLandId}>
              <InvestWrapper>
                <NaverMap>
                  <NaverMapProps landAddress={invest.landAddress} />
                </NaverMap>
                <Invest onClick={() => handleDetailClick(invest)}>
                  <NickName>{invest.landNickname || '부지명 없음'}</NickName>
                  <Address>{invest.landAddress}</Address>
                  <WarningScore>
                    {invest.landDanger === 2 ? (
                      <>
                        <img
                          src={okIcon}
                          alt="중간 위험"
                          style={{ width: '14px', marginRight: '5px' }}
                        />
                        <span style={{ color: '#27c384' }}>안정적인 토지</span>
                      </>
                    ) : invest.landDanger === 0 ? (
                      <>
                        <img
                          src={dangerIcon}
                          alt="높음 위험"
                          style={{ width: '14px', marginRight: '5px' }}
                        />
                        <span style={{ color: 'red' }}>투자에 위험!</span>
                      </>
                    ) : (
                      <>
                        <img
                          src={okIcon}
                          alt="중간 위험"
                          style={{ width: '14px', marginRight: '5px' }}
                        />
                        <span style={{ color: '#27c384' }}>투자에 주의!</span>
                      </>
                    )}
                  </WarningScore>
                  <img
                    src={checklistimg}
                    alt="체크리스트이미지"
                    style={{ width: '14px', marginRight: '5px' }}
                  />
                  <span
                    style={{
                      color:
                        invest.checkedCount === 11
                          ? '#27c384'
                          : invest.checkedCount <= 3
                            ? 'red'
                            : 'inherit',
                    }}
                  >
                    {invest.checkedCount}/11
                  </span>
                </Invest>
              </InvestWrapper>
            </InvestBox>
          ))
        ) : (
          <div>저장한 투자 예정지가 없습니다.</div>
        )}
      </InvestContainer>
      <RegistContainer>
        <RegisterButton onClick={handleRegisterClick}>등록</RegisterButton>
      </RegistContainer>
    </Container>
  );
}

export default InvestmentPage;
