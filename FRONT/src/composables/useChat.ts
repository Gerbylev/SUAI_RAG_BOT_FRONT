import { ref, computed, onMounted } from 'vue'
import type { Message, ChatRequest } from '@/types'
import { chatApi } from '@/utils/api'

const STORAGE_USER_ID_KEY = 'suai_bot_user_id'
const STORAGE_SESSION_ID_KEY = 'suai_bot_session_id'

// Генерирует уникальный ID
function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Получает или создаёт user_id
function getUserId(): string {
  let userId = localStorage.getItem(STORAGE_USER_ID_KEY)
  if (!userId) {
    userId = generateId()
    localStorage.setItem(STORAGE_USER_ID_KEY, userId)
  }
  return userId
}

// Получает текущую session_id или null
function getSessionId(): string | null {
  return localStorage.getItem(STORAGE_SESSION_ID_KEY)
}

// Устанавливает новую session_id
function setSessionId(sessionId: string | null) {
  if (sessionId) {
    localStorage.setItem(STORAGE_SESSION_ID_KEY, sessionId)
  } else {
    localStorage.removeItem(STORAGE_SESSION_ID_KEY)
  }
}

export function useChat() {
  const messages = ref<Message[]>([
    {
      id: 1,
      text: 'Здравствуйте! Я Suai Rag Bot - ваш университетский помощник. Могу ответить на вопросы о расписании, учебных материалах, преподавателях и многом другом.',
      type: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])

  const userInput = ref('')
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const userId = ref<string>('')
  const sessionId = ref<string | null>(null)
  const isInitialized = ref(false)

  // Инициализация user_id и session_id
  const initializeChat = async () => {
    try {
      userId.value = getUserId()
      sessionId.value = getSessionId()

      // Если есть session_id, загружаем историю
      if (sessionId.value) {
        await loadSessionHistory()
      }

      isInitialized.value = true
    } catch (err) {
      error.value = `Ошибка инициализации чата: ${err instanceof Error ? err.message : 'неизвестная ошибка'}`
    }
  }

  // Загружает историю сессии
  const loadSessionHistory = async () => {
    if (!sessionId.value) return

    try {
      const response = await chatApi.getSessionHistory(sessionId.value)

      // Преобразуем API ответ в формат Message
      messages.value = response.messages.map(msg => ({
        id: msg.id,
        text: msg.content,
        type: msg.message_type === 'user' ? 'user' : 'bot',
        time: new Date(msg.created_at).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      }))

      // Если история пустая, добавляем приветственное сообщение
      if (messages.value.length === 0) {
        messages.value = [
          {
            id: 1,
            text: 'Здравствуйте! Я Suai Rag Bot - ваш университетский помощник. Могу ответить на вопросы о расписании, учебных материалах, преподавателях и многом другом.',
            type: 'bot',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]
      }

      error.value = null
    } catch (err) {
      error.value = `Ошибка загрузки истории: ${err instanceof Error ? err.message : 'неизвестная ошибка'}`
      console.error('Error loading session history:', err)
    }
  }

  // Создаёт новую сессию
  const createNewSession = async () => {
    try {
      const newSessionId = generateId()
      setSessionId(newSessionId)
      sessionId.value = newSessionId

      // Сбрасываем сообщения и показываем приветствие
      messages.value = [
        {
          id: 1,
          text: 'Здравствуйте! Я Suai Rag Bot - ваш университетский помощник. Могу ответить на вопросы о расписании, учебных материалах, преподавателях и многом другом.',
          type: 'bot',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]

      userInput.value = ''
      error.value = null
    } catch (err) {
      error.value = `Ошибка создания новой сессии: ${err instanceof Error ? err.message : 'неизвестная ошибка'}`
    }
  }

  // Отправляет сообщение
  const sendMessage = async () => {
    const text = userInput.value.trim()
    if (!text || isLoading.value || !userId.value) return

    try {
      error.value = null

      // Добавляем сообщение пользователя в интерфейс
      const userMessage: Message = {
        id: Date.now(),
        text: text,
        type: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }

      messages.value.push(userMessage)
      userInput.value = ''
      isLoading.value = true

      // Отправляем сообщение на сервер
      const request: ChatRequest = {
        user_id: userId.value,
        message: text,
        session_id: sessionId.value,
        save_history: true
      }

      const response = await chatApi.sendMessage(request)

      // Если нет session_id, устанавливаем его из ответа
      if (!sessionId.value && response.session_id) {
        setSessionId(response.session_id)
        sessionId.value = response.session_id
      }

      // Добавляем ответ бота с источниками и изображениями
      const botMessage: Message = {
        id: Date.now() + 1,
        text: response.response,
        type: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: response.sources || null,
        images: response.images || null
      }

      messages.value.push(botMessage)
      error.value = null
    } catch (err) {
      error.value = `Ошибка отправки сообщения: ${err instanceof Error ? err.message : 'неизвестная ошибка'}`
      console.error('Error sending message:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Удаляет историю текущей сессии
  const deleteSessionHistory = async () => {
    if (!userId.value || !sessionId.value) return

    try {
      await chatApi.deleteHistory(userId.value, sessionId.value)

      // Создаём новую сессию
      await createNewSession()
      error.value = null
    } catch (err) {
      error.value = `Ошибка удаления истории: ${err instanceof Error ? err.message : 'неизвестная ошибка'}`
      console.error('Error deleting history:', err)
    }
  }

  // Подсчёт сообщений
  const userMessagesCount = computed(() =>
    messages.value.filter(m => m.type === 'user').length
  )

  const botMessagesCount = computed(() =>
    messages.value.filter(m => m.type === 'bot').length
  )

  // Инициализация при монтировании
  onMounted(() => {
    initializeChat()
  })

  return {
    messages,
    userInput,
    isLoading,
    error,
    userId,
    sessionId,
    isInitialized,
    sendMessage,
    createNewSession,
    deleteSessionHistory,
    loadSessionHistory,
    userMessagesCount,
    botMessagesCount
  }
}