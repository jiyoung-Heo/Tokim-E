import API from '../utils/API';

export default async function userQuizAxios() {
  return API.get('/user/quiz')
    .then((res) => {
      return res.data[0];
    })
    .catch((e) => {
      console.log(e);
      console.log('Error Handling');
      return null;
    });
}
