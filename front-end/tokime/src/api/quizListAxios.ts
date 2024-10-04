import API from '../utils/API';

export default async function userQuizListAxios() {
  return API.get('/quiz')
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
      console.log('Error Handling');
      return null;
    });
}
