import React from 'react';
import { useParams } from 'react-router-dom';

function LandTermDetail() {
  const { term } = useParams<{ term: string }>(); // useParams로 term을 가져옴

  if (!term) {
    return <div>용어 정보가 없습니다.</div>;
  }

  return (
    <div>
      <h1>{term}</h1>
      <p>{`${term}에 대한 설명입니다.`}</p>
    </div>
  );
}

export default LandTermDetail;
