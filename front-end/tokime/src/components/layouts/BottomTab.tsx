import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../../assets/images/icon/search.svg'; // ReactComponent로 import
import { ReactComponent as MapIcon } from '../../assets/images/icon/map.svg';
import { ReactComponent as HomeIcon } from '../../assets/images/icon/home.svg';
import { ReactComponent as InvestmentIcon } from '../../assets/images/icon/investment.svg';
import { ReactComponent as UserIcon } from '../../assets/images/icon/user.svg';

const TabContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw; /* 전체 화면 너비 */
  height: 10vh; /* 75px을 vh로 변환 (화면 높이의 10%) */
  display: flex;
  justify-content: space-around;
  background-color: #ffffff;
  box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.25) inset;
  z-index: 1000;
`;

const TabSpacer = styled.div`
  height: 10vh; /* 하단탭과 겹침 방지를 위해 콘텐츠 아래에 공간을 만듦 */
`;

const TabItem = styled(Link)<{ $isActive: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1vh; /* 패딩을 vh로 설정 */
  font-size: 10px; /* 글씨 크기를 rem으로 설정 */
  font-weight: 700;
  color: ${(props) => (props.$isActive ? '#27C384' : '#797982')};
  text-decoration: none;
`;

const IconWrapper = styled.div<{ $isActive: boolean }>`
  width: 7vw; /* 25px을 vw로 변환 */
  height: 7vw;
  margin-bottom: 0.5vh; /* 아이콘과 텍스트 간격을 vh로 설정 */
  & svg {
    fill: ${(props) =>
      props.$isActive ? '#27C384' : '#797982'}; /* SVG 아이콘의 fill 속성 */
    transition: fill 0.3s ease-in-out;
  }
`;

function BottomTab() {
  const location = useLocation();

  return (
    <>
      <TabSpacer />
      <TabContainer>
        <TabItem
          to="/address-search"
          $isActive={location.pathname === '/address-search'}
        >
          <IconWrapper $isActive={location.pathname === '/address-search'}>
            <SearchIcon />
          </IconWrapper>
          지번 검색
        </TabItem>
        <TabItem to="/risk-map" $isActive={location.pathname === '/risk-map'}>
          <IconWrapper $isActive={location.pathname === '/risk-map'}>
            <MapIcon />
          </IconWrapper>
          위험 지도
        </TabItem>
        <TabItem to="/main" $isActive={location.pathname === '/main'}>
          <IconWrapper $isActive={location.pathname === '/main'}>
            <HomeIcon />
          </IconWrapper>
          홈
        </TabItem>
        <TabItem
          to="/investment"
          $isActive={
            location.pathname === '/investment' ||
            location.pathname === '/investment-register'
          }
        >
          <IconWrapper
            $isActive={
              location.pathname === '/investment' ||
              location.pathname === '/investment-register'
            }
          >
            <InvestmentIcon />
          </IconWrapper>
          투자 예정지
        </TabItem>
        <TabItem to="/my-page" $isActive={location.pathname === '/my-page'}>
          <IconWrapper $isActive={location.pathname === '/my-page'}>
            <UserIcon />
          </IconWrapper>
          마이 페이지
        </TabItem>
      </TabContainer>
    </>
  );
}

export default BottomTab;
