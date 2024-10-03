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

import React, { useEffect, useState } from 'react';
import { getSearchLandInfo } from '../../api/landAxios';

interface LandDetail {
  landId: string;
  landDistrictCode: number;
  landDistrict: string;
  landAddress: string;
  landAddressName: string;
  landScale: number;
  landUse: string;
  landUseStatus: string;
  landGradient: string;
  landRoad: string;
  landPrice: number;
  landDanger: number;
}

interface LandDetailTabProps {
  district: string;
  address: string;
}

const LandDetailTab = ({ district, address }: LandDetailTabProps) => {
  const [landDetails, setLandDetails] = useState<LandDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState<{ [key: string]: boolean }>({});

  // 인포메이션 토글 핸들러
  const toggleInfo = (key: string) => {
    setShowInfo((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    const fetchLandDetails = async () => {
      try {
        const data = await getSearchLandInfo(district, address);
        if (data) {
          setLandDetails(data);
        } else {
          setError('데이터를 가져오는 중 오류가 발생했습니다.');
        }
      } catch (err) {
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (district && address) {
      fetchLandDetails();
    }
  }, [district, address]);

  if (loading) {
    return <div>주소를 먼저 입력해주세요.</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>토지 상세 정보</h2>
      {landDetails.length > 0 ? (
        landDetails.map((detail) => (
          <div
            key={detail.landId}
            style={{ position: 'relative', marginBottom: '16px' }}
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
                    left: '25px', // 버튼 오른쪽으로 툴팁 위치
                    whiteSpace: 'nowrap',
                    zIndex: 100,
                  }}
                >
                  토지의 평수는 {(detail.landScale * 0.3025).toFixed(2)}평
                  입니다.
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
                    left: '25px', // 버튼 오른쪽으로 툴팁 위치
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
                    left: '25px', // 버튼 오른쪽으로 툴팁 위치
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
                    left: '25px', // 버튼 오른쪽으로 툴팁 위치
                    whiteSpace: 'nowrap',
                    zIndex: 100,
                  }}
                >
                  지형은 토지의 경사를 나타냅니다.
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
                    left: '25px', // 버튼 오른쪽으로 툴팁 위치
                    whiteSpace: 'nowrap',
                    zIndex: 100,
                  }}
                >
                  도로 정보는 접근성을 나타냅니다.
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
              가격: {detail.landPrice}원
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
                    left: '25px', // 버튼 오른쪽으로 툴팁 위치
                    whiteSpace: 'nowrap',
                    zIndex: 100,
                  }}
                >
                  가격은 현재 토지의 시세를 나타냅니다.
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

            {/* 위험도 */}
            <p>
              위험도: {detail.landDanger}
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
                onClick={() => toggleInfo(`landDanger-${detail.landId}`)} // 위험도 툴팁 토글
                aria-label="토지 위험도 정보"
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
                    left: '25px', // 버튼 오른쪽으로 툴팁 위치
                    whiteSpace: 'nowrap',
                    zIndex: 100,
                  }}
                >
                  위험도는 해당 지역의 위험 요소를 나타냅니다.
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
        <p>토지 정보를 찾을 수 없습니다.</p>
      )}
    </div>
  );
};

export default LandDetailTab;
