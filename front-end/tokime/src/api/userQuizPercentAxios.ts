import API from '../utils/API';

export default async function userQuizPercentAxios() {
  return API.get('/quiz/percent')
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
      console.log('Error Handling');
      return null;
    });
}
