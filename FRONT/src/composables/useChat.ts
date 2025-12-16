import { ref, computed } from 'vue'
import type { Message } from '@/types'

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

  const sendMessage = async () => {
    const text = userInput.value.trim()
    if (!text || isLoading.value) return

    // Добавление сообщения пользователя
    const userMessage: Message = {
      id: Date.now(),
      text: text,
      type: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    
    messages.value.push(userMessage)
    userInput.value = ''
    isLoading.value = true
    
    // Имитация ответа от RAG-модели
    setTimeout(() => {
      const responses = [
        `На вопрос "${text}" могу ответить следующей информацией из базы знаний университета: это регулируется соответствующими положениями и распоряжениями деканата.`,
        `Согласно университетским правилам и данным из RAG-системы, ${text.toLowerCase()}. Более подробную информацию можно уточнить в деканате.`,
        `По вашему запросу "${text}": на основе данных университета могу сказать, что обычно это осуществляется через личный кабинет студента.`,
        `Отличный вопрос! ${text} - один из частых запросов студентов. Согласно информации из базы данных, решение этого вопроса занимает 1-3 рабочих дня.`,
        `На основе университетской RAG-базы знаний могу сказать, что ${text.toLowerCase()}. Рекомендую также проверить актуальную информацию.`
      ]
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      
      const botMessage: Message = {
        id: Date.now() + 1,
        text: randomResponse,
        type: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      
      messages.value.push(botMessage)
      isLoading.value = false
      
    }, 1500 + Math.random() * 1000)
  }

  // Для удобства вычисления количества сообщений
  const userMessagesCount = computed(() => 
    messages.value.filter(m => m.type === 'user').length
  )
  
  const botMessagesCount = computed(() => 
    messages.value.filter(m => m.type === 'bot').length
  )

  return {
    messages,
    userInput,
    isLoading,
    sendMessage,
    userMessagesCount,
    botMessagesCount
  }
}