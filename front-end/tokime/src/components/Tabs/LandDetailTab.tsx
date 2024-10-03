// import React, { useEffect, useState } from 'react';
// import { getSearchLandInfo } from '../../api/landAxios';

// interface LandDetail {
//   landId: string;
//   landDistrictCode: number;
//   landDistrict: string;
//   landAddress: string;
//   landAddressName: string;
//   landScale: number;
//   landUse: string;
//   landUseStatus: string;
//   landGradient: string;
//   landRoad: string;
//   landPrice: number;
//   landDanger: number;
// }

// interface LandDetailTabProps {
//   district: string;
//   address: string;
// }

// const LandDetailTab = ({ district, address }: LandDetailTabProps) => {
//   const [landDetails, setLandDetails] = useState<LandDetail[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [showInfo, setShowInfo] = useState<{ [key: string]: boolean }>({});

//   const toggleInfo = (key: string) => {
//     setShowInfo((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   useEffect(() => {
//     const fetchLandDetails = async () => {
//       try {
//         const data = await getSearchLandInfo(district, address);
//         if (data) {
//           setLandDetails(data);
//         } else {
//           setError('데이터를 가져오는 중 오류가 발생했습니다.');
//         }
//       } catch (err) {
//         setError('데이터를 가져오는 중 오류가 발생했습니다.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (district && address) {
//       fetchLandDetails();
//     }
//   }, [district, address]);

//   if (loading) {
//     return <div>주소를 먼저 입력해주세요.</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       <h2>토지 상세 정보</h2>
//       {landDetails.length > 0 ? (
//         landDetails.map((detail) => (
//           <div
//             key={detail.landId}
//             style={{ position: 'relative', marginBottom: '16px' }}
//           >
//             <p>
//               주소: {detail.landDistrict} {detail.landAddress}
//             </p>

//             {/* 면적 */}
//             <p>
//               면적: {detail.landScale}㎡
//               <button
//                 type="button"
//                 style={{
//                   background: 'none',
//                   border: 'none',
//                   cursor: 'pointer',
//                   padding: 0,
//                   marginLeft: '8px',
//                   width: '16px',
//                   height: '16px',
//                 }}
//                 onClick={() => toggleInfo(`landScale-${detail.landId}`)}
//                 aria-label="토지 면적 정보"
//               >
//                 <img
//                   src="/icons/information.png"
//                   alt="info"
//                   style={{ width: '16px', height: '16px' }}
//                 />
//               </button>
//               {showInfo[`landScale-${detail.landId}`] && (
//                 <span
//                   style={{
//                     position: 'absolute',
//                     backgroundColor: '#333',
//                     color: '#fff',
//                     padding: '4px 8px',
//                     borderRadius: '4px',
//                     top: '20px',
//                     left: '0',
//                     whiteSpace: 'nowrap',
//                     zIndex: 100,
//                   }}
//                 >
//                   토지의 평수는 {(detail.landScale * 0.3025).toFixed(2)}평
//                   입니다.
//                   <span
//                     style={{
//                       content: '""',
//                       position: 'absolute',
//                       top: '-5px',
//                       left: '10px',
//                       borderWidth: '5px',
//                       borderStyle: 'solid',
//                       borderColor: 'transparent transparent #333 transparent',
//                     }}
//                   />
//                 </span>
//               )}
//             </p>

