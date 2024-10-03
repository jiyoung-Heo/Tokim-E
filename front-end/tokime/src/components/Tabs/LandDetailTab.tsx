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

  const closeInfo = (key: string) => {
    setShowInfo((prev) => ({
      ...prev,
      [key]: false,
    }));
  };

  const handleKeyDown = (key: string, event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleInfo(key);
    }
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

  const getLandUseDescription = (landUse: string) => {
    const descriptions: { [key: string]: string } = {
      계획관리지역:
        "'계획관리지역'은 도시지역으로의 편입이 예상되는 지역이나 자연환경을 고려하여 제한적인 이용과 개발을 하려는 지역으로서 계획적이고 체계적인 관리가 필요한 지역입니다. (건폐율 40% 이하, 용적률 50% 이상 100% 이하).",
      생산관리지역:
        "'생산관리지역'은 농업, 임업, 어업 생산 등을 위하여 관리가 필요하나, 주변 용도지역과의 관계 등을 고려할 때 농림지역으로 지정하여 관리하기가 곤란한 지역입니다. (건폐율 20% 이하, 용적률 50% 이상 80% 이하).",
      보전관리지역:
        "'보전관리지역'은 자연환경 보호, 산림 보호, 수질오염 방지, 녹지공간 확보 및 생태계 보전 등을 위하여 보전이 필요하나, 주변 용도지역과의 관계 등을 고려할 때 자연환경보전지역으로 지정하여 관리하기가 곤란한 지역입니다. (건폐율 20% 이하, 용적률 50% 이상 80% 이하).",
      준주거지역:
        "'준주거지역'은 주거기능을 위주로 이를 지원하는 일부 상업기능 및 업무기능을 보완하기 위한 지역입니다. (건폐율 70% 이하, 용적률 200% 이상 500% 이하).",
      제1종전용주거지역:
        "'제1종전용주거지역'은 단독주택 중심의 지역입니다. (건폐율 50% 이하, 용적률 50% 이상 100% 이하).",
      제2종전용주거지역:
        "'제2종전용주거지역'은 공동주택 중심의 지역입니다. (건폐율 50% 이하, 용적률 100% 이상 150% 이하).",
      // 다른 용도지역들에 대한 설명 추가
      자연환경보전지역:
        "'자연환경보전지역'은 자연환경, 수자원, 해안, 생태계 등을 보호하기 위한 지역입니다. (건폐율 20% 이하, 용적률 50% 이상 80% 이하).",
      // 기본 값
      default: "'용도지역'에 대한 설명이 없습니다.",
    };

    return descriptions[landUse] || descriptions.default;
  };

  const getGradientDescription = (gradient: string) => {
    const descriptions: { [key: string]: string } = {
      저지: '저지란 간선도로 또는 주위의 지형지세보다 현저히 낮은 지대의 토지를 말합니다.',
      평지: '평지란 간선도로 또는 주위의 지형지세의 높이와 비슷하거나 경사도가 미미한 지대의 토지를 말합니다.',
      완경사지:
        '완경사지는 간선도로 또는 주위의 지형지세보다는 높으면서 경사도가 15도 이하인 지대의 토지를 말합니다.',
      급경사지:
        '급경사지는 간선도로 또는 주위의 지형지세보다 높으면서 경사도가 15도를 초과하는 지대의 토지를 말합니다.',
      고지: '고지란 간선도로 또는 주위의 지형지세보다 현저하게 높은 지대의 토지를 말합니다.',
    };

    return descriptions[gradient] || '해당 경사도에 대한 설명이 없습니다.';
  };

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

            {/* 공통 정보 항목을 위한 컴포넌트 생성 */}
            {[
              {
                label: '면적',
                value: `${detail.landScale}㎡`,
                tooltip: `토지의 평수는 ${(detail.landScale * 0.3025).toFixed(2)}평 입니다.`,
                key: `landScale-${detail.landId}`,
              },
              {
                label: '용도지역',
                value: detail.landUse,
                tooltip: getLandUseDescription(detail.landUse),
                key: `landUse-${detail.landId}`,
              },
              {
                label: '용도 상태',
                value: detail.landUseStatus,
                tooltip: `이 토지는 현재 용도 상태가 ${detail.landUseStatus}입니다.`,
                key: `landUseStatus-${detail.landId}`,
              },
              {
                label: '경사도',
                value: detail.landGradient,
                tooltip: getGradientDescription(detail.landGradient),
                key: `landGradient-${detail.landId}`,
              },
              {
                label: '도로',
                value: detail.landRoad,
                tooltip: '도로에 대한 정보입니다.',
                key: `landRoad-${detail.landId}`,
              },
              {
                label: '가격',
                value: `${detail.landPrice} 원`,
                tooltip: '이 가격은 현재 시장 가격을 반영합니다.',
                key: `landPrice-${detail.landId}`,
              },
              {
                label: '위험도',
                value: detail.landDanger.toString(),
                tooltip: '위험도에 대한 정보입니다.',
                key: `landDanger-${detail.landId}`,
              },
            ].map((item) => (
              <div key={item.key}>
                <p style={{ position: 'relative' }}>
                  {item.label}: {item.value}
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
                    onClick={() => toggleInfo(item.key)}
                    onKeyDown={(e) => handleKeyDown(item.key, e)}
                    aria-label={`${item.label} 정보`}
                  >
                    <img
                      src="/icons/information.png"
                      alt="info"
                      style={{ width: '16px', height: '16px' }}
                    />
                  </button>
                  {showInfo[item.key] && (
                    <button
                      type="button"
                      style={{
                        position: 'absolute',
                        backgroundColor: '#333',
                        color: '#fff',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        top: '20px',
                        left: '0px',
                        whiteSpace: 'nowrap',
                        zIndex: 100,
                      }}
                      onClick={() => closeInfo(item.key)}
                      aria-label="정보 닫기"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          closeInfo(item.key);
                        }
                      }}
                    >
                      {item.tooltip}
                      <span
                        style={{
                          content: '""',
                          position: 'absolute',
                          top: '100%',
                          left: '10px',
                          borderWidth: '5px',
                          borderStyle: 'solid',
                          borderColor:
                            'transparent transparent #333 transparent',
                        }}
                      />
                    </button>
                  )}
                </p>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div>토지 정보가 없습니다.</div>
      )}
    </div>
  );
};

export default LandDetailTab;
