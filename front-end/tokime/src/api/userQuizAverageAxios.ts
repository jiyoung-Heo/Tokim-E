import API from '../utils/API';

export default async function userQuizAverageAxios() {
  return API.get('/quiz/average')
    .then((res) => {
      // console.log(res);
      return res.data;
    })
    .catch((e) => {
      console.log(e);
      console.log('Error Handling');
      return null;
    });
}
