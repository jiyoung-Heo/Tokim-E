import API from '../utils/API';

// 특정 카테고리별 지식을 가져오는 함수
export const fetchKnowledgeByCategory = async (category: number) => {
  try {
    const response = await API.get('/knowledge', {
      params: { knowledgeCategory: category },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching knowledge:', error);
    throw error;
  }
};

export default fetchKnowledgeByCategory;
