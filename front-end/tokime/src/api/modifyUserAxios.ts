import API from '../utils/API';

export default async function modifyUserAxios(birth: Date) {
  return API.put('/user', {
    birth,
  })
    .then((res) => {
      return res.data[0];
    })
    .catch((e) => {
      console.log(e);
      console.log('Error Handling');
      return null;
    });
}
