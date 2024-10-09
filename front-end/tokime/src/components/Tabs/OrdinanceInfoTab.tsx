import styled, { css } from 'styled-components';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store'; // RootState 경로에 맞게 수정 필요
import LoadingSpinner from '../layouts/LoadingSpinner';
import nodataimg from '../../assets/images/Tokimlogo.png';
import { setLandDetail } from '../../redux/slices/landInfoSlice';
import { setLawInfo } from '../../redux/slices/lawInfoSlice';
import lawIcon from '../../assets/images/icon/law.png'; // 아이콘 경로 확인 필요
import LawDetailModal from '../modals/LawDetailModal'; // 법령 상세 정보를 보여줄 모달 컴포넌트
import searchIcon from '../../assets/images/icon/search.svg';
import multiply from '../../assets/images/icon/Multiply.png'; // x아이콘

// 스타일 정의
const LawInfoContainer = styled.div`
  width: 80vw; // 반응형 크기 설정
  height: 20vh;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px;
  position: relative;
  margin-bottom: 5vw; // 반응형 마진
  cursor: pointer;
`;
const LawHeader = styled.div`
  display: flex;
  align-items: center;
`;

const LawIcon = styled.img`
  width: 6vw; // 반응형 크기 설정
  height: 6vw; // 반응형 크기 설정
  margin-right: 4vw; // 반응형 간격 설정
`;

// 법령 제목 텍스트 스타일
const LawTitle = styled.div`
  font-size: 4vw; // 반응형 폰트 크기 설정
  font-weight: bold;
  color: #333333;
  word-break: keep-all; // 단어가 중간에 잘리지 않도록 설정
  white-space: normal; // 일반적인 줄바꿈 허용
  overflow: hidden;
  text-overflow: ellipsis;
`;
const LawUse = styled.div`
  font-size: 3.5vw; // 반응형 폰트 크기 설정
  font-weight: 800;
  color: rgba(51, 51, 51, 0.8);
  margin-top: 1vw;
`;

const LawNumber = styled.div`
  font-size: 3.5vw; // 반응형 폰트 크기 설정
  font-weight: bold;
  color: #00c99c;
  position: absolute;
  right: 10px;
  bottom: 25px;
`;
const LawDate = styled.div`
  font-size: 3.5vw; // 반응형 폰트 크기 설정
  font-weight: bold;
  color: #333333;
  text-align: center;
  position: absolute;
  bottom: 3px;
  width: 100%;
`;

// 페이지네이션 컨테이너 스타일
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5vw; // 반응형 마진 설정
`;

const PageButton = styled.button`
  background-color: #00c99c;
  border: none;
  color: white;
  font-size: 4vw; // 반응형 폰트 크기 설정
  padding: 2vw;
  margin: 0 2vw;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

// 데이터가 없을 때 표시할 메시지 스타일
const NoDataMessage = styled.p`
  color: #27c384; // 텍스트 색상을 녹색(#27c384)으로 설정
  font-weight: bold; // 텍스트를 굵게 설정
  font-size: 1.5em; // 폰트 크기를 1.5em로 설정
  margin-top: 3vh; // 위쪽 여백을 1vh로 설정
  word-break: keep-all;
  white-space: normal;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2vh;
`;

const SearchBox = styled.div`
  height: 4vh;
  width: 70%; /* 너비 조정 */
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-left: 2vw;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding-left: 19px;
`;

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

const CategorySelect = styled.select`
  border: none;
  position: relative;
  height: 4vh;
  width: 30%;
  color: #27c384;
  background: #ffffff;
  font-size: 16px;
  font-weight: 700;
  margin-right: 2vw;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  justify-content: center; /* 가로 가운데 정렬 */
  align-items: center;
`;

const MultiplyIcon = styled.img`
  width: 8vw;
  margin-right: 2vw;
`;

const SearchIcon = styled.img`
  width: 5vw;
  height: 5vh;
`;

