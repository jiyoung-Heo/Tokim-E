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
      자연환경보전지역:
        "'자연환경보전지역'은 자연환경, 수자원, 해안, 생태계 등을 보호하기 위한 지역입니다. (건폐율 20% 이하, 용적률 50% 이상 80% 이하).",
      일반상업지역:
        "'일반상업지역'은 도시의 상업, 업무기능을 담당하며, 주거 기능이 혼재된 지역입니다. (건폐율 90% 이하, 용적률 400% 이상 1300% 이하).",
      중심상업지역:
        "'중심상업지역'은 도심의 주요 상업기능을 담당하는 지역입니다. (건폐율 90% 이하, 용적률 400% 이상 1300% 이하).",
      근린상업지역:
        "'근린상업지역'은 주거지 근처에서 상업활동이 이루어질 수 있도록 지정된 지역입니다. (건폐율 70% 이하, 용적률 200% 이상 900% 이하).",
      유통상업지역:
        "'유통상업지역'은 물류 및 유통을 주요 목적으로 하는 상업지역입니다. (건폐율 80% 이하, 용적률 400% 이상 1100% 이하).",
      자연녹지지역:
        "'자연녹지지역'은 자연환경을 유지하면서 제한적인 개발이 허용되는 지역입니다. (건폐율 20% 이하, 용적률 50% 이상 100% 이하).",
      생산녹지지역:
        "'생산녹지지역'은 농업 및 임업 등 생산 활동을 위한 지역으로, 개발이 제한됩니다. (건폐율 20% 이하, 용적률 50% 이상 100% 이하).",
      보전녹지지역:
        "'보전녹지지역'은 산림과 자연을 보호하고 보전하기 위한 지역입니다. (건폐율 20% 이하, 용적률 50% 이상 80% 이하).",
      관리지역:
        "'관리지역'은 도시지역과 비도시지역을 연결하는 중간지역으로, 체계적인 관리와 개발이 필요한 지역입니다. (건폐율 및 용적률은 세부 계획에 따름).",
      농림지역:
        "'농림지역'은 농업, 임업 등의 목적으로 사용되며 개발이 제한된 지역입니다. (건폐율 20% 이하, 용적률 80% 이하).",
      도시지역:
        "'도시지역'은 주거, 상업, 공업, 녹지 등 다양한 용도로 지정된 지역입니다. (건폐율 및 용적률은 세부 계획에 따름).",
      개발제한구역:
        "'개발제한구역'은 도시의 무질서한 확산을 방지하고 자연환경을 보호하기 위한 지역입니다. (개발이 엄격히 제한됨).",
      // 기본 값
      default: "'용도지역'에 대한 설명이 없습니다.",
    };

    return `${
      descriptions[landUse]
    }\n건폐율과 용적률은 조례에 따라 달라질 수 있습니다.`;
  };

  const getLandUseStatusDescription = (landUseStatus: string) => {
    const descriptions: { [key: string]: string } = {
      단독: "'단독'은 단독주택, 다중주택, 다가구주택, 공관을 포함합니다.",
      연립: "'연립'은 주택으로 쓰이는 1개 동의 바닥면적(지하주차장 면적 제외)의 합계가 660㎡를 초과하고, 층수가 4개층 이하인 공동 주택용지입니다.",
      다세대:
        "'다세대'는 동당 건축연면적이 660㎡ 이하인 4층 이하의 공동주택용지입니다.",
      아파트:
        "'아파트'는 주택으로 쓰이는 층수가 5개층 이상인 공동주택용지입니다.",
      주거나지:
        "'주거나지'는 가까운 장래에 주택용지로 개발될 가능성이 높은 토지입니다.",
      주거기타:
        "'주거기타'는 관공서, 교육시설, 종교시설 또는 창고 등으로 이용되는 토지입니다.",
      상업용:
        "'상업용'은 상가, 시장, 서비스업 등의 영업 목적으로 사용되는 건물부지입니다.",
      업무용: "'업무용'은 은행, 사무실 등 업무용 건물부지입니다.",
      상업나지:
        "'상업나지'는 상업용이나 업무용으로 개발될 가능성이 높은 토지입니다.",
      상업기타:
        "'상업기타'는 관공서, 교육시설, 종교시설 등으로 이용되는 상업지입니다.",
      주상용: "'주상용'은 주거용과 상업용이 혼재된 건물부지입니다.",
      주상나지: "'주상나지'는 주상복합용으로 개발될 가능성이 높은 토지입니다.",
      주상기타:
        "'주상기타'는 관공서, 교육시설, 종교시설 등으로 이용되는 주상복합지입니다.",
      공업용: "'공업용'은 제조업에 이용되는 토지입니다.",
      공업나지: "'공업나지'는 공업용으로 개발될 가능성이 높은 토지입니다.",
      공업기타:
        "'공업기타'는 관공서, 교육시설, 창고 등으로 이용되는 공업지입니다.",
      전: "'전'은 곡물, 원예작물 등을 재배하는 토지입니다.",
      과수원: "'과수원'은 과수류를 집단적으로 재배하는 토지입니다.",
      전기타: "'전기타'는 관공서, 교육시설, 종교시설 등으로 이용되는 전입니다.",
      전창고: "'전창고'는 농협, 수협 창고 등으로 이용되는 전입니다.",
      전축사: "'전축사'는 축사 등으로 이용되는 전입니다.",
      답: "'답'은 벼나 미나리 등을 재배하는 토지입니다.",
      답기타: "'답기타'는 관공서, 교육시설 등으로 이용되는 답입니다.",
      답창고: "'답창고'는 농협, 수협 창고 등으로 이용되는 답입니다.",
      답축사: "'답축사'는 돈사, 계사 등으로 이용되는 답입니다.",
      조림: "'조림'은 계획조림지로 조성된 임야입니다.",
      자연림: "'자연림'은 자연상태의 임야입니다.",
      토지임야: "'토지임야'는 경작지 또는 도시 주변의 구릉지 임야입니다.",
      목장용지: "'목장용지'는 축산업 및 낙농업을 위한 토지입니다.",
      임야기타:
        "'임야기타'는 임야로서 관공서, 종교시설 등으로 이용되는 토지입니다.",
      광천지: "'광천지'는 지하에서 온수, 약수 등이 용출되는 토지입니다.",
      광업용지: "'광업용지'는 광산, 특수채석장 용지입니다.",
      염전: "'염전'은 소금을 채취하기 위한 토지입니다.",
      양어: "'양어'는 양어장을 위한 토지입니다.",
      유원지: "'유원지'는 위락 및 휴양을 위한 시설이 있는 토지입니다.",
      야영: "'야영'은 야영시설을 갖춘 토지입니다.",
      공원묘지: "'공원묘지'는 사설공원묘지입니다.",
      회원제: "'회원제'는 회원제 골프장을 위한 토지입니다.",
      대중제: "'대중제'는 대중 골프장을 위한 토지입니다.",
      간이: "'간이'는 간이골프장을 위한 토지입니다.",
      스키장: "'스키장'은 스키를 위한 용지입니다.",
      경마장: "'경마장'은 경마를 위한 토지입니다.",
      승마장: "'승마장'은 승마를 위한 토지입니다.",
      터미널: "'터미널'은 여객자동차터미널 부지입니다.",
      콘도: "'콘도'는 관광객의 숙박 및 취사 시설을 갖춘 토지입니다.",
      공항: "'공항'은 항공기의 이착륙 및 관련 시설을 위한 토지입니다.",
      휴게소: "'휴게소'는 승객과 운전자의 편의시설 부지입니다.",
      매립: "'매립'은 바다나 강을 메워 만든 토지입니다.",
      발전소: "'발전소'는 수력, 화력, 원자력 발전소 용지입니다.",
      특수기타: "'특수기타'는 특정하기 어려운 특수용도 토지입니다.",
      도로: "'도로'는 도로와 철도 등을 위한 토지입니다.",
      하천: "'하천'은 하천과 제방 등을 포함한 토지입니다.",
      공원: "'공원'은 도시공원을 위한 토지입니다.",
      운동장: "'운동장'은 운동장, 체육시설 등을 위한 토지입니다.",
      주차장: "'주차장'은 주차장 및 정류장을 위한 토지입니다.",
      위험시설: "'위험시설'은 송유설비 등의 위험시설을 위한 토지입니다.",
      유해혐오: "'유해.혐오'는 화장장, 쓰레기처리장 등의 토지입니다.",
      기타: "'기타'는 기타 용도로 이용되는 토지입니다.",
    };

    return (
      descriptions[landUseStatus] || `'토지이용상황'에 대한 설명이 없습니다.`
    );
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
                label: '토지이용상황',
                value: detail.landUseStatus,
                tooltip: getLandUseStatusDescription(detail.landUseStatus),
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
