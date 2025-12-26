import type { ChatRequest, ChatResponse, ChatHistoryResponse, DeleteHistoryResponse } from '@/types'
import { apiConfig } from '@/config/api.config'

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      detail: response.statusText
    }))
    throw new Error(error.detail || `API error: ${response.status}`)
  }
  return response.json()
}

// Helper function for logging in debug mode
function debugLog(message: string, data?: any) {
  if (apiConfig.debug) {
    console.log(`[API] ${message}`, data || '')
  }
}

export const chatApi = {
  // Send a message to the bot
  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    debugLog('Sending message', request)
    const response = await fetch(`${apiConfig.chatBaseUrl}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    })
    return handleResponse<ChatResponse>(response)
  },

  // Get chat history for a user
  async getUserHistory(
    userId: string,
    sessionId?: string | null,
    limit: number = 50
  ): Promise<ChatHistoryResponse> {
    let url = `${apiConfig.chatBaseUrl}/history/${userId}?limit=${limit}`
    if (sessionId) {
      url += `&session_id=${sessionId}`
    }

    debugLog('Fetching user history', { userId, sessionId, limit })
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return handleResponse<ChatHistoryResponse>(response)
  },

  // Get chat history for a specific session
  async getSessionHistory(
    sessionId: string,
    limit: number = 100
  ): Promise<ChatHistoryResponse> {
    debugLog('Fetching session history', { sessionId, limit })
    const response = await fetch(`${apiConfig.chatBaseUrl}/history/session/${sessionId}?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return handleResponse<ChatHistoryResponse>(response)
  },

  // Delete user history
  async deleteHistory(
    userId: string,
    sessionId?: string | null
  ): Promise<DeleteHistoryResponse> {
    let url = `${apiConfig.chatBaseUrl}/history/${userId}`
    if (sessionId) {
      url += `?session_id=${sessionId}`
    }

    debugLog('Deleting history', { userId, sessionId })
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return handleResponse<DeleteHistoryResponse>(response)
  }
}