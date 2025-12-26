export interface Message {
  id: number
  text: string
  type: 'user' | 'bot'
  time: string
  sources?: Record<string, string> | null
  images?: Record<string, any> | null
}

// API Response Models
export interface ChatMessageResponse {
  id: number
  user_id: string
  session_id: string | null
  message_type: string
  content: string
  extra_data: Record<string, any> | null
  created_at: string
}

export interface ChatHistoryResponse {
  messages: ChatMessageResponse[]
  total: number
  user_id: string
  session_id: string | null
}

export interface ChatRequest {
  user_id: string
  message: string
  session_id: string | null
  save_history: boolean
}

export interface ChatResponse {
  response: string
  user_id: string
  session_id: string | null
  sources?: Record<string, string> | null
  images?: Record<string, any> | null
}

export interface DeleteHistoryResponse {
  deleted_count: number
  user_id: string
  session_id: string | null
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