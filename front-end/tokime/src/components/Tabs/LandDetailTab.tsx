import styled from 'styled-components';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { setLandDetail } from '../../redux/slices/landInfoSlice';
import { setLawInfo } from '../../redux/slices/lawInfoSlice'; // 액션 임포트
import { getLandLawInfo } from '../../api/landAxios'; // API 임포트
import backIcon from '../../assets/images/icon/left-actionable.png';
import gradientIcon from '../../assets/images/landInfo/gradient.png';
import moneyIcon from '../../assets/images/landInfo/money.png';
import percentageIcon from '../../assets/images/landInfo/percentage.png';
import purposeIcon from '../../assets/images/landInfo/purpose.png';
import roadIcon from '../../assets/images/landInfo/road.png';
import scaleIcon from '../../assets/images/landInfo/scale.png';
import useIcon from '../../assets/images/landInfo/use.png';
import NaverMap from './NaverMap';
import nodataimg from '../../assets/images/Tokimlogo.png';

const BackIcon = styled.img`
  cursor: pointer;
  margin-right: calc(0.5vw + 0.5vh);
`;

const MapBox = styled.div`
  height: 200px;
  margin-top: 1vh;
  margin-bottom: 3vh;
  border: 2px solid #ccc;
  border-radius: 8px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  font-size: 16px;
`;

const InfoBox = styled.div`
  border: 2px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
`;

