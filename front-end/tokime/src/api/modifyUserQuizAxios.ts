import API from '../utils/API';

export default async function modifyUserQuizAxios(quizScore: number) {
  return API.put('/user/quiz', { quizScore })
    .then((res) => {
      return res.data.data[0].quizScore;
    })
    .catch((e) => {
      console.log(e);
      console.log('Error Handling');
      return null;
    });
}
