import API from '../utils/API';

export default async function withdrawAxios() {
  return API.delete('/user')
    .then((res) => {
      return 'success';
    })
    .catch((e) => {
      console.log(e);
      console.log('Error Handling');
      return null;
    });
}
