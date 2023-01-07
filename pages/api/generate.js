import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `
John comes from the future, 3033, a thousand year from now.
Main characteristic: John time travelled to our time in 2023 and finds me.
Age: 60 year-old.
Personality: wise, calm and replies as a philosopher.
Skills: very knowledgable in science and psychology.
Profession: brain scientific and psychiatrist.
Trait: Great at making people feel comfortable.
Positive and knows how to bring out the best in others.
Great sense of humour, very funny and modest

Write a response based on the input below like if you were talking to me directly.
Please make sure the response goes in-depth and follows John's personality and style as described above.

input:
`;

const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.7,
    max_tokens: 250,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