//             {/* 용도 */}
//             <p>
//               용도: {detail.landUse}
//               <button
//                 type="button"
//                 style={{
//                   background: 'none',
//                   border: 'none',
//                   cursor: 'pointer',
//                   padding: 0,
//                   marginLeft: '8px',
//                   width: '16px',
//                   height: '16px',
//                 }}
//                 onClick={() => toggleInfo(`landUse-${detail.landId}`)}
//                 aria-label="토지 용도 정보"
//               >
//                 <img
//                   src="/icons/information.png"
//                   alt="info"
//                   style={{ width: '16px', height: '16px' }}
//                 />
//               </button>
//               {showInfo[`landUse-${detail.landId}`] && (
//                 <span
//                   style={{
//                     position: 'absolute',
//                     backgroundColor: '#333',
//                     color: '#fff',
//                     padding: '4px 8px',
//                     borderRadius: '4px',
//                     top: '20px',
//                     left: '0',
//                     whiteSpace: 'nowrap',
//                     zIndex: 100,
//                   }}
//                 >
//                   토지의 용도는 해당 법적 용도에 따라 다릅니다.
//                   <span
//                     style={{
//                       content: '""',
//                       position: 'absolute',
//                       top: '-5px',
//                       left: '10px',
//                       borderWidth: '5px',
//                       borderStyle: 'solid',
//                       borderColor: 'transparent transparent #333 transparent',
//                     }}
//                   />
//                 </span>
//               )}
//             </p>

//             {/* 용도 상태 */}
//             <p>
//               용도 상태: {detail.landUseStatus}
//               <button
//                 type="button"
//                 style={{
//                   background: 'none',
//                   border: 'none',
//                   cursor: 'pointer',
//                   padding: 0,
//                   marginLeft: '8px',
//                   width: '16px',
//                   height: '16px',
//                 }}
//                 onClick={() => toggleInfo(`landUseStatus-${detail.landId}`)}
//                 aria-label="토지 용도 상태 정보"
//               >
//                 <img
//                   src="/icons/information.png"
//                   alt="info"
//                   style={{ width: '16px', height: '16px' }}
//                 />
//               </button>
//               {showInfo[`landUseStatus-${detail.landId}`] && (
//                 <span
//                   style={{
//                     position: 'absolute',
//                     backgroundColor: '#333',
//                     color: '#fff',
//                     padding: '4px 8px',
//                     borderRadius: '4px',
//                     top: '20px',
//                     left: '0',
//                     whiteSpace: 'nowrap',
//                     zIndex: 100,
//                   }}
//                 >
//                   용도 상태는 현재 토지의 이용 가능 상태를 나타냅니다.
//                   <span
//                     style={{
//                       content: '""',
//                       position: 'absolute',
//                       top: '-5px',
//                       left: '10px',
//                       borderWidth: '5px',
//                       borderStyle: 'solid',
//                       borderColor: 'transparent transparent #333 transparent',
//                     }}
//                   />
//                 </span>
//               )}
//             </p>

//             {/* 지형 */}
//             <p>
//               지형: {detail.landGradient}
//               <button
//                 type="button"
//                 style={{
//                   background: 'none',
//                   border: 'none',
//                   cursor: 'pointer',
//                   padding: 0,
//                   marginLeft: '8px',
//                   width: '16px',
//                   height: '16px',
//                 }}
//                 onClick={() => toggleInfo(`landGradient-${detail.landId}`)}
//                 aria-label="토지 지형 정보"
//               >
//                 <img
//                   src="/icons/information.png"
//                   alt="info"
//                   style={{ width: '16px', height: '16px' }}
//                 />
//               </button>
//               {showInfo[`landGradient-${detail.landId}`] && (
//                 <span
//                   style={{
//                     position: 'absolute',
//                     backgroundColor: '#333',
//                     color: '#fff',
//                     padding: '4px 8px',
//                     borderRadius: '4px',
//                     top: '20px',
//                     left: '0',
//                     whiteSpace: 'nowrap',
//                     zIndex: 100,
//                   }}
//                 >
//                   지형은 토지의 경사를 나타냅니다.
//                   <span
//                     style={{
//                       content: '""',
//                       position: 'absolute',
//                       top: '-5px',
//                       left: '10px',
//                       borderWidth: '5px',
//                       borderStyle: 'solid',
//                       borderColor: 'transparent transparent #333 transparent',
//                     }}
//                   />
//                 </span>
//               )}
//             </p>

