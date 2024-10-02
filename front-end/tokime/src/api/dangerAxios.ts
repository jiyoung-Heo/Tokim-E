import API from '../utils/API';

// 모든 신고 정보 가져오기
export const getDangerInfo = async () => {
  return API.get('/danger')
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((e) => {
      console.log('get land Error : ', e);
      return null;
    });
};

export const getDangerInfoDetail = async (dangerId: number) => {
  return API.get(`/danger/${dangerId}`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((e) => {
      console.log('get land Error : ', e);
      return null;
    });
};

export const registDanger = async (dangerInfo: any) => {
  return API.post('/danger', dangerInfo)
    .then((res) => {
      console.log('신고글 등록 성공:', res.data);
      return res.data;
    })
    .catch((e) => {
      console.log('신고글 등록 실패:', e);
      return null;
    });
};
