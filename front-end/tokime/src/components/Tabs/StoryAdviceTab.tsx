import React from 'react';
import styled from 'styled-components';

// 스타일 정의
const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #f3f7fb;
`;
const RelatedLawsContainer = styled.div`
  height: 25vh;
  background: #ffffff;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 15px;
  box-sizing: border-box;
  overflow-y: auto;
  margin-bottom: 3vh;
`;

const RelatedLawsTitle = styled.div`
  font-family: 'KoddiUD OnGothic';
  font-weight: 700;
  font-size: 4vw;
  text-align: left;
  color: #333333;
  margin-bottom: 1vh;
`;
const TermDescription = styled.div`
  font-family: 'KoddiUD OnGothic';
  font-weight: 400;
  font-size: 4vw;
  line-height: 5vw;
  color: #000000;
`;
function StoryAdviceTab() {
  return (
    <Container>
      <RelatedLawsTitle>사연</RelatedLawsTitle>
      <RelatedLawsContainer>
        <TermDescription>내용</TermDescription>
      </RelatedLawsContainer>
      <RelatedLawsTitle>위험사례</RelatedLawsTitle>
      <RelatedLawsContainer>
        <TermDescription>내용</TermDescription>
      </RelatedLawsContainer>
    </Container>
  );
}

export default StoryAdviceTab;