//             {/* 도로 */}
//             <p>
//               도로: {detail.landRoad}
//               <button
//                 type="button"
//                 style={{
//                   background: 'none',
//                   border: 'none',
//                   cursor: 'pointer',
//                   padding: 0,
//                   marginLeft: '8px',
//                   width: '16px',
//                   height: '16px',
//                 }}
//                 onClick={() => toggleInfo(`landRoad-${detail.landId}`)}
//                 aria-label="토지 도로 정보"
//               >
//                 <img
//                   src="/icons/information.png"
//                   alt="info"
//                   style={{ width: '16px', height: '16px' }}
//                 />
//               </button>
//               {showInfo[`landRoad-${detail.landId}`] && (
//                 <span
//                   style={{
//                     position: 'absolute',
//                     backgroundColor: '#333',
//                     color: '#fff',
//                     padding: '4px 8px',
//                     borderRadius: '4px',
//                     top: '20px',
//                     left: '0',
//                     whiteSpace: 'nowrap',
//                     zIndex: 100,
//                   }}
//                 >
//                   도로는 토지에 접근 가능한 경로를 나타냅니다.
//                   <span
//                     style={{
//                       content: '""',
//                       position: 'absolute',
//                       top: '-5px',
//                       left: '10px',
//                       borderWidth: '5px',
//                       borderStyle: 'solid',
//                       borderColor: 'transparent transparent #333 transparent',
//                     }}
//                   />
//                 </span>
//               )}
//             </p>

//             {/* 가격 */}
//             <p>
//               가격: {detail.landPrice} 원
//               <button
//                 type="button"
//                 style={{
//                   background: 'none',
//                   border: 'none',
//                   cursor: 'pointer',
//                   padding: 0,
//                   marginLeft: '8px',
//                   width: '16px',
//                   height: '16px',
//                 }}
//                 onClick={() => toggleInfo(`landPrice-${detail.landId}`)}
//                 aria-label="토지 가격 정보"
//               >
//                 <img
//                   src="/icons/information.png"
//                   alt="info"
//                   style={{ width: '16px', height: '16px' }}
//                 />
//               </button>
//               {showInfo[`landPrice-${detail.landId}`] && (
//                 <span
//                   style={{
//                     position: 'absolute',
//                     backgroundColor: '#333',
//                     color: '#fff',
//                     padding: '4px 8px',
//                     borderRadius: '4px',
//                     top: '20px',
//                     left: '0',
//                     whiteSpace: 'nowrap',
//                     zIndex: 100,
//                   }}
//                 >
//                   가격은 현재 토지의 시장 가치를 나타냅니다.
//                   <span
//                     style={{
//                       content: '""',
//                       position: 'absolute',
//                       top: '-5px',
//                       left: '10px',
//                       borderWidth: '5px',
//                       borderStyle: 'solid',
//                       borderColor: 'transparent transparent #333 transparent',
//                     }}
//                   />
//                 </span>
//               )}
//             </p>

//             {/* 위험 */}
//             <p>
//               개발 가능성: {detail.landDanger}
//               <button
//                 type="button"
//                 style={{
//                   background: 'none',
//                   border: 'none',
//                   cursor: 'pointer',
//                   padding: 0,
//                   marginLeft: '8px',
//                   width: '16px',
//                   height: '16px',
//                 }}
//                 onClick={() => toggleInfo(`landDanger-${detail.landId}`)}
//                 aria-label="토지 개발 가능성"
//               >
//                 <img
//                   src="/icons/information.png"
//                   alt="info"
//                   style={{ width: '16px', height: '16px' }}
//                 />
//               </button>
//               {showInfo[`landDanger-${detail.landId}`] && (
//                 <span
//                   style={{
//                     position: 'absolute',
//                     backgroundColor: '#333',
//                     color: '#fff',
//                     padding: '4px 8px',
//                     borderRadius: '4px',
//                     top: '20px',
//                     left: '0',
//                     whiteSpace: 'nowrap',
//                     zIndex: 100,
//                   }}
//                 >
//                   개발 가능성
//                   <span
//                     style={{
//                       content: '""',
//                       position: 'absolute',
//                       top: '-5px',
//                       left: '10px',
//                       borderWidth: '5px',
//                       borderStyle: 'solid',
//                       borderColor: 'transparent transparent #333 transparent',
//                     }}
//                   />
//                 </span>
//               )}
//             </p>
//           </div>
//         ))
//       ) : (
//         <p>해당 주소에 대한 토지 정보가 없습니다.</p>
//       )}
//     </div>
//   );
// };

