import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import fetchKnowledgeByCategory from '../../api/LandPurchaseKnowledge'; // default import로 변경
import landImage from '../../assets/images/land2.png'; // land2 이미지 임포트

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

function EssentialKnowledgeTab() {
  const [knowledge, setKnowledge] = useState<string | null>(null); // 상태 선언
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchKnowledgeByCategory(1); // 필수 상식에 해당하는 category 1 데이터 요청
        console.log('필수 상식 API 응답:', data); // 콘솔에 API 응답 출력
        setKnowledge(data);
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      } finally {
        setLoading(false); // 로딩 상태 업데이트
      }
    };

    fetchData(); // 데이터 요청 함수 호출
  }, []);

  if (loading) {
    return <TabContent>로딩 중...</TabContent>; // 로딩 중일 때 표시
  }

  return (
    <TabContent>
      <Image src={landImage} alt="Land" />
      <Text>{knowledge || '필수 상식에 대한 정보가 없습니다.'}</Text>
    </TabContent>
  );
}

export default EssentialKnowledgeTab;
