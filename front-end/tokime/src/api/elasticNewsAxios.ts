import ESAPI from '../utils/ESAPI';

export default async function elasticNewsAxios(story: string | null) {
  const queryStory = story || ''; // story가 null이면 빈 문자열로 처리하여 새로운 변수에 할당

  const data = {
    size: 2,
    _source: ['original_data'],
    min_score: 5,
    query: {
      match: {
        tokens: queryStory, // story를 tokens에 넣음
      },
    },
  };
  return ESAPI.post('/news/_search', data) // post 요청으로 data 요청
    .then((res) => {
      //   console.log(res.data.hits.hits);
      return res.data.hits.hits;
    })
    .catch((e) => {
      console.log(e);
      console.log('Error Handling');
      return null;
    });
}