// export default LandDetailTab;

import React, { useEffect, useState, useRef } from 'react'; // 필요한 모듈 import
import { getSearchLandInfo } from '../../api/landAxios'; // API 호출 함수 import

// 토지 상세 정보 인터페이스
interface LandDetail {
  landId: string; // 토지 ID
  landDistrictCode: number; // 구역 코드
  landDistrict: string; // 구역 이름
  landAddress: string; // 주소
  landAddressName: string; // 주소 이름
  landScale: number; // 면적
  landUse: string; // 용도
  landUseStatus: string; // 용도 상태
  landGradient: string; // 지형
  landRoad: string; // 도로
  landPrice: number; // 가격
  landDanger: number; // 개발 가능성
}

// 컴포넌트의 props 인터페이스
interface LandDetailTabProps {
  district: string; // 구역
  address: string; // 주소
}

const LandDetailTab = ({ district, address }: LandDetailTabProps) => {
  // 상태 정의
  const [landDetails, setLandDetails] = useState<LandDetail[]>([]); // 토지 상세 정보를 저장할 상태
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태
  const [showInfo, setShowInfo] = useState<{ [key: string]: boolean }>({}); // 툴팁의 가시성을 관리하는 상태
  const tooltipRef = useRef<HTMLDivElement | null>(null); // 툴팁 컨테이너를 위한 ref

  // 툴팁의 가시성을 토글하는 함수
  const toggleInfo = (key: string) => {
    setShowInfo((prev) => ({
      ...prev,
      [key]: !prev[key], // 해당 키의 가시성을 반전
    }));
  };

  // 툴팁 이외의 영역을 클릭했을 때 툴팁을 닫는 함수
  const handleClickOutside = (event: MouseEvent) => {
    if (
      tooltipRef.current &&
      !tooltipRef.current.contains(event.target as Node)
    ) {
      setShowInfo({}); // 모든 툴팁 닫기
    }
  };

  useEffect(() => {
    // 구역과 주소에 따라 토지 상세 정보를 가져오는 함수
    const fetchLandDetails = async () => {
      try {
        const data = await getSearchLandInfo(district, address); // API 호출
        if (data) {
          setLandDetails(data); // 데이터가 있으면 상태 업데이트
        } else {
          setError('데이터를 가져오는 중 오류가 발생했습니다.'); // 데이터 오류 메시지
        }
      } catch (err) {
        setError('데이터를 가져오는 중 오류가 발생했습니다.'); // API 호출 오류 메시지
      } finally {
        setLoading(false); // 로딩 상태 변경
      }
    };

    // 툴팁 외부 클릭 이벤트 리스너 추가
    document.addEventListener('mousedown', handleClickOutside);

    if (district && address) {
      fetchLandDetails(); // 구역과 주소가 있을 때 정보 가져오기
    }

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 정리
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [district, address]); // 의존성 배열

  // 로딩 중일 경우
  if (loading) {
    return <div>주소를 먼저 입력해주세요.</div>; // 로딩 메시지
  }

  // 에러가 있을 경우
  if (error) {
    return <div>{error}</div>; // 에러 메시지
  }

  return (
    <div>
      <h2>토지 상세 정보</h2>
      {landDetails.length > 0 ? (
        landDetails.map((detail) => (
          <div
            key={detail.landId}
            style={{ position: 'relative', marginBottom: '16px' }}
            ref={tooltipRef} // 툴팁 참조 추가
          >
            <p>
              주소: {detail.landDistrict} {detail.landAddress}
            </p>

            {/* 면적 */}
            <p>
              면적: {detail.landScale}㎡
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  marginLeft: '8px',
                  width: '16px',
                  height: '16px',
                }}
                onClick={() => toggleInfo(`landScale-${detail.landId}`)} // 면적 툴팁 토글
                aria-label="토지 면적 정보"
              >
                <img
                  src="/icons/information.png"
                  alt="info"
                  style={{ width: '16px', height: '16px' }}
                />
              </button>
              {showInfo[`landScale-${detail.landId}`] && (
                <span
                  style={{
                    position: 'absolute',
                    backgroundColor: '#333',
                    color: '#fff',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    top: '20px',
                    left: '0',
                    whiteSpace: 'nowrap',
                    zIndex: 100,
                  }}
                >
                  토지의 평수는 {(detail.landScale * 0.3025).toFixed(2)}
                  평입니다.
                  <span
                    style={{
                      content: '""',
                      position: 'absolute',
                      top: '-5px',
                      left: '10px',
                      borderWidth: '5px',
                      borderStyle: 'solid',
                      borderColor: 'transparent transparent #333 transparent',
                    }}
                  />
                </span>
              )}
            </p>

            {/* 용도 */}
            <p>
              용도: {detail.landUse}
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  marginLeft: '8px',
                  width: '16px',
                  height: '16px',
                }}
                onClick={() => toggleInfo(`landUse-${detail.landId}`)} // 용도 툴팁 토글
                aria-label="토지 용도 정보"
              >
                <img
                  src="/icons/information.png"
                  alt="info"
                  style={{ width: '16px', height: '16px' }}
                />
              </button>
              {showInfo[`landUse-${detail.landId}`] && (
                <span
                  style={{
                    position: 'absolute',
                    backgroundColor: '#333',
                    color: '#fff',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    top: '20px',
                    left: '0',
                    whiteSpace: 'nowrap',
                    zIndex: 100,
                  }}
                >
                  토지의 용도는 해당 법적 용도에 따라 다릅니다.
                  <span
                    style={{
                      content: '""',
                      position: 'absolute',
                      top: '-5px',
                      left: '10px',
                      borderWidth: '5px',
                      borderStyle: 'solid',
                      borderColor: 'transparent transparent #333 transparent',
                    }}
                  />
                </span>
              )}
            </p>

            {/* 용도 상태 */}
            <p>
              용도 상태: {detail.landUseStatus}
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  marginLeft: '8px',
                  width: '16px',
                  height: '16px',
                }}
                onClick={() => toggleInfo(`landUseStatus-${detail.landId}`)} // 용도 상태 툴팁 토글
                aria-label="토지 용도 상태 정보"
              >
                <img
                  src="/icons/information.png"
                  alt="info"
                  style={{ width: '16px', height: '16px' }}
                />
              </button>
              {showInfo[`landUseStatus-${detail.landId}`] && (
                <span
                  style={{
                    position: 'absolute',
                    backgroundColor: '#333',
                    color: '#fff',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    top: '20px',
                    left: '0',
                    whiteSpace: 'nowrap',
                    zIndex: 100,
                  }}
                >
                  용도 상태는 현재 토지의 이용 가능 상태를 나타냅니다.
                  <span
                    style={{
                      content: '""',
                      position: 'absolute',
                      top: '-5px',
                      left: '10px',
                      borderWidth: '5px',
                      borderStyle: 'solid',
                      borderColor: 'transparent transparent #333 transparent',
                    }}
                  />
                </span>
              )}
            </p>

            {/* 지형 */}
            <p>
              지형: {detail.landGradient}
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  marginLeft: '8px',
                  width: '16px',
                  height: '16px',
                }}
                onClick={() => toggleInfo(`landGradient-${detail.landId}`)} // 지형 툴팁 토글
                aria-label="토지 지형 정보"
              >
                <img
                  src="/icons/information.png"
                  alt="info"
                  style={{ width: '16px', height: '16px' }}
                />
              </button>
              {showInfo[`landGradient-${detail.landId}`] && (
                <span
                  style={{
                    position: 'absolute',
                    backgroundColor: '#333',
                    color: '#fff',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    top: '20px',
                    left: '0',
                    whiteSpace: 'nowrap',
                    zIndex: 100,
                  }}
                >
                  토지의 지형 정보입니다.
                  <span
                    style={{
                      content: '""',
                      position: 'absolute',
                      top: '-5px',
                      left: '10px',
                      borderWidth: '5px',
                      borderStyle: 'solid',
                      borderColor: 'transparent transparent #333 transparent',
                    }}
                  />
                </span>
              )}
            </p>

            {/* 도로 */}
            <p>
              도로: {detail.landRoad}
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  marginLeft: '8px',
                  width: '16px',
                  height: '16px',
                }}
                onClick={() => toggleInfo(`landRoad-${detail.landId}`)} // 도로 툴팁 토글
                aria-label="토지 도로 정보"
              >
                <img
                  src="/icons/information.png"
                  alt="info"
                  style={{ width: '16px', height: '16px' }}
                />
              </button>
              {showInfo[`landRoad-${detail.landId}`] && (
                <span
                  style={{
                    position: 'absolute',
                    backgroundColor: '#333',
                    color: '#fff',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    top: '20px',
                    left: '0',
                    whiteSpace: 'nowrap',
                    zIndex: 100,
                  }}
                >
                  도로 정보입니다.
                  <span
                    style={{
                      content: '""',
                      position: 'absolute',
                      top: '-5px',
                      left: '10px',
                      borderWidth: '5px',
                      borderStyle: 'solid',
                      borderColor: 'transparent transparent #333 transparent',
                    }}
                  />
                </span>
              )}
            </p>

            {/* 가격 */}
            <p>
              가격: {detail.landPrice} 원
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  marginLeft: '8px',
                  width: '16px',
                  height: '16px',
                }}
                onClick={() => toggleInfo(`landPrice-${detail.landId}`)} // 가격 툴팁 토글
                aria-label="토지 가격 정보"
              >
                <img
                  src="/icons/information.png"
                  alt="info"
                  style={{ width: '16px', height: '16px' }}
                />
              </button>
              {showInfo[`landPrice-${detail.landId}`] && (
                <span
                  style={{
                    position: 'absolute',
                    backgroundColor: '#333',
                    color: '#fff',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    top: '20px',
                    left: '0',
                    whiteSpace: 'nowrap',
                    zIndex: 100,
                  }}
                >
                  가격 정보입니다.
                  <span
                    style={{
                      content: '""',
                      position: 'absolute',
                      top: '-5px',
                      left: '10px',
                      borderWidth: '5px',
                      borderStyle: 'solid',
                      borderColor: 'transparent transparent #333 transparent',
                    }}
                  />
                </span>
              )}
            </p>

            {/* 개발 가능성 */}
            <p>
              개발 가능성: {detail.landDanger}
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  marginLeft: '8px',
                  width: '16px',
                  height: '16px',
                }}
                onClick={() => toggleInfo(`landDanger-${detail.landId}`)} // 개발 가능성 툴팁 토글
                aria-label="토지 개발 가능성 정보"
              >
                <img
                  src="/icons/information.png"
                  alt="info"
                  style={{ width: '16px', height: '16px' }}
                />
              </button>
              {showInfo[`landDanger-${detail.landId}`] && (
                <span
                  style={{
                    position: 'absolute',
                    backgroundColor: '#333',
                    color: '#fff',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    top: '20px',
                    left: '0',
                    whiteSpace: 'nowrap',
                    zIndex: 100,
                  }}
                >
                  개발 가능성 정보입니다.
                  <span
                    style={{
                      content: '""',
                      position: 'absolute',
                      top: '-5px',
                      left: '10px',
                      borderWidth: '5px',
                      borderStyle: 'solid',
                      borderColor: 'transparent transparent #333 transparent',
                    }}
                  />
                </span>
              )}
            </p>
          </div>
        ))
      ) : (
        <div>토지 정보가 없습니다.</div> // 토지 정보가 없을 때 메시지
      )}
    </div>
  );
};

export default LandDetailTab; // 컴포넌트 내보내기
