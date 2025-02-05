import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useSwipeable } from 'react-swipeable';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import pro1 from '../../assets/images/procedure/1.png';
import pro2 from '../../assets/images/procedure/2.png';
import pro3 from '../../assets/images/procedure/3.png';
import pro4 from '../../assets/images/procedure/4.png';
import pro5 from '../../assets/images/procedure/5.png';

const TabContent = styled.div`
  height: 57vh;
  background-color: #ffffff;
  border-radius: 5.56vw;
  border: 0.28vw solid #ddd;
  box-shadow:
    0px 1.11vw 1.11vw rgba(0, 0, 0, 0.25),
    inset 0px 1.11vw 1.11vw rgba(0, 0, 0, 0.25);
  margin-top: 3vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2vh;
  width: 75%; /* 텍스트 컨테이너의 너비를 조정 */
`;

const Image = styled.img`
  width: 41.67vw;
  height: 20.83vh;
  margin-top: 8.33vh;
`;

const Text = styled.p`
  margin-top: 3vh;
  font-size: 5vw;
  font-family: 'KoddiUD OnGothic';
  font-weight: 700;
  text-align: center;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const Description = styled.p`
  font-size: 3.5vw;
  text-align: center;
  color: #555;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const PaginationContainer = styled.div`
  position: absolute;
  bottom: 1vh;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1vw;
`;

const Dot = styled.div<{ active: boolean }>`
  width: 1.5vw;
  height: 1.5vw;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? '#00C99C' : '#ddd')};
  transition:
    width 0.3s ease-in-out,
    height 0.3s ease-in-out;

  ${(props) =>
    props.active &&
    css`
      width: 2.5vw;
      height: 2.5vw;
    `}
`;

const SlideButton = styled.button`
  position: absolute;
  top: 35%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  z-index: 10;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const LeftButton = styled(SlideButton)`
  left: 3vw;
  color: #00c99c;
`;

const RightButton = styled(SlideButton)`
  right: 3vw;
  color: #00c99c;
`;

const imgSrcs = [pro1, pro2, pro3, pro4, pro5];

function LandPurchaseProcedureTab() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 1; // 한 페이지에 보여줄 항목 수

  const knowledgeList = useSelector(
    (state: RootState) => state.landpurchaseProcedure.procedures,
  );

  const totalPages = Math.ceil(knowledgeList.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = knowledgeList.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNextPage,
    onSwipedRight: handlePreviousPage,
    trackMouse: true,
  });

  return (
    <TabContent {...handlers}>
      {currentItems.length > 0 ? (
        currentItems.map((item, index) => (
          <ItemContainer key={index}>
            <Image
              src={imgSrcs[(currentPage - 1) % imgSrcs.length]}
              alt={item.knowledgeName}
            />
            <Text>{item.knowledgeName}</Text>
            <Description>{item.knowledgeDescribe}</Description>
          </ItemContainer>
        ))
      ) : (
        <Text>구매 절차에 대한 정보가 없습니다.</Text>
      )}

      <LeftButton onClick={handlePreviousPage} disabled={currentPage === 1}>
        {'<'}
      </LeftButton>

      <RightButton
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        {'>'}
      </RightButton>

      {/* 페이지 인디케이터 */}
      <PaginationContainer>
        {Array.from({ length: totalPages }, (_, i) => (
          <Dot
            key={i}
            active={i + 1 === currentPage}
            onClick={() => handlePageChange(i + 1)}
          />
        ))}
      </PaginationContainer>
    </TabContent>
  );
}

export default LandPurchaseProcedureTab;
