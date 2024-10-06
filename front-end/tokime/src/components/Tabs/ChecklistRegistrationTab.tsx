import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getCheckList } from '../../api/landInvestAxios'; // Adjust the import path as necessary
import LoadingSpinner from '../layouts/LoadingSpinner';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #f3f7fb;
`;

const RegistContainer = styled.div`
  display: flex;
  justify-content: right;
`;

// 투자 예정지 등록 버튼 스타일
const RegisterButton = styled.button`
  padding: 1.5vh 5vw;
  background-color: #27c384;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  z-index: 800; /* z-index 추가 */
  margin-top: 3vh;
  font-size: 15px;
  margin: 3vh 2vw 0 2vw;
`;
interface ChecklistItem {
  checklistId: number;
  content: string;
}

interface ChecklistRegistrationTabProps {
  check: number[];
  setCheck: React.Dispatch<React.SetStateAction<number[]>>;
  onNext: () => void; // 다음 버튼을 위한 prop 타입 정의
  onPrevious: () => void; // 이전 버튼을 위한 prop 타입 정의
}

const ChecklistRegistrationTab: React.FC<ChecklistRegistrationTabProps> = ({
  check,
  setCheck,
  onNext,
  onPrevious,
}) => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]); // State for checklist data
  const [loading, setLoading] = useState<boolean>(true); // State for loading status
  const [error, setError] = useState<string | null>(null); // State for error messages
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]); // State for checkbox status

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
  }, []); // Empty dependency array means this runs once on mount

  const handleCheckboxChange = (index: number) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index]; // Toggle checkbox status
    setCheckedItems(updatedCheckedItems);
  };

  const checkedCount = checkedItems.filter(Boolean).length; // Count checked items

  // Function to handle the next button click
  const handleNext = () => {
    // true인 항목들의 인덱스를 찾아서 1-based index로 변환
    const checkedIndices = checkedItems
      .map((checked, index) => (checked ? index : null)) // true인 항목들의 index를 구함
      .filter((index) => index !== null) as number[]; // null 값 제거 후 인덱스 리스트로 변환

    setCheck(checkedIndices); // check 상태에 true인 항목들의 index 저장

    const uncheckedIndices = checkedItems
      .map((checked, index) => (checked ? null : index + 1)) // Get unchecked item indices (1-based)
      .filter((index) => index !== null); // Filter out null values

    if (uncheckedIndices.length > 0) {
      // 모달로 바꾸기
      const message = `${uncheckedIndices.join(', ')}번이 체크되지 않았습니다. 계속 등록하시겠습니까?`;
      if (!window.confirm(message)) {
        return; // If user cancels, do not proceed
      }
    }

    onNext(); // Proceed to next if user confirms
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>{error}</div>; // Show error message
  }

  return (
    <Container>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {checklist.map((item, index) => (
          <li
            key={item.checklistId}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <input
              type="checkbox"
              checked={checkedItems[index]} // Bind checkbox to state
              onChange={() => handleCheckboxChange(index)} // Update checkbox state on change
              style={{ marginRight: '5px' }} // Space between checkbox and text
            />
            {item.content} {/* Render each checklist item */}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '10px' }}>
        체크한 항목 수: {checkedCount} / {checklist.length}{' '}
        {/* Display checked items count */}
      </div>

      <RegistContainer>
        <RegisterButton onClick={onPrevious}>이전</RegisterButton>
        <RegisterButton onClick={handleNext}>다음</RegisterButton>
      </RegistContainer>
    </Container>
  );
};

export default ChecklistRegistrationTab;
