import API from '../utils/API';

// 로그인한 아이디를 기반으로 투자예정지 목록 전체 조회
export const getAllInvestLand = async () => {
  return API.get('/land/invest')
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((e) => {
      console.log('land Search Error : ', e);
      return null;
    });
};

// 로그인한 아이디를 기반으로 투자예정지 목록 전체 조회
export const getAllInvestLandFilter = async (landAddress: string) => {
  return API.post('/land/invest/filter', {
    landAddress,
  })
    .then((res) => {
      console.log(landAddress);
      return res.data;
    })
    .catch((e) => {
      console.log('land Search Error : ', e);
      return null;
    });
};

// 선택한 하나의 토지 정보를 가져오기.
export const getInvestDetail = async (investmentPlannedLandId: String) => {
  return API.get(`/land/invest/${investmentPlannedLandId}`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((e) => {
      console.log('land Search Error : ', e);
      return null;
    });
};

// 투자 예정지 등록하기.
export const registInvestLand = async (investmentData: {
  landAddress: string;
  landGradient: string;
  landPrice: number;
  landRoad: string;
  landOwner: string;
  landUseStatus: string;
  landStory: string;
  plannedLandPyeong: number;
  plannedLandPrice: number;
  checkedCount: number;
  checklistIds: number[];
}) => {
  try {
    const response = await API.post('/land/invest', investmentData);
    console.log('투자 예정지 등록 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('투자 예정지 등록 실패:', error);
    return null;
  }
};

// 투자 예정지 수정하기
export const updateInvestDetail = async (
  investmentPlannedLandId: String,
  updatedData: any,
) => {
  return API.put(`/land/invest/${investmentPlannedLandId}`, updatedData)
    .then((res) => {
      console.log('Update successful: ', res.data);
      return res.data;
    })
    .catch((e) => {
      console.log('Update Error: ', e);
      return null;
    });
};

// 투자 예정지 삭제하기
export const deleteInvestDetail = async (investmentPlannedLandId: String) => {
  return API.delete(`/land/invest/${investmentPlannedLandId}`)
    .then((res) => {
      console.log('Delete successful: ', res.data);
      return res.data;
    })
    .catch((e) => {
      console.log('Delete Error: ', e);
      return null;
    });
};

// 투자 체크리스트 가져오기.
export const getCheckList = async () => {
  return API.get('/land/invest/checklist')
    .then((res) => {
      console.log('Get successful : ', res.data);
      return res.data;
    })
    .catch((e) => {
      console.log('Get Error : ', e);
      return null;
    });
};
