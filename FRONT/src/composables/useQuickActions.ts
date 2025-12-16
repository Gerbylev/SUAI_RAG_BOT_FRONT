import { ref } from 'vue'
import type { QuickAction } from '@/types'

export function useQuickActions() {
  const quickActions = ref<QuickAction[]>([
    { 
      id: 1, 
      title: 'Расписание', 
      icon: '📅', 
      color: '#3b82f6'
    },
    { 
      id: 2, 
      title: 'Экзамены', 
      icon: '📝', 
      color: '#1e40af'
    },
    { 
      id: 3, 
      title: 'Стипендии', 
      icon: '💰', 
      color: '#1e3a8a'
    },
    { 
      id: 4, 
      title: 'Общежития', 
      icon: '🏠', 
      color: '#0ea5e9'
    },
    { 
      id: 5, 
      title: 'Библиотека', 
      icon: '📖', 
      color: '#06b6d4'
    }
  ])

  return {
    quickActions
  }
}