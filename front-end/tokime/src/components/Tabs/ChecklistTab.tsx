import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getCheckList, updateInvestDetail } from '../../api/landInvestAxios';
import checkIcon from '../../assets/images/icon/체크x.png'; // 체크 아이콘 경로
import checkedIcon from '../../assets/images/icon/체크.png'; // 선택된 아이콘 경로 (새로운 체크 아이콘)

// 체크리스트 이미지 불러오기
import checklist1 from '../../assets/images/checklist/체크리스트1.png';
import checklist2 from '../../assets/images/checklist/체크리스트2.png';
import checklist3 from '../../assets/images/checklist/체크리스트3.png';
import checklist4 from '../../assets/images/checklist/체크리스트4.png';
import checklist5 from '../../assets/images/checklist/체크리스트5.png';
import checklist6 from '../../assets/images/checklist/체크리스트6.png';
import checklist7 from '../../assets/images/checklist/체크리스트7.png';
import checklist8 from '../../assets/images/checklist/체크리스트8.png';
import checklist9 from '../../assets/images/checklist/체크리스트9.png';
import checklist10 from '../../assets/images/checklist/체크리스트10.png';
import checklist11 from '../../assets/images/checklist/체크리스트11.png';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #f3f7fb;
`;

const Title = styled.h1`
  font-size: 7vw; /* 반응형 폰트 크기 */
  font-weight: bold;
  color: #333333;
  margin-bottom: 5vh;
  margin-left: 3vw;
  white-space: pre-line; /* 텍스트 안에서 줄바꿈 처리 */
`;

const ChecklistContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh; /* 체크리스트 항목 간격을 2vh로 설정 */
`;

const ChecklistItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%; /* 컨테이너 너비 반응형 */
  padding: 2vh 2vw; /* 안쪽 여백 반응형 */
  background-color: #e8eef3; /* 체크 여부에 상관없이 동일 배경색 */
  border-radius: 1vw; /* 반응형 모서리 둥글기 */
  position: relative;
  transition: background-color 0.3s;
  cursor: pointer; /* 클릭 가능하게 변경 */
  overflow-y: auto;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1vh; /* 이미지와 설명 텍스트 사이 간격 */
`;

const ChecklistImage = styled.img`
  width: 6vw;
  height: 6vw;
  margin-right: 1vw; /* 이미지와 텍스트 사이 간격 */
  margin-left: 4vw; /* 이미지와 텍스트 사이 간격 */
`;

const TitleText = styled.div`
  font-size: 3.5vw;
  font-weight: bold;
  line-height: 1.2;
  max-width: 61.11vw; /* 타이틀 텍스트 너비 설정 */
  margin-left: 2.78vw; /* 이미지와 타이틀 텍스트 간격 */
  white-space: pre-line; /* 줄바꿈 적용 */
`;

const DescriptionText = styled.div`
  font-size: 3vw; /* 설명 텍스트 폰트 크기 반응형 */
  color: #666;
  max-width: 220px; /* 설명 텍스트의 최대 너비 */
  margin-left: 4vw; /* 왼쪽 간격 */
`;

const CheckIcon = styled.img`
  width: 8vw;
  height: 8vw;
  position: absolute;
  right: 5vw;
  top: 50%;
  transform: translateY(-50%); /* 체크 아이콘을 컨테이너 중간에 맞추기 */
