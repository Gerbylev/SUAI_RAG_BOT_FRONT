// API Configuration
export const apiConfig = {
  // Базовый URL для API сервера
  // Может быть переопределён через переменные окружения
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',

  // Базовый путь для chat API
  get chatBaseUrl() {
    return `${this.baseUrl}/api/chat`
  },

  // Timeout для запросов (в миллисекундах)
  timeout: 30000,

  // Включить логирование запросов в разработке
  debug: import.meta.env.DEV
}