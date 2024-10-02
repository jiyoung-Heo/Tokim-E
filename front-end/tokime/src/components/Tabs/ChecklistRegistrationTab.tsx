import React, { useEffect, useState } from 'react';
import { getCheckList } from '../../api/landInvestAxios'; // Adjust the import path as necessary

interface ChecklistItem {
  checklistId: number;
  content: string;
}

interface ChecklistRegistrationTabProps {
  onNext: () => void; // 다음 버튼을 위한 prop 타입 정의
  onPrevious: () => void; // 이전 버튼을 위한 prop 타입 정의
}

const ChecklistRegistrationTab: React.FC<ChecklistRegistrationTabProps> = ({
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
        setCheckedItems(new Array(data.length).fill(false)); // Initialize checkbox state for each item
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
    const uncheckedIndices = checkedItems
      .map((checked, index) => (checked ? null : index + 1)) // Get unchecked item indices (1-based)
      .filter((index) => index !== null); // Filter out null values

    if (uncheckedIndices.length > 0) {
      const message = `${uncheckedIndices.join(', ')}번이 체크되지 않았습니다. 계속 등록하시겠습니까?`;
      if (!window.confirm(message)) {
        return; // If user cancels, do not proceed
      }
    }

    onNext(); // Proceed to next if user confirms
  };

  if (loading) {
    return <div>로딩 중...</div>; // Show loading message
  }

  if (error) {
    return <div>{error}</div>; // Show error message
  }

  return (
    <div>
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
              style={{ marginRight: '10px' }} // Space between checkbox and text
            />
            {item.content} {/* Render each checklist item */}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '10px' }}>
        체크한 항목 수: {checkedCount} / {checklist.length}{' '}
        {/* Display checked items count */}
      </div>
      <div>
        <button type="button" onClick={onPrevious}>
          이전
        </button>
        <button type="button" onClick={handleNext}>
          다음
        </button>
      </div>
    </div>
  );
};

export default ChecklistRegistrationTab;
