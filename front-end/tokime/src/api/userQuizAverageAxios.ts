import API from '../utils/API';

export default async function userQuizAverageAxios() {
  return API.get('/quiz/average')
    .then((res) => {
      console.log(res);
      return res.data.data[0];
    })
    .catch((e) => {
      console.log(e);
      console.log('Error Handling');
      return null;
    });
}
