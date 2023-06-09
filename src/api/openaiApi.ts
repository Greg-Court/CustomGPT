import { Configuration, OpenAIApi } from 'openai';
import { Message } from '../types/types';

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_GPT_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const getModelOptions = async () => {
  const response = await openai.listModels();
  console.log(JSON.stringify(response.data.data));
  const modelOptions = response.data.data.filter((model) => model.id.includes('gpt')).map((model) => ({
    value: model.id,
    label: model.id,
  }));
  return modelOptions;
};

export const generateAiResponse = async (model, messages) => {
  return await openai.createChatCompletion({
    model: model,
    messages: messages,
    temperature: 1,
  })
};
