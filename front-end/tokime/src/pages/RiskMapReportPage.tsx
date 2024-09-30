// src/pages/RiskMapReportPage.tsx
import React from 'react';

function RiskMapReportPage() {
  return (
    <>
      <div>
        <p>제목</p>
        <input
          type="text"
          placeholder="텍스트를 입력하세요"
          style={{
            width: '300px',
            height: '30px',
            padding: '5px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </div>
      <div>
        <p>주소</p>
        <input
          type="text"
          placeholder="지번 주소를 입력하세요"
          style={{
            width: '300px',
            height: '30px',
            padding: '5px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </div>
      <div>
        <p>내용</p>
        <input
          type="text"
          placeholder="텍스트를 입력하세요"
          style={{
            width: '300px',
            height: '500px',
            padding: '5px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </div>
    </>
  );
}

export default RiskMapReportPage;
