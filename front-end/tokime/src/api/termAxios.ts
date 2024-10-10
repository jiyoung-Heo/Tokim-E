import API from '../utils/API';

// 용어 조회(키워드 검색 가능)
export const getAllTerms = async (keyword: string | undefined) => {
  // console.log(keyword);
  try {
    const response = await API.get('/term', {
      params: { keyword },
    });

    // console.log('API 응답 데이터:', response.data); // 응답 데이터 확인
    return response.data;
  } catch (error) {
    console.error('Error fetching terms:', error);
    throw error;
  }
};

// 선택한 용어 상세 조회
export const getSelectedTerm = async (termId: number) => {
  try {
    const response = await API.get(`/term/${termId}`);
    console.log('Selected Term Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching selected term:', error);
    throw error;
  }
};

// 좋아요 한 용어 목록 조회
export const getTermLike = async () => {
  try {
    const response = await API.get('/term/like');
    // console.log('API 응답 데이터:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching Like term:', error);
    return null;
  }
};

// 특정 용어에 좋아요 등록
export const registTermLike = async (termId: number) => {
  try {
    const response = await API.post(`/term/like/${termId}`);
    // console.log('좋아요 등록 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error registering Like term:', error);
    return null;
  }
};

// 특정 용어에 좋아요 삭제
export const deleteTermLike = async (termId: number) => {
  try {
    const response = await API.delete(`/term/like/${termId}`);
    // console.log('좋아요 삭제 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting Like term:', error);
    return null;
  }
};
