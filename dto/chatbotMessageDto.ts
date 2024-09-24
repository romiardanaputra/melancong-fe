export interface chatbotMessageDto {
  type: 'user' | 'bot' | 'loading'
  text: string
}
