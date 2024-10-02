import API from '../utils/API';

export default async function modifyUserBirthAxios(birth: string) {
  return API.put(`/user?birth=${birth}`)
    .then((res) => {
      return res.data[0];
    })
    .catch((e) => {
      console.log(e);
      console.log('Error Handling');
      return null;
    });
}
