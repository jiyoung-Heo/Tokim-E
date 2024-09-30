import axios from 'axios';

const BASE_URL = 'https://j11b207.p.ssafy.io/api';

// 전체 용어 조회 (키워드 없이 모든 용어를 불러옵니다)
export const getAllTerms = async (keyword: string) => {
  console.log(keyword);
  try {
    const response = await axios.get(`${BASE_URL}/term`, {
      params: { keyword },
    });

    console.log('API 응답 데이터:', response.data); // 응답 데이터 확인
    return response.data;
  } catch (error) {
    console.error('Error fetching terms:', error);
    throw error;
  }
};

// 키워드로 용어 검색 (키워드에 해당하는 용어를 검색합니다)
export const searchTerms = async (keyword: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/term`, {
      params: { keyword },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching terms:', error);
    throw error;
  }
};