const LandDetailTab: React.FC = () => {
  const dispatch = useDispatch();
  const landDetails = useSelector(
    (state: RootState) => state.landinfo.landDetails,
  );
  const selectedDetail = useSelector(
    (state: RootState) => state.landinfo.landDetail, // Redux에서 선택된 상세 정보 가져오기
  );
  const [showInfo, setShowInfo] = useState<{ [key: string]: boolean }>({});

  const handleDetailClick = async (detail: any) => {
    dispatch(setLandDetail(detail));

    const lawData = await getLandLawInfo(detail.landDistrictCode); // detail에서 필요한 값을 사용해야 합니다.
    dispatch(setLawInfo(lawData));
  };

  const handleBackClick = () => {
    dispatch(setLandDetail(null));
  };

  const toggleInfo = (key: string) => {
    setShowInfo((prev) => {
      // 이전 상태를 스프레드 연산자를 사용하여 새로운 객체로 복사
      const newShowInfo = { ...prev };

      // 모든 툴팁을 닫음
      Object.keys(newShowInfo).forEach((k) => {
        newShowInfo[k] = false;
      });
      newShowInfo[key] = !prev[key]; // 클릭한 툴팁 상태를 토글

      return newShowInfo; // 새로운 상태를 반환
    });
  };

  const getLandUseDescription = (landUse: string) => {
    const descriptions: { [key: string]: string } = {
      계획관리지역:
        "'계획관리지역'은 도시지역으로의 편입이 예상되는 지역이나 자연환경을 고려하여 제한적인 이용과 개발을 하려는 지역으로서 계획적이고 체계적인 관리가 필요한 지역입니다. (건폐율 40% 이하, 용적률 50% 이상 100% 이하).",
      생산관리지역:
        "'생산관리지역'은 농업, 임업, 어업 생산 등을 위하여 관리가 필요하나, 주변 용도지역과의 관계 등을 고려할 때 농림지역으로 지정하여 관리하기가 곤란한 지역입니다. (건폐율 20% 이하, 용적률 50% 이상 80% 이하).",
      보전관리지역:
        "'보전관리지역'은 자연환경 보호, 산림 보호, 수질오염 방지, 녹지공간 확보 및 생태계 보전 등을 위하여 보전이 필요하나, 주변 용도지역과의 관계 등을 고려할 때 자연환경보전지역으로 지정하여 관리하기가 곤란한 지역입니다. (건폐율 20% 이하, 용적률 50% 이상 80% 이하).",
      준주거지역:
        "'준주거지역'은 주거기능을 위주로 이를 지원하는 일부 상업기능 및 업무기능을 보완하기 위하여 필요한 지역입니다. 주거지역과 상업지역 사이 완충기능이 요구되는 지역 등을 대상으로 지정하며, 장례식장과 공장 등 주거환경 침해 우려가 있는 시설은 주거기능과 분리시켜 배치하고 주변에 완충녹지를 배치합니다. (건폐율 70% 이하, 용적률 200% 이상 500% 이하).",
      제1종전용주거지역:
        "'제1종전용주거지역'은 단독주택 중심이며, 기존에 형성된 양호한 주거환경을 보전할 필요가 있는 지역입니다. 도시자연공원이 연계된 지역 등을 대상으로 지정하고 원칙적으로 주간선도로에 접하여 지정하지 않아야 합니다. (건폐율 50% 이하, 용적률 50% 이상 100% 이하).",
      제2종전용주거지역:
        "'제2종전용주거지역'은 공동주택 중심이며, 기존에 형성된 양호한 주거환경을 보전할 필요가 있는 지역입니다. 도시자연공원이 연계된 지역 등을 대상으로 지정하고 원칙적으로 주간선도로에 접하여 지정하지 않아야 합니다. (건폐율 50% 이하, 용적률 100% 이상 150% 이하).",
      제1종일반주거지역:
        "'제1종일반주거지역'은 저층주택 중심이며, 저층주택, 중층주택 및 고층주택을 적절히 입지시켜 양호한 주거환경을 보호하고 인근의 주거 및 근린생활시설 등과 조화를 이룰 필요가 있는 지역입니다. (건폐율 60% 이하, 용적률 100% 이상 200% 이하).",
      제2종일반주거지역:
        "'제2종일반주거지역'은 중층주택 중심이며, 저층주택, 중층주택 및 고층주택을 적절히 입지시켜 양호한 주거환경을 보호하고 인근의 주거 및 근린생활시설 등과 조화를 이룰 필요가 있는 지역입니다. (건폐율 60% 이하, 용적률 150% 이상 250% 이하).",
      제3종일반주거지역:
        "'제3종일반주거지역'은 중고층주택 중심이며, 저층주택, 중층주택 및 고층주택을 적절히 입지시켜 양호한 주거환경을 보호하고 인근의 주거 및 근린생활시설 등과 조화를 이룰 필요가 있는 지역입니다. (건폐율 50% 이하, 용적률 200% 이상 300% 이하).",
      농림지역:
        "'농림지역'은 도시지역에 속하지 아니한 농업진흥지역 또는 보전산지 등으로서 농림업을 진흥시키고 산림을 보전하기 위해 필요한 지역입니다. (건폐율 20% 이하, 용적률 50%~80%).",
      보전녹지지역:
        "'보전녹지지역'은 역사적·문화적 보전가치가 있는 지역, 풍치 및 경관이 양호한 지역, 무질서한 시가화 방지, 생태계 보전을 위하여 차단지대·완충지대로서 기능을 가지고 있는 지역입니다. (건폐율 20% 이하, 용적률 50% 이상 80% 이하).",
      생산녹지지역:
        "'생산녹지지역'은 농업진흥지역 및 시가화 또는 개발을 엄격하게 규제할 필요가 있는 농지 등을 대상으로 지정한 지역입니다. (건폐율 20% 이하, 용적률 50% 이상 100% 이하).",
      자연녹지지역:
        "'자연녹지지역'은 보전녹지지역과 연계하여 녹지의 보전이 필요한 지역이며, 자연·산림·녹지의 풍치와 건전한 도시환경을 유지하기 위하여 필요한 지역입니다. (건폐율 20% 이하, 용적률 50% 이상 100% 이하).",
      중심상업지역:
        "'중심상업지역'은 해당 도시의 모든 지역으로부터 접근이 용이하고 대중교통수단의 이용이 편리한 지역입니다. 고밀화와 고도화에 적합한 지형의 조건과 주차 및 휴식을 위한 오픈 스페이스 및 기반시설의 확보가 용이하여 신도시의 중심지역으로 개발할 수 있는 지역입니다. (건폐율 90% 이하, 용적률 400% 이상 1,500% 이하).",
      일반상업지역:
        "'일반상업지역'은 주간선도로의 교차지점에 위치하며 생활권의 중심지로 지정되는 지역입니다. 업무와 서비스기능의 접근성을 유지할 수 있는 최소한의 평탄한 면적이 확보된 지역을 대상으로 지정합니다. (건폐율 80% 이하, 용적률 300% 이상 1,300% 이하).",
      근린상업지역:
        "'근린상업지역'은 소생활권의 중심지로 선정된 지역 중 주차, 승하차, 화물적재에 용이한 지역입니다. 근린생활권 주민들이 간선도로의 횡단 없이 걸어서 접근할 수 있는 지역으로, 휴식공간을 함께 입지시키는 것이 용이한 지역입니다. (건폐율 70% 이하, 용적률 200% 이상 900% 이하).",
      유통상업지역:
        "'유통상업지역'은 모든 지역으로부터 접근이 용이하고 승하차 및 화물적재에 용이한 지역입니다. 대중교통수단의 정류장 및 전철역과 종합적으로 개발이 가능한 지역입니다. (건폐율 80% 이하, 용적률 200% 이상 1,100% 이하).",
      전용공업지역:
        "'전용공업지역'은 철도·화물전용도로·공항터미널의 접근성이 양호한 지역으로, 동력 및 용수의 공급, 폐기물 처리가 용이한 지역입니다. 중화학 공장지대가 주로 위치하는 지역입니다. (건폐율 70% 이하, 용적률 150% 이상 300% 이하).",
      일반공업지역:
        "'일반공업지역'은 노동력의 공급이 용이하고, 도시 외곽 또는 근교지역으로서 화물교통과의 마찰을 최소화할 수 있는 지역입니다. (건폐율 70% 이하, 용적률 200% 이상 350% 이하).",
      준공업지역:
        "'준공업지역'은 경공업이나 기타 공업을 수용하되, 주거기능·상업기능 및 업무기능을 보완할 필요가 있는 지역입니다. (건폐율 70% 이하, 용적률 200% 이상 400% 이하).",
      자연환경보전지역:
        "'자연환경보전지역'은 자연환경, 수자원, 해안, 생태계, 상수원 및 문화재의 보전과 수산자원의 보호 및 육성을 위하여 필요한 지역입니다. (건폐율 20% 이하, 용적률 50% 이상 80% 이하).",
      default: "'정보를 찾을 수 없습니다'",
    };
    return `${
      descriptions[landUse]
    }건폐율과 용적률은 조례에 따라 달라질 수 있습니다.`;
  };

  const getLandUseStatusDescription = (landUseStatus: string) => {
    const descriptions: { [key: string]: string } = {
      단독: "'단독'은 단독주택, 다중주택, 다가구주택, 공관을 포함합니다.",
      연립: "'연립'은 주택으로 쓰이는 1개 동의 바닥면적(지하주차장 면적 제외)의 합계가 660㎡를 초과하고, 층수가 4개층 이하인 공동 주택용지(4층 이하 기숙사용지 및 단지형 연립 주택용지 포함)입니다.",
      다세대:
        "'다세대'는 동당 건축연면적이 660㎡ 이하인 4층 이하의 공동주택용지(단지형 다세대 주택용지와 원룸형 주택용지 포함)입니다.",
      아파트:
        "'아파트'는 주택으로 쓰이는 층수가 5개층 이상인 공동주택용지(5층 이상의 기숙사용지 포함)입니다.",
      주거나지:
        "'주거나지'는 주변의 토지이용상황이 주택지대로서 그 토지에 건축물이 없거나 일시적으로 타용도로 이용되고 있으나, 가까운 장래에 주택용지로 이용 및 개발될 가능성이 높은 토지입니다.",
      주거기타:
        "'주거기타'는 주변의 토지이용상황이 주택지대로서 관공서, 교육시설(학교, 공공도서관 등), 종교시설 또는 창고 등으로 이용되고 있는 토지입니다.",
      상업용:
        "'상업용'은 상가나 시장, 서비스업 등의 영업을 목적으로 하고 있는 건물부지(시장, 상가, 호텔, 휴게소, 목욕탕, 수영장, 극장, 병원, 주유소 등)입니다.",
      업무용:
        "'업무용'은 은행, 사무실 등 업무용으로 이용하고 있는 건물부지입니다. 다만, 상업용과 업무용이 복합되어 있을 경우에는 그 사용면적을 기준으로 판단하여 기재합니다.",
      상업나지:
        "'상업나지'는 주변의 토지이용상황이 상업과 업무지대로서 그 토지에 건축물이 없거나 일시적으로 타용도로 이용되고 있으나, 가까운 장래에 상업용 또는 업무용으로 이용 및 개발될 가능성이 높은 토지입니다.",
      상업기타:
        "'상업기타'는 주변의 토지이용상황이 상업과 업무지대로서 관공서, 교육시설(학교, 공공도서관 등), 종교시설 또는 주거용건물, 주상용건물, 창고 등으로 이용되고 있는 토지입니다.",
      주상용:
        "'주상용'은 단일 건물이 주거용과 상업용으로 이용되고 주(부)용도의 구분이 용이하지 않은 건물부지입니다. (단, 주택지안의 소규모 점포주택은 단독주택으로 봅니다.)",
      주상나지:
        "'주상나지'는 주변의 토지이용상황이 주택 및 상가혼용지대로서 그 토지에 건축물이 없거나 일시적으로 타용도로 이용되고 있으나, 가까운 장래에 주상복합용으로 이용 및 개발될 가능성이 높은 토지입니다.",
      주상기타:
        "'주상기타'는 주변의 토지이용상황이 주택 및 상가혼용지대로서 관공서, 교육시설(학교, 공공도서관 등), 종교시설 또는 주거용건물, 창고 등으로 이용되고 있는 토지입니다.",
      공업용:
        "'공업용'은 제조업에 이용되고 있는 토지입니다. 다만, 상업용과 공업용의 구분이 어려운 경우에는 상업용으로 합니다.",
      공업나지:
        "'공업나지'는 주변의 토지이용상황이 공업지대로서 그 토지에 건축물이 없거나 일시적으로 타용되고 있으나, 가까운 장래에 공업용으로 이용 및 개발될 가능성이 높은 토지입니다.",
      공업기타:
        "'공업기타'는 주변의 토지이용상황이 공업지대로서 관공서, 교육시설(학교, 공공도서관 등), 종교시설 또는 창고 등으로 이용되고 있는 토지입니다.",
      전: "'전'은 물을 상시적으로 이용하지 않고 곡물, 원예작물(과수류 제외), 약초, 뽕나무, 관상수 등의 식물을 주로 재배하는 토지와 식용을 목적으로 죽순을 재배하는 토지입니다.",
      과수원:
        "'과수원'은 사과, 배, 밤, 귤나무 등 과수류를 집단적으로 재배하는 토지와 이에 접속된 저장고 등 부속시설물 부지입니다. 다만, 주거용 건축물의 부지는 '주거용'으로 봅니다.",
      전기타:
        "'전기타'는 주변의 토지이용상황이 '전'으로서 관공서, 교육시설(학교, 공공도서관 등), 종교시설 등으로 이용되고 있는 토지입니다.",
      전창고:
        "'전창고'는 주변의 토지이용상황이 '전'으로서 농협, 수협, 축협창고 및 농업, 축산업, 수산업용 창고 등으로 이용되고 있는 토지입니다.",
      전축사:
        "'전축사'는 주변의 토지이용상황이 '전'으로서 돈사, 계사, 우사 등으로 이용되고 있는 토지입니다.",
      답: "'답'은 물을 상시적으로 직접 이용하여 벼, 미나리 등의 식물을 주로 재배하는 토지입니다.",
      답기타:
        "'답기타'는 주변의 토지이용상황이 '답'으로서 관공서, 교육시설(학교, 공공도서관 등), 종교시설 등으로 이용되고 있는 토지입니다.",
      답창고:
        "'답창고'는 주변의 토지이용상황이 '답'으로서 농협, 수협, 축협창고 및 농업, 축산업, 수산업용 창고 등으로 이용되고 있는 토지입니다.",
      답축사:
        "'답축사'는 주변의 토지이용상황이 '답'으로서 돈사, 계사, 우사 등으로 이용되고 있는 토지입니다.",
      조림: "'조림'은 계획조림지로 조성된 임야입니다.",
      자연림: "'자연림'은 자연상태의 임야입니다.",
      토지임야:
        "'토지임야'는 주변의 토지이용상황으로 보아 순수임야와 구분되며, 주로 경작지 또는 도시(마을)주변에 위치해 있는 구릉지와 같은 임야입니다.",
      목장용지:
        "'목장용지'는 축산업 및 낙농업을 하기 위하여 초지를 조성한 토지로, 축산법에 의한 가축을 사육하는 축사 등의 부지와 그 부속시설물의 부지입니다. 다만, 주거용 건축물의 부지는 '주거용'으로 봅니다.",
      임야기타:
        "'임야기타'는 주변의 토지이용상황이 임야로서 관공서, 교육시설(학교, 공공도서관 등), 종교시설, 농협 수협 축협의 창고 등으로 이용되고 있는 토지입니다.",
      광천지:
        "'광천지'는 지하에서 온수, 약수, 석유류 등이 용출되는 용출구 및 그 유지에 사용되는 부지입니다. 다만 온수, 약수, 석유류 등을 일정한 장소로 운송하는 송수관, 송유관 및 저장시설의 부지는 제외합니다.",
      광업용지: "'광업용지'는 광산, 특수채석장(오석, 대리석 등) 용지입니다.",
      염전: "'염전'은 바닷물을 끌어 들여 소금을 채취하기 위하여 조성된 토지와 이에 접속된 제염장 등 부속시설물의 부지입니다. 다만, 천일제염방식에 의하지 아니하고 동력에 의하여 바닷물을 끌어 들여 소금을 제조하는 공장시설물의 부지는 제외합니다.",
      양어양식:
        "'양어양식'은 양어장은 육상에 인공적으로 조성된 수상생물의 번식 또는 양식을 위한 시설을 갖춘 부지와 이에 접속된 부속시설물의 부지입니다. 양식장은 일정한 설비를 갖추어 놓고 물고기나 해조, 버섯 따위를 인공적으로 기르는 곳입니다.",
      공공용지:
        "'공공용지'는 공공기관이 소유 또는 관리하고 있는 부지로 관공서, 교육시설(학교, 공공도서관 등), 종교시설, 공원 및 도로 등의 부지입니다.",
      휴양림:
        "'휴양림'은 자연환경을 보존하고 시민에게 휴식과 치유의 공간을 제공하기 위한 부지로, 캠핑장, 휴양시설 등이 포함됩니다.",
      보전용지:
        "'보전용지'는 생태계 보전과 관련된 공간으로 보전지역 및 자생식물 서식지가 포함됩니다.",
      하천: "'하천'은 자연 상태의 흐름을 유지하고 있는 물이 흐르는 곳을 포함하며, 인공적으로 조성된 수로는 제외됩니다.",
      철도: "'철도'는 철도선로를 포함한 토지로 철도역, 기지 등 철도 관련 부지가 포함됩니다.",
      공항: "'공항'은 항공기 이착륙을 위한 시설이 포함된 부지입니다.",
      도로: "'도로'는 교통을 위한 도로로서 도로법에 의해 설정된 도로를 포함합니다.",
      기타: "'기타'는 위에 언급된 모든 분류에 해당되지 않는 부지입니다.",
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

  const getRoadAccessDescription = (roadAccess: string) => {
    const descriptions: { [key: string]: string } = {
      광대한면:
        "'광대한면'은 폭 25m 이상의 도로에 한 면이 접하고 있는 토지입니다.",
      광대소각:
        "'광대소각'은 광대로에 한 면이 접하고 소로(폭 8m 이상 12m 미만)의 도로에 한 면 이상 접하고 있는 토지입니다.",
      광대세각:
        "'광대세각'은 광대로에 한 면이 접하면서 자동차 통행이 가능한 세로(가)에 한 면 이상 접하고 있는 토지입니다.",
      중로한면:
        "'중로한면'은 폭 12m 이상 25m 미만 도로에 한 면이 접하고 있는 토지입니다.",
      중로각지:
        "'중로각지'는 중로에 한 면이 접하면서 중로, 소로, 자동차 통행이 가능한 세로(가)에 한 면 이상 접하고 있는 토지입니다.",
      소로한면:
        "'소로한면'은 폭 8m 이상 12m 미만인 도로에 한 면이 접하고 있는 토지입니다.",
      소로각지:
        "'소로각지'는 소로에 한 면이 접하면서 소로, 자동차 통행이 가능한 세로(가)에 한 면 이상 접하고 있는 토지입니다.",
      세로가:
        "'세로 (가)'는 자동차 통행이 가능한 폭 8m 미만의 도로에 한 면이 접하고 있는 토지입니다.",
      세각가:
        "'세각 (가)'는 자동차 통행이 가능한 세로에 두 면 이상이 접하고 있는 토지입니다.",
      세로불:
        "'세로 (불)'은 자동차 통행이 불가능하나 이륜자동차의 통행이 가능한 세로에 한 면이 접하고 있는 토지입니다.",
      세각불:
        "'세각 (불)'은 자동차 통행이 불가능하나 이륜자동차의 통행이 가능한 세로에 두 면 이상 접하고 있는 토지입니다.",
      맹지: "'맹지'는 이륜자동차의 통행이 불가능한 도로에 접한 토지와 도로에 접하지 않는 토지입니다.",
    };

    return descriptions[roadAccess] || "'도로접면'에 대한 정보가 없습니다.";
  };

  const getDevelopmentPotentialDescription = (developmentPotential: number) => {
    const descriptions: { [key: number]: string } = {
      0: "개발 가능성은 토키미에서 여러 정보들을 종합해 알려드리는 추천 지수입니다. 해당 토지는 '주의'입니다. 가장 낮은 지표입니다.",
      1: "개발 가능성은 토키미에서 여러 정보들을 종합해 알려드리는 추천 지수입니다. 해당 토지는 '양호'입니다. 중간 지표입니다.",
      2: "개발 가능성은 토키미에서 여러 정보들을 종합해 알려드리는 추천 지수입니다. 해당 토지는 '안전'입니다. 가장 높은 지표입니다.",
    };

    return (
      descriptions[developmentPotential] ||
      '개발 가능성에 대한 정보가 없습니다.'
    );
  };

  return (
    <div style={{ backgroundColor: '#f3f7fb' }}>
      <h3 style={{ display: 'flex', alignItems: 'center' }}>
        {selectedDetail && ( // 선택된 상세 정보가 있을 때만 BackIcon 표시
          <BackIcon src={backIcon} alt="back Icon" onClick={handleBackClick} />
        )}
        {selectedDetail
          ? `${selectedDetail.landDistrict} ${selectedDetail.landAddress}`
          : null}
      </h3>
      {selectedDetail ? ( // 선택된 상세 정보가 있으면
        <div>
          <MapBox>
            <NaverMap />
          </MapBox>
          {/* 공통 정보 항목을 위한 컴포넌트 생성 */}
          <InfoBox>
            {[
              {
                label: '면적',
                value: `${selectedDetail.landScale}㎡`,
                tooltip: `토지의 평수는 ${(selectedDetail.landScale * 0.3025).toFixed(2)}평 입니다.`,
                key: `landScale-${selectedDetail.landId}`,
                src: scaleIcon,
              },
              {
                label: '용도지역',
                value: selectedDetail.landUse,
                tooltip: getLandUseDescription(selectedDetail.landUse),
                key: `landUse-${selectedDetail.landId}`,
                src: purposeIcon,
              },
              {
                label: '토지이용상황',
                value: selectedDetail.landUseStatus,
                tooltip: getLandUseStatusDescription(
                  selectedDetail.landUseStatus,
                ),
                key: `landUseStatus-${selectedDetail.landId}`,
                src: useIcon,
              },
              {
                label: '경사도',
                value: selectedDetail.landGradient,
                tooltip: getGradientDescription(selectedDetail.landGradient),
                key: `landGradient-${selectedDetail.landId}`,
                src: gradientIcon,
              },
              {
                label: '도로접면',
                value: selectedDetail.landRoad,
                tooltip: getRoadAccessDescription(selectedDetail.landRoad),
                key: `landRoad-${selectedDetail.landId}`,
                src: roadIcon,
              },
              {
                label: '공시지가',
                value: `㎡당 ${selectedDetail.landPrice.toLocaleString()} 원`,
                tooltip:
                  '공시지가는 정부가 매년 전국의 토지에 대해 공시하는 표준적인 땅값입니다. 주로 국토교통부에서 발표하며 세금 부과, 부동산 거래, 보상 평가 등의 기준이 되는 중요한 자료입니다. 다만, 공시지가는 토지의 거래 가격과는 다소 차이가 있을 수 있습니다.',
                key: `landPrice-${selectedDetail.landId}`,
                src: moneyIcon,
              },
              {
                label: '개발 가능성',
                value: selectedDetail.landDanger.toString(),
                tooltip: getDevelopmentPotentialDescription(
                  selectedDetail.landDanger,
                ),
                key: `landDanger-${selectedDetail.landId}`,
                src: percentageIcon,
              },
            ].map((item) => (
              <div key={item.key}>
                <p
                  style={{
                    position: 'relative',
                    fontWeight: 'bold',
                    fontSize: 'calc(1vw + 1vh)',
                  }}
                >
                  <img
                    src={item.src}
                    alt={`${item.label} 아이콘`}
                    style={{
                      marginLeft: 'calc(0.5vw + 0.5vh)',
                      marginRight: 'calc(1vw + 1vh)',
                      width: 'calc(1vw + 1vh)',
                      height: 'calc(1vw + 1vh)',
                    }}
                  />
                  {item.label}: {item.value}
                  <button
                    type="button"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      marginLeft: '2vw',
                      width: 'calc(1vw + 1vh)',
                      height: 'calc(1vw + 1vh)',
                    }}
                    onClick={() => toggleInfo(item.key)}
                    aria-label={`${item.label} 정보`}
                  >
                    <img
                      src="/icons/info.png"
                      alt="info"
                      style={{
                        width: 'calc(1.2vw + 1.2vh)',
                        height: 'calc(1.2vw + 1.2vh)',
                      }}
                    />
                  </button>
                  {showInfo[item.key] && (
                    <button
                      type="button"
                      style={{
                        position: 'absolute',
                        backgroundColor: '#333',
                        border: '#808080',
                        color: '#fff',
                        padding: '1vw 2vw',
                        borderRadius: 'calc(1vw + 1vh)',
                        top: 'calc(1.5vw + 1.5vh)',
                        left: '0vw',
                        whiteSpace: 'normal',
                        fontWeight: '500',
                        zIndex: 100,
                        opacity: 0.8,
                      }}
                      aria-label="정보 닫기"
                    >
                      {item.tooltip}
                    </button>
                  )}
                </p>
              </div>
            ))}
          </InfoBox>
        </div>
      ) : (
        // 선택된 상세 정보가 없으면
        <div>
          {landDetails.length > 0 ? (
            landDetails.map((detail) => (
              <div key={detail.landId} style={{ marginBottom: '16px' }}>
                <button
                  type="button"
                  onClick={() => handleDetailClick(detail)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  주소: {detail.landDistrict} {detail.landAddress}
                </button>
              </div>
            ))
          ) : (
            <div
              style={{ textAlign: 'center', marginTop: '20px', opacity: 0.85 }}
            >
              <img
                src={nodataimg}
                alt="No data available"
                style={{ width: '300px', height: 'auto' }} // 이미지 크기 조정
              />
              <div
                style={{
                  color: '#27C384',
                  fontWeight: 'bold',
                  marginTop: '10px',
                  fontSize: '1.5em',
                }}
              >
                <p>원하는 토지를 검색해보세요!</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LandDetailTab;
