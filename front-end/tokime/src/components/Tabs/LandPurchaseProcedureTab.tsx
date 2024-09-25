import React from 'react';
import styled from 'styled-components';

const TabContent = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

function EssentialKnowledgeTab() {
  return (
    <TabContent>
      <p>필수 상식에 대한 내용입니다.</p>
    </TabContent>
  );
}

export default EssentialKnowledgeTab;
