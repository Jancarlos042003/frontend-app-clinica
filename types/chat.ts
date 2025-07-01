export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  imageUri?: string;
  isStreaming?: boolean;
  isComplete?: boolean;
}

export interface ChatInputData {
  message: string;
}
