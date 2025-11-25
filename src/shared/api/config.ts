// API Configuration
export const API_CONFIG = {
  // Use empty string for development (Vite proxy will handle it)
  // Set VITE_API_BASE_URL in production
  BASE_URL: import.meta.env.VITE_API_BASE_URL || '',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 1, // Only 1 retry to avoid spam
  RETRY_DELAY: 500, // 0.5 second
} as const

export const API_ENDPOINTS = {
  HEALTH: '/api/agent/health',
  AGENTS: '/api/agent/agents',
  AGENT_STATE: (agentId: string) => `/api/agent/agents/${agentId}/state`,
  AGENT_CLARIFICATION: (agentId: string) => `/api/agent/agents/${agentId}/provide_clarification`,
  MODELS: '/api/agent/v1/models',
  CHAT_COMPLETIONS: '/api/agent/v1/chat/completions',
  // Chat history endpoints (still used by chatStore)
  CHATS_LIST: '/api/agent/v1/chats',
  CHAT_DETAIL: (agentId: string) => `/api/agent/v1/chats/${agentId}`,
  CHAT_HISTORY: (agentId: string) => `/api/agent/v1/chats/${agentId}/history`,
  CHAT_DELETE: (agentId: string) => `/api/agent/v1/chats/${agentId}`,
} as const
