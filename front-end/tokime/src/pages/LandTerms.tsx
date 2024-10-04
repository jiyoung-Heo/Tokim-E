import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import searchIcon from '../assets/images/icon/search.svg';
import starIcon from '../assets/images/icon/star.svg'; // 기본 별 아이콘
import starFilled from '../assets/images/icon/star_filled.svg'; // 즐겨찾기 시 사용될 채워진 별 아이콘

import { getAllTerms, registTermLike, deleteTermLike } from '../api/termAxios'; // API 서비스 호출

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #f3f7fb;
`;

const Title = styled.h2`
  position: absolute;
  left: 11.11vw;
  top: 6.25vh;
  font-size: 20px;
  font-weight: 700;
  font-family: 'KoddiUD OnGothic';
  color: #333333;
`;

const SubTitle = styled.div`
  position: absolute;
  left: 4.17vw;
  top: 13.28vh;
  font-size: 20px;
  font-weight: 700;
  color: #333333;
  font-family: 'KoddiUD OnGothic';
`;

const SearchBox = styled.div`
  position: absolute;
  width: 94.44vw;
  height: 40px;
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
  width: 24px;
  height: 24px;
`;

const SearchInput = styled.input`
  border: none;
  font-size: 16px;
  font-weight: 700;
  color: rgba(39, 195, 132, 0.5);
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
  position: absolute;
  width: 94.44vw;
  height: 60.16vh;
  left: 2.78vw;
  top: 28.13vh;
  background: #ffffff;
  box-shadow:
    inset 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 3.13vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TermList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  gap: 33px;
  position: absolute;
  top: 4.69vh;
  left: 8.33vw;
  width: 75vw;
  height: 43vh;
  overflow-y: auto;
  box-sizing: border-box;
`;

const TermWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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

const StarIcon = styled.img<{ isLiked: boolean }>`
  width: 4.17vw;
  height: 2.34vh;
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
  opacity: ${(props) => (props.isLiked ? 1 : 0.5)};
`;

const AlphabetNavContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding-bottom: 1.56vh;
  position: fixed;
  bottom: 12.5vh;
  width: 94.44vw;
  left: 2.78vw;
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

const AlphabetButton = styled.div<{
  isSelected: boolean;
  showFavorites: boolean;
}>`
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
    if (props.showFavorites) {
      return '#CCCCCC'; // 즐겨찾기 모드일 때 알파벳 색상을 회색으로
    }
    if (props.isSelected) {
      return '#27c384'; // 선택된 알파벳 색상
    }
    return '#333333'; // 기본 알파벳 색상
  }};

  cursor: ${(props) =>
    props.showFavorites
      ? 'not-allowed'
      : 'pointer'}; // 즐겨찾기 모드일 때 클릭 비활성화
`;

const FavoriteButton = styled(StarIcon)`
  width: 4.17vw;
  height: 2.34vh;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
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

const LandTerms = () => {
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

  const handleFavoriteClick = () => {
    setShowFavorites(!showFavorites);
    setSelectedAlphabet(''); // 즐겨찾기 모드에서는 알파벳 선택 초기화
    if (!showFavorites) {
      setFilteredTerms(
        allTerms.filter((term) => likedTerms.includes(term.termId)),
      );
    } else {
      setFilteredTerms(allTerms);
    }
  };

  useEffect(() => {
    fetchTerms();
  }, []);

  useEffect(() => {
    if (selectedAlphabet === '') {
      setFilteredTerms(allTerms);
    } else {
      const filtered = allTerms.filter((term) =>
        term.termName.startsWith(selectedAlphabet),
      );
      setFilteredTerms(filtered);
    }
  }, [selectedAlphabet, allTerms]);

  useEffect(() => {
    const filtered = allTerms.filter((term) =>
      term.termName.includes(searchTerm),
    );
    setFilteredTerms(filtered);
  }, [searchTerm, allTerms]);

  const handleAlphabetClick = (alphabet: string) => {
    if (selectedAlphabet === alphabet) {
      setSelectedAlphabet('');
    } else {
      setSelectedAlphabet(alphabet);
      setShowFavorites(false); // 알파벳을 클릭하면 즐겨찾기 모드를 해제
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <Container>
      <Title>토지 용어 사전</Title>
      <SubTitle>어떤 용어를 검색할까요?</SubTitle>

      <AlphabetNavContainer>
        <AlphabetButton
          isSelected={false}
          onClick={handleFavoriteClick}
          showFavorites={showFavorites}
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
            showFavorites={showFavorites} // 즐겨찾기 모드에 따라 알파벳 색상 변경
            onClick={() => handleAlphabetClick(alphabet)}
          >
            {alphabet}
          </AlphabetButton>
        ))}
      </AlphabetNavContainer>

      <SearchBox>
        <SearchIcon src={searchIcon} alt="search" />
        <SearchInput
          type="text"
          placeholder="용어 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
            <div>검색 결과가 없습니다.</div>
          )}
        </TermList>
      </TermContainer>
    </Container>
  );
};

export default LandTerms;
