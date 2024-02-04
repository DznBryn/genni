import { config } from 'dotenv';
import OpenAI from 'openai';
import NewsAPI from 'newsapi';
import { newsSources } from '../../features/news/const.js';
import { v4 as uuidv4 } from 'uuid';
import { ChatsModel } from '../../db/schema/Chat.js';

const newsapi = new NewsAPI(config().parsed.NEWS_API_KEY);
const openai = new OpenAI({
  apiKey: config().parsed.OPENAI_API_KEY,
});

export default {
  news: async ({ prompt }) => {
    try {
      const response = await newsapi.v2.everything({
        q: prompt,
        sources: newsSources,
        sortBy: 'relevancy',
        language: 'en',
      });
      console.log(response);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  askGenni: async function ({ prompt }) {
    const currentDate = new Date();
    const userInput = {
      messages: [
        {
          name: 'admin',
          role: 'system',
          content: `Current date and time is ${currentDate.toLocaleString()}. Your name is Genni, Geni, or Gen and you will be given prompts.`,
        },
        {
          name: 'admin',
          role: 'system',
          content: `If you are not able to provide current events, only provide search phrase only response within 10 words or less.`,
        },
        { role: 'user', content: prompt },
      ],
      model: 'gpt-4-1106-preview',
      max_tokens: 900,
    };
    const completion = await openai.chat.completions.create(userInput);

    return completion;
  },
  storeMemory: async function ({ type, data }) {
    const memory = {
      chats: async () => {
        const newChat = new ChatsModel({
          id: uuidv4(),
          title: data.title ?? 'New Chat',
          created: Date.now(),
          chats: [data.chat],
        });
        if (data.id) {
          const existingChat = await ChatsModel.findOne({ id: data.id });
          if (existingChat) {
            existingChat.chats.push(data.chat);
            return await existingChat.save();
          }
        }
        return await newChat.save();
      },
    };
    
    try {
      const response = await memory['chats'];
      return await response();
    } catch (error) {
      console.log('Unable to store memory: ', error);
      return {
        error: error.message,
      };
    }
  },
  getChatSession: async function ({ id }) {
    try {
      const response = await ChatsModel.findOne({ id });
      return await response;
    } catch (error) {
      console.log('Unable to get chat session: ', error);
      return error;
    }
  },
};
