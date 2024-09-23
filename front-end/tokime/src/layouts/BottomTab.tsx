import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TabContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-around;
  background-color: #ffffff;
  border-top: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const TabItem = styled(Link)`
  flex: 1;
  text-align: center;
  padding: 10px 0;
  font-size: 14px;
  color: #333;
  text-decoration: none;

  &:hover {
    background-color: #f0f0f0;
  }

  &.active {
    font-weight: bold;
    color: #007bff;
  }
`;

function BottomTab() {
  return (
    <TabContainer>
      <TabItem to="/address-search">지번검색</TabItem>
      <TabItem to="/risk-map">위험 지도</TabItem>
      <TabItem to="/main">홈</TabItem>
      <TabItem to="/investment">투자예정지</TabItem>
      <TabItem to="/my-page">마이 페이지</TabItem>
    </TabContainer>
  );
}

export default BottomTab;
