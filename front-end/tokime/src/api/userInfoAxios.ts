import API from '../utils/API';

export default async function userInfoAxios() {
  return API.get('/user')
    .then((res) => {
      return res.data.data[0];
    })
    .catch((e) => {
      console.log(e);
      console.log('Error Handling');
      return null;
    });
}
