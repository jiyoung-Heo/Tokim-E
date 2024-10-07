import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getCheckList } from '../../api/landInvestAxios';

interface ChecklistTabProps {
  check: number[];
}
interface ChecklistItem {
  checklistId: number;
  content: string;
}
const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #f3f7fb;
`;
const ChecklistTab: React.FC<ChecklistTabProps> = ({ check }) => {
  const [loading, setLoading] = useState<boolean>(true); // State for loading status
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]); // State for checklist data
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]); // State for checkbox status
  const [error, setError] = useState<string | null>(null); // State for error messages

  const checkedCount = checkedItems.filter(Boolean).length; // Count checked items

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
              style={{ marginRight: '5px' }} // Space between checkbox and text
              readOnly
            />
            {item.content} {/* Render each checklist item */}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '10px' }}>
        체크한 항목 수: {checkedCount} / {checklist.length}{' '}
        {/* Display checked items count */}
      </div>
    </Container>
  );
};
export default ChecklistTab;