`;
interface InvestmentInfo {
  investmentPlannedLandId: number;
  landAddress: string;
  landCreatedAt: string;
  landDanger: number;
  landGradient: string;
  landNickname: string | null;
  landOwner: string;
  landPrice: number;
  landRoad: string;
  landStory: string;
  landUpdatedAt: string;
  landUseStatus: string;
  plannedLandPrice: number;
  plannedLandPyeong: number;
  userId: number;
  checkedCount: number;
  checklistIds: number[] | null;
}

interface ChecklistTabProps {
  check: number[];
  setCheck: React.Dispatch<React.SetStateAction<number[]>>;
  investmentInfo?: InvestmentInfo;
  setInvestmentInfo: React.Dispatch<
    React.SetStateAction<InvestmentInfo | undefined>
  >; // null을 허용
}

interface ChecklistItem {
  checklistId: number;
  content: string;
}

const ChecklistTab: React.FC<ChecklistTabProps> = ({
  check,
  setCheck,
  investmentInfo,
  setInvestmentInfo,
}) => {
  const [loading, setLoading] = useState<boolean>(true); // State for loading status
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]); // State for checklist data
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]); // State for checkbox status
  const [error, setError] = useState<string | null>(null); // State for error messages

  const checkedCount = checkedItems.filter(Boolean).length; // Count checked items

  // 체크리스트 제목 배열
  const titles = [
    '직접 가보셨나요?',
    '개발이 가능한 지역인가요?',
    '고도가 낮고 경사가 완만한가요?',
    '구체적인 개발 계획이 있나요?',
    '인근 지역에만 개발 호재가 있는 건\n아닌가요?',
    '공유지분으로 거래하진 않나요?',
    '정확한 정보를 사전에 받으셨나요?',
    '매수 금액이 적당한가요?',
    '주변 시세와 비교했을 때 가격이적절한가요?',
    '판매자의 신뢰할 수 있는\n상호인가요?',
    '법인이 아닌 개인 소유의\n토지인가요?',
  ];

  // 체크리스트 이미지 배열
  const images = [
    checklist1,
    checklist2,
    checklist3,
    checklist4,
    checklist5,
    checklist6,
    checklist7,
    checklist8,
    checklist9,
    checklist10,
    checklist11,
  ];
  useEffect(() => {
    const fetchChecklist = async () => {
      setLoading(true);
      const data = await getCheckList();
      if (data) {
        setChecklist(data); // Set the fetched checklist data

        // check 배열에 포함된 인덱스는 true로 설정, 나머지는 false로 설정
        const initialCheckedItems = new Array(data.length).fill(false);
        check.forEach((index) => {
          if (index < data.length) {
            initialCheckedItems[index] = true; // check에 있는 인덱스의 항목을 true로 설정
          }
        });
        setCheckedItems(initialCheckedItems); // 체크박스 상태 초기화
      } else {
        setError('체크리스트를 가져오는 데 실패했습니다.'); // Set error message if fetching fails
      }
      setLoading(false);
    };

    fetchChecklist();
  }, []);

  const fetchUpdateInvestDetail = async (updatedCheckedItems: boolean[]) => {
    const checkedIndices = updatedCheckedItems
      .map((checked, index1) => (checked ? index1 : null))
      .filter((index1) => index1 !== null) as number[];

    // console.log(checkedIndices);
    if (investmentInfo?.investmentPlannedLandId !== undefined) {
      const data = await updateInvestDetail(
        investmentInfo.investmentPlannedLandId,
        { ...investmentInfo, checklistIds: checkedIndices }, // 체크된 항목 ID 배열을 포함
      );
      if (data) {
        setInvestmentInfo(data);
        // console.log('Update successful:', data);
      }
    }
  };

  const handleCheckboxChange = (index: number) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index]; // 체크 여부 반전
    setCheckedItems(updatedCheckedItems);

    const checkedIndices = checkedItems
      .map((checked, index1) => (checked ? index1 : null))
      .filter((index1) => index1 !== null) as number[];

    setCheck(checkedIndices); // 선택된 인덱스 저장
    // 체크가 변경된 후 API 호출
    fetchUpdateInvestDetail(updatedCheckedItems);
  };

  return (
    <Container>
      <Title>{`토지구매 전에\n확인해보셨나요?`}</Title>
      <ChecklistContainer>
        {checklist.map((item, index) => (
          <ChecklistItemContainer
            key={item.checklistId}
            onClick={() => handleCheckboxChange(index)} // 컨테이너 클릭 시 상태 변경
          >
            <TopRow>
              <ChecklistImage
                src={images[index]} // 체크리스트 이미지
                alt={`Checklist ${index + 1}`}
              />
              <TitleText>{titles[index]}</TitleText> {/* 체크리스트 제목 */}
            </TopRow>
            <DescriptionText>{item.content}</DescriptionText>{' '}
            {/* 체크리스트 설명 */}
            <CheckIcon
              src={checkedItems[index] ? checkedIcon : checkIcon} // 체크 여부에 따라 아이콘 변경
              alt="check icon"
            />
          </ChecklistItemContainer>
        ))}
      </ChecklistContainer>
    </Container>
  );
};
ChecklistTab.defaultProps = {
  investmentInfo: {
    investmentPlannedLandId: 0,
    landAddress: '',
    landCreatedAt: '',
    landDanger: 0,
    landGradient: '',
    landNickname: null,
    landOwner: '',
    landPrice: 0,
    landRoad: '',
    landStory: '',
    landUpdatedAt: '',
    landUseStatus: '',
    plannedLandPrice: 0,
    plannedLandPyeong: 0,
    userId: 0,
    checkedCount: 0,
    checklistIds: null,
  },
};
export default ChecklistTab;
