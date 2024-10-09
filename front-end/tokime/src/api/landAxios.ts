import API from '../utils/API';

// 모든 토지 정보 가져오기
export const getAllLandInfo = async () => {
  return API.get('/land')
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((e) => {
      console.log('get land Error : ', e);
      return null;
    });
};

// search 하는 토지 정보 조회
export const getSearchLandInfo = async (
  district: string | null,
  address: string | null,
) => {
  // district나 address가 없어도 API 호출
  return API.get('/land/search', {
    params: { district, address },
  })
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((e) => {
      console.log('land Search Error : ', e);
      return null; // 에러 발생 시 null 반환
    });
};

// search 한 토지 정보를 바탕으로 law 가져오기
export const getLandLawInfo = async (landDistrictCode: string | null) => {
  // landDistrictCode가 없으면 호출하지 않음
  if (!landDistrictCode) {
    console.log('Land district code is missing. Skipping API call.');
    return null;
  }
  return API.get(`/land/bylaw/${landDistrictCode}`)
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((e) => {
      console.log('land Search Error : ', e);
      return null;
    });
};
