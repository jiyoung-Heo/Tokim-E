import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// 투자 예정지 스타일
const InvestItem = styled.div`
  padding: 10px;
  margin: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

// 투자 예정지 등록 버튼 스타일
const RegisterButton = styled.button`
  position: fixed;
  bottom: 80px;
  right: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 800; /* z-index 추가 */
`;

// 검색창 스타일
const SearchContainer = styled.div`
  padding: 10px;
  background-color: #f3f7fb;
  display: flex;
  align-items: center;
`;

// 주소 입력 스타일
const SearchInput = styled.input`
  width: 50%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  margin-right: 10px;
`;

// 지역 선택 스타일
const RegionSelect = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

function InvestmentPage() {
  const navigate = useNavigate();

  // 투자 예정지 아이템 클릭 시 상세 페이지로 이동
  const handleItemClick = () => {
    navigate('/investment-detail'); // 투자 예정지 상세 페이지 경로로 이동
  };

  // 등록 버튼 클릭 시 투자 예정지 등록 페이지로 이동
  const handleRegisterClick = () => {
    navigate('/investment-register'); // 투자 예정지 등록 페이지 경로로 이동
  };

  return (
    <div>
      <h1>나의 투자예정지</h1>
      <SearchContainer>
        <RegionSelect>
          <option value="">전체 지역</option>
          <optgroup label="특별시">
            <option value="서울특별시">서울특별시</option>
            <option value="세종특별자치시">세종특별자치시</option>
          </optgroup>
          <optgroup label="광역시">
            <option value="부산광역시">부산광역시</option>
            <option value="대구광역시">대구광역시</option>
            <option value="인천광역시">인천광역시</option>
            <option value="광주광역시">광주광역시</option>
            <option value="대전광역시">대전광역시</option>
            <option value="울산광역시">울산광역시</option>
          </optgroup>
          <optgroup label="도">
            <option value="경기도">경기도</option>
            <option value="강원도">강원도</option>
            <option value="충청북도">충청북도</option>
            <option value="충청남도">충청남도</option>
            <option value="전라북도">전라북도</option>
            <option value="전라남도">전라남도</option>
            <option value="경상북도">경상북도</option>
            <option value="경상남도">경상남도</option>
            <option value="제주특별자치도">제주특별자치도</option>
          </optgroup>
        </RegionSelect>
        <SearchInput type="text" placeholder="주소를 입력하세요." />
      </SearchContainer>
      <InvestItem onClick={handleItemClick}>
        서울시 강남구 테헤란로 123 (임시 데이터)
      </InvestItem>
      <RegisterButton onClick={handleRegisterClick}>
        투자 예정지 등록
      </RegisterButton>
    </div>
  );
}

export default InvestmentPage;
