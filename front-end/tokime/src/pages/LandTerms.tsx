import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import searchIcon from '../assets/images/icon/search.svg';
import multiply from '../assets/images/icon/Multiply.png'; // x아이콘
import starIcon from '../assets/images/icon/star.svg'; // 기본 별 아이콘
import starFilled from '../assets/images/icon/star_filled.svg'; // 즐겨찾기 시 사용될 채워진 별 아이콘
import backIcon from '../assets/images/icon/left-actionable.png';
import { getAllTerms, registTermLike, deleteTermLike } from '../api/termAxios'; // API 서비스 호출
import LoadingSpinner from '../components/layouts/LoadingSpinner';

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

const SubTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #333333;
  font-family: 'KoddiUD OnGothic';
`;

const SearchBox = styled.div`
  margin-top: 3vh;
  height: 5vh;
  left: 1.56vw;
  top: 20.31vh;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding-left: 19px;
`;

const SearchIcon = styled.img`
  width: 5vw;
  height: 5vh;
`;

const MultiplyIcon = styled.img`
  width: 8vw;
  margin-right: 2vw;
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

const TermContainer = styled.div`
  margin-top: 3vh;
  background: #ffffff;
  height: 60vh;
  box-shadow:
    inset 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 3vh 5vw 0 5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const AlphabetNavContainer = styled.div`
  flex-basis: 15vh;
  display: flex;
  overflow-x: auto;
  width: 90vw;
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

const TermList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  gap: 33px;
  overflow-y: auto;
  box-sizing: border-box;
  flex-basis: 85vh;
  width: 100%;
`;

const TermWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 1.5vh;
`;

const Term = styled(Link)`
  display: block;
  font-size: 18px;
  font-weight: 700;
  color: #333333;
  text-decoration: none;
  font-family: 'KoddiUD OnGothic';

  &:hover {
    color: #27c384;
  }
`;

const SpinnerPlace = styled.div`
  display: flex;
  justify-content: center; // 가로 가운데 정렬
`;

const StarIcon = styled.img.withConfig({
  shouldForwardProp: (prop) => prop !== 'isLiked',
})<{ isLiked: boolean }>`
  width: 5vw;
  height: 5vh;
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
  opacity: ${(props) => (props.isLiked ? 1 : 0.5)};
`;

