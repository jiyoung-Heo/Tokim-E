import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useSwipeable } from 'react-swipeable';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import know1 from '../../assets/images/knowledge/1.png';
import know2 from '../../assets/images/knowledge/2.png';
import know3 from '../../assets/images/knowledge/3.png';
import know4 from '../../assets/images/knowledge/4.png';
import know5 from '../../assets/images/knowledge/5.png';
import know6 from '../../assets/images/knowledge/6.png';
import know7 from '../../assets/images/knowledge/7.png';
import know8 from '../../assets/images/knowledge/8.png';
import know9 from '../../assets/images/knowledge/9.png';
import know10 from '../../assets/images/knowledge/10.png';
import know11 from '../../assets/images/knowledge/11.png';
import know12 from '../../assets/images/knowledge/12.png';
import know13 from '../../assets/images/knowledge/13.png';
import know14 from '../../assets/images/knowledge/14.png';
import know15 from '../../assets/images/knowledge/15.png';
import know16 from '../../assets/images/knowledge/16.png';
import know17 from '../../assets/images/knowledge/17.png';
import know18 from '../../assets/images/knowledge/18.png';
import know19 from '../../assets/images/knowledge/19.png';
import know20 from '../../assets/images/knowledge/20.png';
import know21 from '../../assets/images/knowledge/21.png';

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
  width: 75%; /* 텍스트 컨테이너의 너비를 줄임 */
`;

const Image = styled.img`
  width: 41.67vw;
  height: 20.83vh;
  margin-top: 7.33vh;
`;

const Text = styled.p`
  font-size: 5vw;
  font-family: 'KoddiUD OnGothic';
  font-weight: 700;
  text-align: center;
  word-break: keep-all; /* 단어 중간에 줄바꿈이 되지 않도록 */
  overflow-wrap: break-word;
`;

const Description = styled.p`
  font-size: 3.33vw;
  text-align: center;
  color: #555;
  word-break: keep-all; /* 단어 중간에 줄바꿈 방지 */
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

const imgSrcs = [
  know1,
  know2,
  know3,
  know4,
  know5,
  know6,
  know7,
  know8,
  know9,
  know10,
  know11,
  know12,
  know13,
  know14,
  know15,
  know16,
  know17,
  know18,
  know19,
  know20,
  know21,
];

function EssentialKnowledgeTab() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 1;

  const knowledgeList = useSelector(
    (state: RootState) => state.landEssentialKnowledge.procedures,
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
        <Text>필수 상식에 대한 정보가 없습니다.</Text>
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

      <PaginationContainer>
        {Array.from({ length: totalPages }, (_, i) => (
          <Dot key={i} active={i + 1 === currentPage} />
        ))}
      </PaginationContainer>
    </TabContent>
  );
}

export default EssentialKnowledgeTab;
