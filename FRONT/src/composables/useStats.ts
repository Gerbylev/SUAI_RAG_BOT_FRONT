import { ref, computed, watch } from 'vue'
import type { Message, UsageStats } from '@/types'

export function useStats(messages: { value: Message[] }) {
  const usageStats = ref<UsageStats>({
    questions: 0,
    answers: 0
  })

  const refreshStats = () => {
    usageStats.value.questions = messages.value.filter(m => m.type === 'user').length
    usageStats.value.answers = messages.value.filter(m => m.type === 'bot').length - 1 // минус приветственное сообщение
  }

  // Автоматически обновляем статистику при изменении сообщений
  watch(() => messages.value.length, () => {
    refreshStats()
  }, { deep: true, immediate: true })

  return {
    usageStats,
    refreshStats
  }
}