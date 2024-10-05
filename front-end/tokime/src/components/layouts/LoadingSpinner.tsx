import React from 'react';
import styled from 'styled-components';
import loadingimg from '../../assets/images/icon/loading.gif';

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  height: 100vh; /* 전체 화면 높이 */
  position: fixed; /* 화면에 고정 */
  top: 0; /* 상단에서 0 */
  left: 0; /* 좌측에서 0 */
  width: 100%; /* 전체 너비 */
  background: rgba(
    255,
    255,
    255,
    0.8
  ); /* 배경을 약간 투명하게 설정 (선택 사항) */
  z-index: 999; /* 다른 요소 위에 표시 */
`;

const LoadingImage = styled.img`
  width: 290px; /* 이미지 너비 */
  height: 230px; /* 이미지 높이 */
`;

const LoadingSpinner = () => {
  return (
    <SpinnerContainer>
      <div style={{ textAlign: 'center' }}>
        <LoadingImage src={loadingimg} alt="Loading..." />
      </div>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
