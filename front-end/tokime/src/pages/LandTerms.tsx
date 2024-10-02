import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import searchIcon from '../assets/images/icon/search.svg';
import { getAllTerms } from '../api/termAxios'; // API 서비스 호출

// 컨테이너 스타일 정의
const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #f3f7fb;
`;

// 제목 스타일 정의
const Title = styled.h2`
  position: absolute;
  left: 40px;
  top: 40px;
  font-size: 20px;
  font-weight: 700;
  font-family: 'KoddiUD OnGothic';
  color: #333333;
`;

// 부제 스타일 정의
const SubTitle = styled.div`
  position: absolute;
  left: 13px;
  top: 85px;
  font-size: 20px;
  font-weight: 700;
  color: #333333;
  font-family: 'KoddiUD OnGothic';
`;

// 검색 박스 스타일 정의
const SearchBox = styled.div`
  position: absolute;
  width: 340px;
  height: 40px;
  left: 10px;
  top: 131px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding-left: 19px;
`;

const SearchIcon = styled.img`
  width: 24px;
  height: 24px;
`;

// 검색 입력창 스타일 정의
const SearchInput = styled.input`
  border: none;
  font-size: 16px;
  font-weight: 700;
  color: rgba(39, 195, 132, 0.5);
  margin-left: 10px;
  width: 100%;
  background: none;
  font-family: 'KoddiUD OnGothic';

  &:focus {
    outline: none;
    color: #27c384;
  }
`;

// 용어 목록 스타일 정의
const TermContainer = styled.div`
  position: absolute;
  width: 340px;
  height: 385px;
  left: 10px;
  top: 178px;
  background: #ffffff;
  box-shadow:
    inset 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 20px;
  overflow-y: scroll;
`;

const Term = styled(Link)`
  display: block;
  font-size: 18px;
  font-weight: 700;
  color: #333333;
  margin-bottom: 33px;
  font-family: 'KoddiUD OnGothic';
  text-decoration: none;

  &:hover {
    color: #27c384;
  }
`;

// 알파벳 네비게이션 스타일 정의
const AlphabetNavContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding-bottom: 10px;
  position: fixed;
  bottom: 80px;
  width: 340px;
  left: 10px;
  z-index: 999;
  border-top: 3px solid rgba(120, 120, 130, 0.1);

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #00c99c;
    border-radius: 10px;
  }
`;

const AlphabetButton = styled.div<{ isSelected: boolean }>`
  flex: 0 0 auto;
  padding: 8px;
  margin-left: 17px; // 아이콘 사이 간격 설정
  border-radius: 4px;
  font-size: 16px;
  font-family: 'KoddiUD OnGothic';
  font-weight: 700;
  text-align: center;
  line-height: 24px;
  color: ${(props) => (props.isSelected ? '#333333' : 'rgba(51, 51, 51, 0.8)')};
  cursor: pointer;

  &:hover {
    color: #27c384;
  }
`;

const alphabets = [
  '가',
  '나',
  '다',
  '라',
  '마',
  '바',
  '사',
  '아',
  '자',
  '차',
  '카',
  '타',
  '파',
  '하',
];

// 메인 컴포넌트
const LandTerms = () => {
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
  const [allTerms, setAllTerms] = useState<any[]>([]); // 전체 용어 리스트
  const [filteredTerms, setFilteredTerms] = useState<any[]>([]); // 필터링된 용어 리스트
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [selectedAlphabet, setSelectedAlphabet] = useState('가'); // 선택된 알파벳

  const termContainerRef = useRef<HTMLDivElement>(null); // 스크롤 참조

  // 전체 용어 조회
  const fetchTerms = async () => {
    try {
      const data = await getAllTerms(''); // 모든 용어 불러오기
      console.log('전체 API 응답 데이터:', data); // 응답 데이터 확인
      setAllTerms(data); // 전체 데이터를 저장
      setFilteredTerms(data); // 초기 필터링 데이터는 전체 데이터
    } catch (error) {
      console.error('용어를 불러오는데 실패했습니다:', error);
    } finally {
      setLoading(false); // 로딩 완료
    }
  };

  // 페이지 로드 시 전체 용어 조회
  useEffect(() => {
    fetchTerms(); // 초기에는 전체 조회
  }, []);

  // 알파벳 선택에 따라 용어 필터링
  useEffect(() => {
    const filtered = allTerms.filter((term) =>
      term.termName.startsWith(selectedAlphabet),
    );
    console.log('필터링된 용어:', filtered); // 필터링된 용어 확인
    setFilteredTerms(filtered); // 필터링된 데이터를 업데이트

    // 선택된 알파벳의 첫 번째 용어로 스크롤
    if (termContainerRef.current && filtered.length > 0) {
      termContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [selectedAlphabet, allTerms]);

  // 검색어가 변경될 때마다 클라이언트 측에서 추가 필터링
  useEffect(() => {
    const filtered = allTerms.filter((term) =>
      term.termName.includes(searchTerm),
    );
    setFilteredTerms(filtered); // 검색어 필터링된 데이터를 업데이트
  }, [searchTerm, allTerms]);

  if (loading) {
    return <div>로딩 중...</div>; // 로딩 상태일 때 표시
  }

  return (
    <Container>
      <Title>토지 용어 사전</Title>
      <SubTitle>어떤 용어를 검색할까요?</SubTitle>

      {/* 알파벳 네비게이션 */}
      <AlphabetNavContainer>
        {alphabets.map((alphabet) => (
          <AlphabetButton
            key={alphabet}
            isSelected={selectedAlphabet === alphabet}
            onClick={() => setSelectedAlphabet(alphabet)}
          >
            {alphabet}
          </AlphabetButton>
        ))}
      </AlphabetNavContainer>

      {/* 검색 박스 */}
      <SearchBox>
        <SearchIcon src={searchIcon} alt="search" />
        <SearchInput
          type="text"
          placeholder="용어 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // 검색어 입력 시 상태 업데이트
        />
      </SearchBox>

      {/* 용어 목록 */}
      <TermContainer ref={termContainerRef}>
        {filteredTerms.length > 0 ? (
          filteredTerms.map((term) => (
            <Term to={`/land-terms/${term.termId}`} key={term.termId}>
              {term.termName}
            </Term>
          ))
        ) : (
          <div>검색 결과가 없습니다.</div>
        )}
      </TermContainer>
    </Container>
  );
};

export default LandTerms;
