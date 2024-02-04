const completion = `
  type Completion {
    id: String
    object: String
    created: Int
    model: String
    choices: [Choice]
    usage: Usage
  }
`;

const usage = `
  type Usage {
    prompt_tokens: Int
    completion_tokens: Int
    total_tokens: Int
  }
`;

const choice = `
  type Choice {
    message: Message
    index: Int
    logprobs: Logprob
    finish_reason: String
  }
`;

const logprobs = `
  type Logprobs {
    tokens: [String]
    text_offset: [Int]
    token_logprobs: [Float]
    top_logprobs: [Float]
    text: String
  }
`;

const logprob = `
  type Logprob {
    content: [Content]
  }
`;

const content = `
  type Content {
    token: String
    logprob: Int
    bytes: [Int]
  }
`;

const message = `
  type Message {
    name: String
    role: String
    content: String
  }
`;

const delta = `
  type Delta {
    content: String
    tool_calls: [ToolCall]
    role: String
  }
`;

const toolCall = `
  type ToolCall {
    index: Int
    id: String
    type: String
    function: Function
  }
`;

const func = `
  type Function {
    name: String
    arguments: String
  }
`;

const newsApiResponse = `
  type NewsApiResponse {
    status: String
    totalResults: Int
    articles: [Article]
  }
`;

const article = `
  type Article {
    source: Source
    author: String
    title: String
    description: String
    url: String
    urlToImage: String
    publishedAt: String
    content: String
  }
`;

const source = `
  type Source {
    id: String
    name: String
  }
`;

const chatSession = `
  type ChatSession {
    id: String!
    title: String
    created: Float
    chats: [Chat]
  }
`;

const chat = `
  type Chat {
    id: String!
    created: Float
    request: ChatRequest
    response: Completion
  }
`;

const chatRequest = `
  type ChatRequest {
    messages: [Message]
    model: String
    max_tokens: Int
  }
`;

const completionInput = `
  input CompletionInput {
    id: String
    object: String
    created: Int
    model: String
    choices: [ChoiceInput]
  }
`;

const choiceInput = `
  input ChoiceInput {
    message: MessageInput
    index: Int
    finish_reason: String
  }
`;

const messageInput = `
  input MessageInput {
    name: String
    role: String
    content: String
  }
`;

const userInput = `
  input UserInput {
    messages: [MessageInput]
    model: String
    max_tokens: Int
  }
`;

const chatInput = `
  input ChatInput {
    id: String!
    created: Float
    request: UserInput
    response: CompletionInput
  }
`;

const storeChatInput = `
  input StoreChatInput {
    id: String!
    title: String
    chat: ChatInput
  }
`;

const query = `
  type Query {
    news(prompt: String!): NewsApiResponse
    getChatSession(id: String!): ChatSession
  }
`;

const mutation = `
  type Mutation {
    askGenni(prompt: String!, chatId: String): Completion
    storeMemory(type: String! data: StoreChatInput): ChatSession
  }
`;

const json = `
  scalar JSON
`;

export default `
${query}
${mutation}
${completion}
${usage}
${choice}
${logprobs}
${logprob}
${content}
${message}
${delta}
${toolCall}
${func}
${newsApiResponse}
${article}
${source}
${chatSession}
${chat}
${chatRequest}
${completionInput}
${choiceInput}
${messageInput}
${userInput}
${chatInput}
${storeChatInput}
${json}
`;
