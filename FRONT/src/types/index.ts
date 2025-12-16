export interface Message {
  id: number
  text: string
  type: 'user' | 'bot'
  time: string
}

export interface QuickAction {
  id: number
  title: string
  icon: string
  color: string
}

export interface UsageStats {
  questions: number
  answers: number
}