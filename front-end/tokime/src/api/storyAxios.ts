import API from '../utils/API';

export const storyAxios = async () => {
  return API.get('/story')
    .then((res) => {
      return res.data.data;
    })
    .catch((e) => {
      console.log(e);
      console.log('Error Handling');
      return null;
    });
};

export const storyRegistAxios = async (story: string) => {
  return API.post('/story', { story })
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((e) => {
      console.log(e);
      console.log('Error Handling');
      return null;
    });
};
