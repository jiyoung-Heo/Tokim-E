import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import backIcon from '../assets/images/icon/left-actionable.png';
import searchIcon from '../assets/images/icon/search.svg';
import multiply from '../assets/images/icon/Multiply.png'; // x아이콘
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
  width: 60%; /* 너비 조정 */
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
    width: 4px;
    transition: opacity 0.3s; /* 부드러운 전환 효과 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(39, 195, 132, 0.5);
    border-radius: 10px;
  }
`;

const InvestList = styled.div`
  align-items: center;
  width: 100%;
`;

// 하나의 투자예정지 랩
const InvestWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 투자예정지 왼쪽 글 정보
const NaverMap = styled.div`
  width: 40vw;
  height: 40vw;
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

  &:hover {
    color: #27c384;
  }
`;

// 별칭
const NickName = styled.p`
  margin: 0;
  margin-bottom: 1vh;
  font-size: 17px;
`;

// 주소
const Address = styled.p`
  margin: 0;
  font-size: 16px;
`;

// 위험정도나타내줄곳
const WarningScore = styled.p`
  margin: 0;
  font-size: 15px;
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
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1vh;
  margin-right: 2vw;
`;

const SmallButton = styled.button`
  padding: 1vh 2vw;
  background-color: ${({ color }) => color || '#27c384'}; // 기본 색상은 초록색
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  z-index: 800;
  font-size: calc(1vw + 1vh);
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
  // 초성 추출 함수
  const getChosung = (word: string) => {
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

    // 자모만 입력된 경우 처리
    if (CHOSUNG.includes(word)) {
      return word; // 초성 리스트에 포함된 자모 그대로 반환
    }

    const unicode = word.charCodeAt(0) - 44032; // 한글의 유니코드 시작 값
    const chosungIndex = Math.floor(unicode / 588); // 초성 계산

    return CHOSUNG[chosungIndex]; // 초성 반환
  };
  // 초성만 입력된 경우인지 확인하는 함수
  const isChosungOnly = (word: string) => {
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

    return [...word].every((char) => CHOSUNG.includes(char));
  };

  // 등록 버튼 클릭 시 투자 예정지 등록 페이지로 이동
  const handleRegisterClick = () => {
    navigate('/investment-register'); // 투자 예정지 등록 페이지 경로로 이동
  };
  const goBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  // 삭제 버튼 클릭 핸들러
  const handleDeleteClick = async (investmentPlannedLandId: String) => {
    const result = await deleteInvestDetail(investmentPlannedLandId);
    if (result) {
      // 삭제 성공 시 filterInvest에서 해당 아이템 제거
      setFilterInvest((prev) =>
        prev.filter(
          (invest) =>
            invest.investmentPlannedLandId !== investmentPlannedLandId,
        ),
      );
    } else {
      console.log('삭제 실패');
    }
  };

  // 수정 버튼 클릭 핸들러
  const handleUpdateClick = (detail: any) => {
    console.log(detail);
    dispatch(setLandDetail(detail));
    // 라우터 이동
    navigate(`/investment-detail/${detail.investmentPlannedLandId}`);
  };

  useEffect(() => {
    const fetchInvestmentData = async () => {
      const data = await getAllInvestLand();
      if (data) {
        setAllInvest(data);
      }
    };
    fetchInvestmentData();
  }, []);

  useEffect(() => {
    const fetchInvestmentFilterData = async () => {
      if (selectedOption === '전국') {
        const data = await getAllInvestLand();
        if (data) {
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
    } else if (isChosungOnly(searchAlias)) {
      setFilterInvest(
        allInvest.filter(
          (invest) =>
            getChosung(invest.landNickname) === getChosung(searchAlias),
        ),
      );
    } else {
      // 단어검색
      setFilterInvest(
        allInvest.filter((invest) => invest.landNickname.includes(searchAlias)),
      );
    }
  }, [allInvest, searchAlias]);

  const handleDetailClick = (detail: any) => {
    console.log(detail);
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
        <DropdownContainer>
          <DropdownHeader onClick={toggleDropdown}>
            {selectedOption}
            <span>{isOpen ? '▲' : '▼'}</span>
          </DropdownHeader>
          {isOpen && (
            <DropdownListContainer>
              <DropdownList>
                {options.map((group, index) => (
                  <React.Fragment key={index}>
                    <OptGroupLabel>{group.label}</OptGroupLabel>
                    {group.options.map((option) => (
                      <ListItem
                        key={option.value}
                        onClick={() => handleOptionClick(option.label)}
                      >
                        {option.label}
                      </ListItem>
                    ))}
                  </React.Fragment>
                ))}
              </DropdownList>
            </DropdownListContainer>
          )}
        </DropdownContainer>
        <SearchBox>
          <SearchIcon src={searchIcon} alt="search" />
          <SearchInput
            type="text"
            placeholder="별칭 검색"
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
            <InvestList key={invest.investmentPlannedLandId}>
              <InvestWrapper>
                <NaverMap>
                  <NaverMapProps landAddress={invest.landAddress} />
                </NaverMap>
                <Invest onClick={() => handleDetailClick(invest)}>
                  <NickName>[ {invest.landNickname} ]</NickName>
                  <Address>{invest.landAddress}</Address>
                  <WarningScore>
                    투자위험도 :{' '}
                    {invest.landDanger === 1
                      ? '중간'
                      : invest.landDanger === 2
                        ? '낮음'
                        : '높음'}
                  </WarningScore>
                </Invest>
              </InvestWrapper>
              {/* <div
                style={{ flexDirection: 'column', justifyContent: 'flex-end' }}
              > */}
              {/* <SmallButton onClick={() => handleUpdateClick(invest)}>
                    수정
                  </SmallButton> */}
              <ButtonContainer>
                <SmallButton
                  color="#ff4d4d"
                  onClick={() =>
                    handleDeleteClick(invest.investmentPlannedLandId)
                  }
                >
                  삭제
                </SmallButton>
                {/* </div> */}
              </ButtonContainer>
              <Divider />
            </InvestList>
          ))
        ) : (
          <div>저장한 투자 예정지가 없습니다.</div>
        )}
        {/* <Divider /> */}
      </InvestContainer>
      <RegistContainer>
        <RegisterButton onClick={handleRegisterClick}>등록하기</RegisterButton>
      </RegistContainer>
    </Container>
  );
}

export default InvestmentPage;
