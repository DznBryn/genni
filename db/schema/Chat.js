import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  name: { type: String },
  role: { type: String, enum: ['system', 'user'], required: true },
  content: { type: String, required: true },
});

const UserInputSchema = new mongoose.Schema({
  messages: [MessageSchema],
  model: { type: String, default: 'gpt-4-1106-preview' },
  max_tokens: { type: Number, default: 900 },
});

export const ChoiceSchema = new mongoose.Schema({
  message: {
    role: {
      type: String,
      required: true,
    }, // As the message is an Object, using Map type to store key-value pairs
    content: {
      type: String,
      required: true,
    },
  },
  logprobs: mongoose.Schema.Types.Mixed, // Mixed type for any schema type
  finish_reason: String,
});

export const UsageSchema = new mongoose.Schema({
  prompt_tokens: Number,
  completion_tokens: Number,
  total_tokens: Number,
});

// Define Mongoose schema and model
export const AssistantInputSchema = new mongoose.Schema({
  object: String,
  created: Number,
  model: String,
  choices: [ChoiceSchema],
  usage: UsageSchema,
  system_fingerprint: String,
});

export const ChatSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  created: Number,
  request: UserInputSchema,
  response: AssistantInputSchema,
});

export const ChatsSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: String,
  created: Number,
  chats: [ChatSchema],
});

export const ChatsModel = mongoose.model('Chats', ChatsSchema);
