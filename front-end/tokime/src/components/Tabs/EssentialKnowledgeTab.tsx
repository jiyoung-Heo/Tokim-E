import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import fetchKnowledgeByCategory from '../../api/LandPurchaseKnowledge'; // default import로 변경
// import landImage from '../../assets/images/land2.png'; // land2 이미지 임포트

interface KnowledgeItem {
  knowledgeCategory: number;
  knowledgeName: string;
  knowledgeDescribe: string;
  knowledgeImageUrl: string;
}
// 반응형 스타일 정의
const TabContent = styled.div`
  width: 83.33vw; // 360px 기준 300px
  height: 54.69vh; // 360px 기준 350px
  background-color: #ffffff;
  border-radius: 5.56vw; // 360px 기준 20px
  border: 0.28vw solid #ddd; // 360px 기준 1px
  box-shadow:
    0px 1.11vw 1.11vw rgba(0, 0, 0, 0.25),
    inset 0px 1.11vw 1.11vw rgba(0, 0, 0, 0.25);
  margin-top: 25vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2vh; // 각 아이템 사이에 여백 추가
`;

const Image = styled.img`
  width: 41.67vw; // 360px 기준 150px
  height: 20.83vh; // 360px 기준 150px
  margin-top: 8.33vh; // 360px 기준 30px
`;

const Text = styled.p`
  margin-top: 6.94vh; // 360px 기준 25px
  font-size: 3.89vw; // 360px 기준 14px
  font-family: 'KoddiUD OnGothic';
  font-weight: 700;
  text-align: center;
`;

const Description = styled.p`
  font-size: 3.33vw; // 360px 기준 12px
  text-align: center;
  color: #555;
`;

// 페이지 버튼 스타일
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2vh;
`;

const Button = styled.button<{ disabled: boolean }>`
  background-color: ${({ disabled }) => (disabled ? '#ddd' : '#007bff')};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-size: 1rem;
  border-radius: 0.25rem;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#ddd' : '#0056b3')};
  }
`;

function EssentialKnowledgeTab() {
  const [knowledgeList, setKnowledgeList] = useState<KnowledgeItem[]>([]); // 배열 상태로 변경
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 상태
  const itemsPerPage = 1; // 한 페이지에 보여줄 항목 수

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchKnowledgeByCategory(1); // 필수 상식에 해당하는 category 1 데이터 요청
        console.log('필수 상식 API 응답:', data); // 콘솔에 API 응답 출력
        setKnowledgeList(data); // 데이터를 배열로 상태에 저장
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      } finally {
        setLoading(false); // 로딩 상태 업데이트
      }
    };

    fetchData(); // 데이터 요청 함수 호출
  }, []);

  // 페이지에 맞는 데이터 필터링
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = knowledgeList.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 핸들러
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  if (loading) {
    return <TabContent>로딩 중...</TabContent>; // 로딩 중일 때 표시
  }

  return (
    <TabContent>
      {currentItems.length > 0 ? (
        currentItems.map((item, index) => (
          <ItemContainer key={index}>
            <Image src={item.knowledgeImageUrl} alt={item.knowledgeName} />
            <Text>{item.knowledgeName}</Text>
            <Description>{item.knowledgeDescribe}</Description>
          </ItemContainer>
        ))
      ) : (
        <Text>필수 상식에 대한 정보가 없습니다.</Text>
      )}
      {/* 페이지네이션 */}
      <PaginationContainer>
        <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
          이전
        </Button>
        <Button
          onClick={handleNextPage}
          disabled={indexOfLastItem >= knowledgeList.length}
        >
          다음
        </Button>
      </PaginationContainer>
    </TabContent>
  );
}

export default EssentialKnowledgeTab;
