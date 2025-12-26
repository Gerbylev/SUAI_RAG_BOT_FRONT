<template>
  <header class="assistant-header">
    <div class="header-container">
      <div class="header-left">
        <div class="logo-container">
          <div class="logo-letters">SRB</div>
          <div class="logo-badge">AI</div>
        </div>
        <div class="header-title">
          <h1>Suai Rag Bot</h1>
          <p class="header-subtitle">Интеллектуальный ассистент университета</p>
        </div>
      </div>
      
      <div class="header-right">
        <!-- Кнопка новый чат -->
        <button
          class="new-chat-btn"
          @click="$emit('newChat')"
          title="Начать новый чат"
        >
          <span class="new-chat-icon">+</span>
          <span class="new-chat-label">Новый чат</span>
        </button>

        <!-- Переключатель темы -->
        <div class="theme-switcher">
          <button
            class="theme-btn"
            @click="$emit('toggleTheme')"
            :title="isDarkTheme ? 'Включить светлую тему' : 'Включить темную тему'"
          >
            <span class="theme-icon">{{ isDarkTheme ? '☀️' : '🌙' }}</span>
            <span class="theme-label">{{ isDarkTheme ? 'Светлая' : 'Темная' }}</span>
          </button>
        </div>

        <div class="user-info">
          <div class="status">
            <span class="status-dot online"></span>
            <span class="status-text">AI онлайн</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  isDarkTheme: boolean
}>()

defineEmits<{
  toggleTheme: []
  newChat: []
}>()
</script>

<style scoped>
.assistant-header {
  background: var(--header-bg);
  color: var(--header-text);
  box-shadow: 0 3px 10px var(--shadow-color);
  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--header-height);
  flex-shrink: 0;
  width: 100%;
  margin: 0;
  padding: 10px 0;
}

.header-container {
  width: 100%;
  height: 100%;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  box-sizing: border-box;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
}

/* Логотип SRB */
.logo-container {
  position: relative;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.logo-letters {
  font-size: 20px;
  font-weight: 800;
  color: white;
  background: var(--srb-blue);
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1px;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  flex-shrink: 0;
}

.logo-badge {
  position: absolute;
  top: -3px;
  right: -3px;
  background: var(--online-color);
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 5px;
  border-radius: 8px;
  border: 2px solid var(--header-bg);
}

.header-title {
  min-width: 0;
}

.header-title h1 {
  font-size: 20px; 
  font-weight: 700;
  margin: 0 0 4px 0; 
  letter-spacing: 0.5px;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header-subtitle {
  font-size: 12px; 
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

/* Переключатель темы */
.theme-switcher {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.theme-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 14px;
  color: var(--header-text);
  font-size: 13px; 
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  flex-shrink: 0;
}

.theme-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.theme-icon {
  font-size: 16px;
  transition: transform var(--transition-slow) ease;
}

.theme-btn:hover .theme-icon {
  transform: rotate(20deg);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px; 
  white-space: nowrap;
}

.status-dot {
  width: 7px;
  height: 7px; 
  border-radius: 50%;
  background: var(--online-color);
  box-shadow: 0 0 6px var(--online-color);
  animation: pulse 2s infinite ease-in-out;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

/* Кнопка новый чат */
.new-chat-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 14px;
  color: var(--header-text);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  flex-shrink: 0;
  white-space: nowrap;
}

.new-chat-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.new-chat-btn:active {
  transform: translateY(0);
}

.new-chat-icon {
  font-size: 16px;
  font-weight: 700;
  transition: transform var(--transition-speed) ease;
}

.new-chat-btn:hover .new-chat-icon {
  transform: rotate(90deg);
}

/* Адаптивность для Header */
@media (max-width: 768px) {
  .header-title h1 {
    font-size: 18px;
  }
  
  .theme-btn .theme-label {
    display: none;
  }
}

@media (max-width: 480px) {
  .header-container {
    padding: 0 15px;
  }
}
</style>