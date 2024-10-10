import API from '../utils/API';

// 모든 신고 정보 가져오기 (위도, 경도 기반)
export const getDangerInfo = async () => {
  return API.get('/danger')
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((e) => {
      console.log('get danger info error: ', e);
      return null;
    });
};

// 특정 신고글 상세 조회
export const getDangerInfoDetail = async (dangerId: number) => {
  return API.get(`/danger/${dangerId}`)
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((e) => {
      console.log('get danger detail error: ', e);
      return null;
    });
};

// 신고글 작성
export const registDanger = async (danger: {
  lat: number;
  lng: number;
  dangerTitle: string;
  dangerContent: string;
}) => {
  return API.post('/danger', danger)
    .then((res) => {
      return res.status;
    })
    .catch((e) => {
      console.log('신고글 등록 실패:', e);
      return null;
    });
};
