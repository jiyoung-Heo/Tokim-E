import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: `${process.env.REACT_APP_OPEN_AI_KEY}`,
  dangerouslyAllowBrowser: true,
});

const OpenAiUtil = {
  async prompt(msg: string): Promise<any> {
    // 타입을 임시로 any로 설정
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: msg }],
        model: 'gpt-3.5-turbo',
        // model: "gpt-4",
      });

      return completion.choices[0]; // choices 배열의 첫 번째 요소 반환
    } catch (error) {
      console.log('OpenAi API 실행 중 오류 발생: ', error);
      throw error;
    }
  },
};

export default OpenAiUtil;
