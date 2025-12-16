import { ref, onMounted } from 'vue'

export function useTheme() {
  const isDarkTheme = ref(false)

  const toggleTheme = () => {
    isDarkTheme.value = !isDarkTheme.value
    localStorage.setItem('srb-theme', isDarkTheme.value ? 'dark' : 'light')
    
    if (isDarkTheme.value) {
      document.documentElement.classList.add('dark-theme')
    } else {
      document.documentElement.classList.remove('dark-theme')
    }
  }

  const initTheme = () => {
    const savedTheme = localStorage.getItem('srb-theme')
    if (savedTheme === 'dark') {
      isDarkTheme.value = true
      document.documentElement.classList.add('dark-theme')
    }
  }

  onMounted(() => {
    initTheme()
  })

  return {
    isDarkTheme,
    toggleTheme
  }
}