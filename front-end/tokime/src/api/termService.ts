import API from '../utils/API'; // API.ts에서 정의된 API 인스턴스 사용

// 용어 조회(키워드 검색 가능)
export const getAllTerms = async (keyword: string) => {
  console.log(keyword);
  try {
    const response = await API.get('/term', {
      params: { keyword },
    });

    console.log('API 응답 데이터:', response.data); // 응답 데이터 확인
    return response.data;
  } catch (error) {
    console.error('Error fetching terms:', error);
    throw error;
  }
};
