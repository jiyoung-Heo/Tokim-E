// // LandDetailTab.tsx
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

// function LandDetailTab({ district, address }: LandDetailTabProps) {
//   const [landDetails, setLandDetails] = useState<LandDetail[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchLandDetails = async () => {
//       try {
//         const data = await getSearchLandInfo(district, address); // 수정된 부분
//         if (data) {
//           setLandDetails(data); // 데이터를 상태에 저장
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
//           <div key={detail.landId}>
//             <p>
//               주소: {detail.landDistrict} {detail.landAddress}
//             </p>
//             <p>면적: {detail.landScale}㎡</p>
//             <p>용도: {detail.landUse}</p>
//             <p>용도 상태: {detail.landUseStatus}</p>
//             <p>지형: {detail.landGradient}</p>
//             <p>도로: {detail.landRoad}</p>
//             <p>가격: ㎡당 {detail.landPrice.toLocaleString()} 원</p>
//             <p>개발가능성: {detail.landDanger}</p>
//           </div>
//         ))
//       ) : (
//         <div>상세 정보가 없습니다.</div>
//       )}
//     </div>
//   );
// }

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
                type="button" // type 속성 추가
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  marginLeft: '8px',
                  width: '16px',
                  height: '16px',
                }}
                onClick={() => toggleInfo(`landScale-${detail.landId}`)}
                aria-label="토지 면적 정보"
              >
                <img
                  src="../../assets/images/icon/information.png"
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
                type="button" // type 속성 추가
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  marginLeft: '8px',
                  width: '16px',
                  height: '16px',
                }}
                onClick={() => toggleInfo(`landUse-${detail.landId}`)}
                aria-label="토지 용도 정보"
              >
                <img
                  src="../../assets/images/icon/information.png"
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
                type="button" // type 속성 추가
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  marginLeft: '8px',
                  width: '16px',
                  height: '16px',
                }}
                onClick={() => toggleInfo(`landUseStatus-${detail.landId}`)}
                aria-label="토지 용도 상태 정보"
              >
                <img
                  src="../../assets/images/icon/information.png"
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
                type="button" // type 속성 추가
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  marginLeft: '8px',
                  width: '16px',
                  height: '16px',
                }}
                onClick={() => toggleInfo(`landGradient-${detail.landId}`)}
                aria-label="토지 지형 정보"
              >
                <img
                  src="../../assets/images/icon/information.png"
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
                type="button" // type 속성 추가
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  marginLeft: '8px',
                  width: '16px',
                  height: '16px',
                }}
                onClick={() => toggleInfo(`landRoad-${detail.landId}`)}
                aria-label="토지 도로 정보"
              >
                <img
                  src="../../assets/images/icon/information.png"
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
                  도로 정보는 해당 토지와 인접한 도로의 상태를 나타냅니다.
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
              가격: {detail.landPrice.toLocaleString()} 원
              <button
                type="button" // type 속성 추가
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  marginLeft: '8px',
                  width: '16px',
                  height: '16px',
                }}
                onClick={() => toggleInfo(`landPrice-${detail.landId}`)}
                aria-label="토지 가격 정보"
              >
                <img
                  src="../../assets/images/icon/information.png"
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
                  가격 정보는 해당 토지의 현재 시장 가격을 나타냅니다.
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
              개발 가능성: {detail.landDanger}%
              <button
                type="button" // type 속성 추가
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  marginLeft: '8px',
                  width: '16px',
                  height: '16px',
                }}
                onClick={() => toggleInfo(`landDanger-${detail.landId}`)}
                aria-label="토지 개발 가능성 정보"
              >
                <img
                  src="../../assets/images/icon/information.png"
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
                  개발 가능성은 해당 토지가 개발될 가능성을 퍼센트로 나타냅니다.
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
        <div>상세 정보가 없습니다.</div>
      )}
    </div>
  );
};

export default LandDetailTab;
