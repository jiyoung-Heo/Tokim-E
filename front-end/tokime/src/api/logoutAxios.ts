import API from '../utils/API';

export default async function logoutAxios() {
  return API.get('/logout')
    .then(() => {
      return 'success';
    })
    .catch((e) => {
      console.log(e);
      console.log('Error Handling');
      return null;
    });
}