const AlphabetButton = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    prop !== 'isSelected' && prop !== 'isFavoritesMode',
})<{ isSelected: boolean; isFavoritesMode: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
  padding: 2vh;
  margin-left: 3vw;
  border-radius: 4px;
  font-size: 4vw;
  font-family: 'KoddiUD OnGothic';
  font-weight: 700;
  text-align: center;

  color: ${(props) => {
    if (props.isFavoritesMode) {
      return '#CCCCCC'; // 즐겨찾기 모드일 때 알파벳 색상을 회색으로
    }
    if (props.isSelected) {
      return '#27c384'; // 선택된 알파벳 색상
    }
    return '#333333'; // 기본 알파벳 색상
  }};

  cursor: pointer; // 즐겨찾기 모드일 때 클릭 비활성화
`;

const FavoriteButton = styled(StarIcon)`
  width: 5vw;
  height: 5vh;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const alphabets = [
  'ㄱ',
  'ㄴ',
  'ㄷ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅅ',
  'ㅇ',
  'ㅈ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
];

const LandTerms = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [allTerms, setAllTerms] = useState<any[]>([]);
  const [filteredTerms, setFilteredTerms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlphabet, setSelectedAlphabet] = useState('');
  const [likedTerms, setLikedTerms] = useState<number[]>([]); // 즐겨찾기된 용어 ID 목록
  const [showFavorites, setShowFavorites] = useState(false); // 즐겨찾기 모드 여부
  const termContainerRef = useRef<HTMLDivElement>(null);

  const fetchTerms = async () => {
    try {
      const data = await getAllTerms('');
      setAllTerms(data);
      // likeCheck가 true인 항목을 찾아 likedTerms에 저장
      const likedTermIds = data
        .filter((term: any) => term.likeCheck === true) // term에 타입 명시
        .map((term: any) => term.termId); // term에 타입 명시
      setLikedTerms(likedTermIds);
      setFilteredTerms(data);
    } catch (error) {
      console.error('용어를 불러오는데 실패했습니다:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async (termId: number, isLiked: boolean) => {
    try {
      if (isLiked) {
        await deleteTermLike(termId);
        setLikedTerms((prev) => prev.filter((id) => id !== termId));
      } else {
        await registTermLike(termId);
        setLikedTerms((prev) => [...prev, termId]);
      }
    } catch (error) {
      console.error('좋아요 처리 중 오류 발생:', error);
    }
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

    const unicode = word.charCodeAt(0) - 44032; // 한글의 유니코드 시작 값
    const chosungIndex = Math.floor(unicode / 588); // 초성 계산

    return CHOSUNG[chosungIndex]; // 초성 반환
  };

  const handleFavoriteClick = () => {
    if (showFavorites) {
      // 즐겨찾기눌러있는상태면 풀어줘야합니다.
      setShowFavorites(false);
    } else {
      setSelectedAlphabet(''); // 즐겨찾기 모드에서는 알파벳 선택 초기화
      setShowFavorites(true);
    }
  };

  const handleAlphabetClick = (alphabet: string) => {
    if (selectedAlphabet === alphabet) {
      setSelectedAlphabet('');
    } else {
      setSelectedAlphabet(alphabet);
      setShowFavorites(false); // 알파벳을 클릭하면 즐겨찾기 모드를 해제
    }
  };

  const goBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  useEffect(() => {
    fetchTerms();
  }, []);

  useEffect(() => {
    if (showFavorites) {
      // 즐겨찾기 모드가 활성화되면 즐겨찾기 항목만 필터링
      setFilteredTerms(
        allTerms
          .filter((term) => likedTerms.includes(term.termId))
          .filter((term) => term.termName.includes(searchTerm)),
      );
    } else if (selectedAlphabet === '') {
      // 선택된 알파벳이 없으면 모든 항목을 표시
      const filtered = allTerms.filter((term) =>
        term.termName.includes(searchTerm),
      );
      setFilteredTerms(filtered);
    } else {
      // 선택된 알파벳에 맞는 항목을 필터링
      const filtered = allTerms
        .filter((term) => getChosung(term.termName) === selectedAlphabet)
        .filter((term) => term.termName.includes(searchTerm));
      setFilteredTerms(filtered);
    }
  }, [showFavorites, selectedAlphabet, allTerms, likedTerms]);

  useEffect(() => {
    if (showFavorites) {
      // 즐겨찾기 모드가 활성화되면 즐겨찾기 항목중 검색 진행
      setFilteredTerms(
        allTerms
          .filter((term) => likedTerms.includes(term.termId))
          .filter((term) => term.termName.includes(searchTerm)),
      );
    } else if (selectedAlphabet === '') {
      // 선택된 알파벳이 없으면 전체검색 진행
      const filtered = allTerms.filter((term) =>
        term.termName.includes(searchTerm),
      );
      setFilteredTerms(filtered);
    } else {
      // 선택된 알파벳에 해당하는곳에서 있는 진행
      const filtered = allTerms
        .filter((term) => getChosung(term.termName) === selectedAlphabet)
        .filter((term) => term.termName.includes(searchTerm));
      setFilteredTerms(filtered);
    }
  }, [searchTerm]);

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <Container>
      <Title>
        <BackIcon src={backIcon} alt="back Icon" onClick={goBack} />
        토지 용어 사전
      </Title>
      <SubTitle>어떤 용어를 검색할까요?</SubTitle>

      <SearchBox>
        <SearchIcon src={searchIcon} alt="search" />
        <SearchInput
          type="text"
          placeholder="용어 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <MultiplyIcon
          src={multiply}
          alt="multiply"
          onClick={() => setSearchTerm('')}
        />
      </SearchBox>

      <TermContainer ref={termContainerRef}>
        <TermList>
          {filteredTerms.length > 0 ? (
            filteredTerms.map((term) => (
              <TermWrapper key={term.termId}>
                <Term to={`/land-terms/${term.termId}`}>{term.termName}</Term>
                <StarIcon
                  src={likedTerms.includes(term.termId) ? starFilled : starIcon} // isLiked에 따라 이미지 변경
                  alt="즐겨찾기"
                  isLiked={likedTerms.includes(term.termId)}
                  onClick={() =>
                    toggleLike(term.termId, likedTerms.includes(term.termId))
                  }
                />
              </TermWrapper>
            ))
          ) : (
            <div
              style={{
                color: '#27C384',
                fontWeight: 'bold',
                marginTop: '10px',
                fontSize: '1.5em',
              }}
            >
              검색 결과가 없습니다. T^T
            </div>
          )}
        </TermList>
        <AlphabetNavContainer>
          <AlphabetButton
            isSelected={false}
            onClick={handleFavoriteClick}
            isFavoritesMode={showFavorites}
          >
            <FavoriteButton
              src={showFavorites ? starFilled : starIcon} // 즐겨찾기 모드에 따라 아이콘 변경
              alt="즐겨찾기 전용 보기"
              isLiked={showFavorites}
            />
          </AlphabetButton>
          {alphabets.map((alphabet) => (
            <AlphabetButton
              key={alphabet}
              isSelected={selectedAlphabet === alphabet}
              isFavoritesMode={showFavorites} // 즐겨찾기 모드에 따라 알파벳 색상 변경
              onClick={() => handleAlphabetClick(alphabet)}
            >
              {alphabet}
            </AlphabetButton>
          ))}
        </AlphabetNavContainer>
      </TermContainer>
    </Container>
  );
};

export default LandTerms;
