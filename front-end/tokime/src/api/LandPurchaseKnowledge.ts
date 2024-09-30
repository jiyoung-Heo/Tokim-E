import axios from 'axios';

const BASE_URL = 'https://j11b207.p.ssafy.io/api'; // API URL

// 특정 카테고리별 지식을 가져오는 함수
const fetchKnowledgeByCategory = async (category: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/knowledge`, {
      params: { knowledgeCategory: category },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching knowledge:', error);
    throw error;
  }
};

export default fetchKnowledgeByCategory; // default export로 변경