function OrdinanceInfoTab({
  setActiveTab,
}: {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) {
  const dispatch = useDispatch(); // Redux 액션을 디스패치하는 함수 가져오기
  const ordinances = useSelector((state: RootState) => state.lawInfo.lawInfos); // Redux에서 법령 정보 가져오기
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 관리
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // 에러 메시지 상태
  const landAddress = useSelector((state: RootState) => state.landaddress); // Redux에서 토지 주소 정보 가져오기
  const itemsPerPage = 3; // 한 페이지에 표시할 법령 정보 수
  const totalItems = ordinances?.length ?? 0; // 총 법령 정보 수
  const [selectedOrdinance, setSelectedOrdinance] = useState<any>(null); // 선택된 법령 정보 상태
  const prevlawInfosRef = useRef(ordinances); // 이전 법령 정보 저장을 위한 ref

  // 검색 관련 상태
  const [searchCategory, setSearchCategory] = useState('lawName'); // 기본값을 lawName으로 설정
  const [searchQuery, setSearchQuery] = useState('');

  // 카테고리와 검색어에 따른 필터링
  const filteredOrdinances = ordinances.filter((ordinance: any) => {
    const fieldToSearch = ordinance[searchCategory] || ''; // 선택한 카테고리에 맞는 필드 선택
    return fieldToSearch
      .toString()
      .toLowerCase()
      .includes(searchQuery.toLowerCase()); // 검색어 포함 여부
  });

  const currentItems = filteredOrdinances.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  const filterItems = filteredOrdinances.length; // 필터된 총 법령 정보 수
  const totalPages = Math.ceil(filterItems / itemsPerPage);

  // 주소가 변경될 때마다 법령 정보를 리셋하는 로직
  useEffect(() => {
    if (ordinances !== prevlawInfosRef.current) {
      dispatch(setLandDetail(null)); // 토지 상세 정보 리셋
      dispatch(setLawInfo([])); // 법령 정보 리셋
      setActiveTab('landInfo'); // 탭을 'landInfo'로 전환
      prevlawInfosRef.current = ordinances; // 현재 법령 정보로 업데이트
    }
  }, [landAddress, dispatch, setActiveTab]);

  // 법령 정보가 없을 때 에러 메시지 출력, 로딩 완료 상태 설정
  useEffect(() => {
    if (totalItems === 0) {
      setErrorMessage('법령 정보가 없습니다.'); // 에러 메시지 출력
      setLoading(false); // 로딩 상태 해제
    } else {
      setErrorMessage(null); // 에러 메시지 초기화
      setLoading(false); // 로딩 상태 해제
    }
  }, [ordinances]);

  // 페이지 전환을 위한 함수 (다음 페이지로 이동)
  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1); // 현재 페이지를 1 증가
    }
  };

  // 페이지 전환을 위한 함수 (이전 페이지로 이동)
  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1); // 현재 페이지를 1 감소
    }
  };

  // 모달을 열고 선택된 법령 정보 설정
  const handleOpenModal = (ordinance: any) => {
    setSelectedOrdinance(ordinance); // 선택된 법령 정보 저장
    setIsModalOpen(true); // 모달 열기
  };

  // 모달을 닫고 선택된 법령 정보 초기화
  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  // 로딩 상태일 때 로딩 스피너 표시
  if (loading) {
    return <LoadingSpinner />;
  }

  // 법령 정보가 없을 때 출력할 메시지와 이미지
  if (errorMessage) {
    return (
      <div style={{ textAlign: 'center', marginTop: '3vh' }}>
        <img
          src={nodataimg}
          alt="No data available" // 데이터가 없을 때 표시할 이미지
          style={{ width: '50vw', height: 'auto', opacity: 0.65 }} // 이미지 크기와 투명도 조정
        />
        <NoDataMessage>법령 정보가 없습니다.</NoDataMessage> {/* 에러 메시지 */}
      </div>
    );
  }

  return (
    <div>
      <SearchContainer>
        <CategorySelect
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)} // 카테고리 변경
        >
          <option value="lawName">법령명</option>
          <option value="lawLandUse">법령 용도</option>
          <option value="lawItemNumber">법령 번호</option>
          <option value="lawContent">법령 내용</option>
        </CategorySelect>
        <SearchBox>
          <SearchIcon src={searchIcon} alt="search" />
          <SearchInput
            type="text"
            placeholder="검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // 검색어 변경
          />
          <MultiplyIcon
            src={multiply}
            alt="multiply"
            onClick={() => setSearchQuery('')}
          />
        </SearchBox>
      </SearchContainer>

      {totalItems > 0 ? (
        <>
          {/* 현재 페이지의 법령 정보 표시 */}
          {currentItems.map((ordinance, index) => (
            <LawInfoContainer
              key={index}
              onClick={() => handleOpenModal(ordinance)} // 법령 정보를 클릭하면 모달 열기
            >
              <LawHeader>
                <LawIcon src={lawIcon} /> {/* 법령 아이콘 */}
                <LawTitle>{ordinance.lawName}</LawTitle> {/* 법령 제목 */}
              </LawHeader>
              <LawUse>{ordinance.lawLandUse}</LawUse> {/* 법령 용도 */}
              <LawNumber>법령번호 {ordinance.lawItemNumber}</LawNumber>{' '}
              {/* 법령 번호 */}
              <LawDate>
                {new Date(ordinance.lawImplementAt).toLocaleDateString()}{' '}
                {/* 법령 시행일 */}
              </LawDate>
            </LawInfoContainer>
          ))}

          {/* 페이지네이션 */}
          <PaginationContainer>
            <PageButton
              onClick={handlePrevious}
              disabled={currentPage === 0} // 첫 번째 페이지일 때 비활성화
            >
              {'<'}
            </PageButton>
            <PageButton
              onClick={handleNext}
              disabled={currentPage === totalPages - 1} // 마지막 페이지일 때 비활성화
            >
              {'>'}
            </PageButton>
          </PaginationContainer>
        </>
      ) : (
        <LoadingSpinner /> // 데이터가 없을 때에도 로딩 스피너 표시
      )}

      {/* 선택된 법령 정보가 있을 때 모달 표시 */}
      {selectedOrdinance && (
        <LawDetailModal
          isOpen={isModalOpen} // 모달 열림 상태
          onRequestClose={handleCloseModal} // 모달 닫기 함수
          ordinance={selectedOrdinance} // 선택된 법령 정보 전달
        />
      )}
    </div>
  );
}

export default OrdinanceInfoTab;
