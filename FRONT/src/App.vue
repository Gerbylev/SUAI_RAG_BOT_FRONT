<template>
  <div class="university-assistant" :class="{ 'dark-theme': isDarkTheme }">
    <Header
      :is-dark-theme="isDarkTheme"
      @toggle-theme="toggleTheme"
      @new-chat="handleNewChat"
    />
    
    <main class="assistant-main">
      <Sidebar 
        :quick-actions="quickActions"
        :usage-stats="usageStats"
        @quick-action="handleQuickAction"
        @refresh-stats="refreshStats"
      />
      
      <div class="chat-area">
        <Welcome 
          :show="showWelcome"
          @close="closeWelcome"
        />
        
        <Chat 
          :messages="messages"
          :is-loading="isLoading"
        />
        
        <ChatInput 
          v-model="userInput"
          :is-loading="isLoading"
          @update:model-value="(val) => userInput = val"
          @send="sendMessage"
        />
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'
import Header from './components/Header/Header.vue'
import Sidebar from './components/Sidebar/Sidebar.vue'
import Welcome from './components/Welcome/Welcome.vue'
import Chat from './components/Chat/Chat.vue'
import ChatInput from './components/Chat/ChatInput.vue'
import Footer from './components/Footer/Footer.vue'
import { useTheme } from './composables/useTheme'
import { useChat } from './composables/useChat'
import { useQuickActions } from './composables/useQuickActions'
import { useStats } from './composables/useStats'
import type { QuickAction } from './types'

// Инициализация композейблов
const { isDarkTheme, toggleTheme } = useTheme()
const {
  messages,
  userInput,
  isLoading,
  error,
  sendMessage: sendChatMessage,
  createNewSession
} = useChat()
const { quickActions } = useQuickActions()
const { usageStats, refreshStats } = useStats(messages)

// Локальное состояние
const showWelcome = ref(true)

// Обработчики
const handleQuickAction = (action: QuickAction) => {
  userInput.value = action.title
  sendMessage()
}

const closeWelcome = () => {
  showWelcome.value = false
}

const sendMessage = async () => {
  await sendChatMessage()
  // Обновляем статистику после отправки
  refreshStats()
}

const handleNewChat = async () => {
  await createNewSession()
  closeWelcome()
  refreshStats()
}

// Инициализация
onMounted(() => {
  refreshStats()

  console.log('🎓 Suai Rag Bot запущен')
})

// Наблюдатель за сообщениями для авто-скролла и обновления статистики
watch(messages, () => {
  nextTick(() => {
    refreshStats()
  })
}, { deep: true })
</script>

<style scoped>
/* Глобальный сброс */
:global(html),
:global(body),
:global(#app) {
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  height: 100% !important;
  overflow: hidden !important;
  background-color: var(--bg-primary, #ffffff);
}

:global(.dark-theme) {
  background-color: #0f172a;
}

.university-assistant {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-tertiary: #f1f5f9;
  --bg-card: #ffffff;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --text-tertiary: #94a3b8;
  --border-color: #e2e8f0;
  --shadow-color: rgba(0, 0, 0, 0.1);
  --header-bg: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
  --header-text: #ffffff;
  --srb-blue: #3b82f6;
  --srb-dark-blue: #1e3a8a;
  --online-color: #10b981;
  --transition-speed: 0.3s;
  --transition-slow: 0.5s;
  --transition-fast: 0.15s;
  --sidebar-width: 280px;
  --header-height: 65px;
  --footer-height: 50px;
  --chat-input-height: 90px;
  --scrollbar-light: #c1c1c1;
  --scrollbar-dark: #4a5568;
  
  /* Абсолютное позиционирование вместо fixed */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: var(--bg-primary);
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
}

.university-assistant.dark-theme {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --bg-tertiary: #334155;
  --bg-card: #1e293b;
  --text-primary: #f1f5f9;
  --text-secondary: #cbd5e1;
  --text-tertiary: #94a3b8;
  --border-color: #334155;
  --shadow-color: rgba(0, 0, 0, 0.3);
  --header-bg: linear-gradient(135deg, #0c4a6e 0%, #075985 100%);
  --header-text: #e2e8f0;
  --srb-blue: #60a5fa;
  --srb-dark-blue: #1e40af;
  --online-color: #34d399;
  --scrollbar-light: #4a5568;
  --scrollbar-dark: #718096;
  
  background-color: var(--bg-primary);
}

/* Глобальные стили для скроллбара */
.university-assistant * {
  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar-light) transparent;
}

.university-assistant.dark-theme * {
  scrollbar-color: var(--scrollbar-dark) transparent;
}

.university-assistant ::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.university-assistant ::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 4px;
}

.university-assistant ::-webkit-scrollbar-thumb {
  background: var(--scrollbar-light);
  border-radius: 4px;
}

.university-assistant.dark-theme ::-webkit-scrollbar-thumb {
  background: var(--scrollbar-dark);
}

.university-assistant ::-webkit-scrollbar-thumb:hover {
  background: var(--srb-blue);
}

/* Основной контент */
.assistant-main {
  flex: 1;
  display: flex;
  width: 100%;
  height: calc(100% - var(--header-height) - var(--footer-height));
  padding: 16px;
  gap: 16px;
  min-height: 0;
  overflow: hidden;
  margin: 0;
  box-sizing: border-box;
}

/* Центральная часть - чат */
.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--bg-primary);
  border-radius: 14px;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 16px var(--shadow-color);
  overflow: hidden;
  min-height: 0;
  height: 100%;
  max-height: calc(100% - 32px);
  margin: 0;
  box-sizing: border-box;
}

/* Адаптивность */
@media (max-width: 1024px) {
  :root {
    --sidebar-width: 240px;
  }
  
  .assistant-main {
    padding: 16px;
    gap: 16px;
  }
}

@media (max-width: 768px) {
  :root {
    --sidebar-width: 0px;
    --header-height: 60px;
    --footer-height: 45px;
  }
  
  .assistant-main {
    flex-direction: column;
    padding: 12px;
  }
  
  .chat-area {
    height: 100%;
    max-height: calc(100% - 24px);
  }
}

@media (max-width: 480px) {
  :root {
    --header-height: 58px;
    --footer-height: 42px;
  }
}
</style>