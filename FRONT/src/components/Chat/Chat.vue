<template>
  <div class="chat-messenger-style">
    <!-- Окно сообщений с авто-прокруткой -->
    <div class="chat-messages-container" ref="messagesContainer">
      <div class="messages-scroll-area">
        <!-- Блочный элемент для каждого сообщения -->
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="['message', message.type]"
        >
          <div class="message-content">
            <div v-if="message.type === 'bot'" class="avatar">
              <div class="avatar-icon">SRB</div>
            </div>
            <div class="text">{{ message.text }}</div>
            <div v-if="message.type === 'user'" class="avatar">
              <div class="avatar-icon">Вы</div>
            </div>
          </div>
          <div class="message-time">{{ message.time }}</div>
        </div>

        <!-- Индикатор загрузки -->
        <div v-if="isLoading" class="typing-indicator">
          <div class="avatar">
            <div class="avatar-icon">SRB</div>
          </div>
          <div class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        
        <!-- Пустое пространство внизу для отступов -->
        <div class="message-spacer"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import type { Message } from '@/types'

const props = defineProps<{
  messages: Message[]
  isLoading: boolean
}>()

const messagesContainer = ref<HTMLElement>()

// Авто-прокрутка вниз
const scrollToBottom = () => {
  if (messagesContainer.value) {
    const scrollElement = messagesContainer.value.querySelector('.messages-scroll-area')
    if (scrollElement) {
      scrollElement.scrollTo({
        top: scrollElement.scrollHeight,
        behavior: 'smooth'
      })
    } else {
      messagesContainer.value.scrollTo({
        top: messagesContainer.value.scrollHeight,
        behavior: 'smooth'
      })
    }
  }
}

// Инициализация
onMounted(() => {
  setTimeout(() => {
    scrollToBottom()
  }, 300)
})

// Автоскролл при новых сообщениях
watch(() => props.messages, () => {
  // Небольшая задержка для гарантии, что DOM обновился
  nextTick(() => {
    // Увеличиваем задержку для гарантии, что сообщение отобразилось
    setTimeout(() => {
      scrollToBottom()
    }, 100)
  })
}, { deep: true, immediate: false })

// Автоскролл при появлении/исчезновении индикатора набора
watch(() => props.isLoading, () => {
  nextTick(() => {
    setTimeout(() => {
      scrollToBottom()
    }, 100)
  })
})
</script>

<style scoped>
.chat-messenger-style {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
  position: relative;
}

/* Контейнер сообщений */
.chat-messages-container {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  position: relative;
}

.messages-scroll-area {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  padding: 22px 30px; 
  display: flex;
  flex-direction: column;
  gap: 20px;
  scroll-behavior: smooth;
  /* Добавляем паддинг снизу для лучшего отображения */
  padding-bottom: 30px;
}

.message-spacer {
  height: 20px; 
  flex-shrink: 0;
}

.message {
  animation: messageAppear 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes messageAppear {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message.user {
  animation-delay: 0.1s;
}

.message.bot {
  animation-delay: 0.2s;
}

.message-content {
  display: flex;
  align-items: flex-start;
  gap: 18px; 
  max-width: 85%;
}

.message.user .message-content {
  margin-left: auto;
  flex-direction: row-reverse;
}

.avatar-icon {
  width: 44px;
  height: 44px; 
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  color: white;
  transition: transform var(--transition-fast) ease;
}

.message:hover .avatar-icon {
  transform: scale(1.05);
}

.message.bot .avatar-icon {
  background: var(--srb-blue);
  font-weight: 800;
}

.message.user .avatar-icon {
  background: #4f46e5;
}

.text {
  padding: 16px 20px; 
  border-radius: 18px;
  line-height: 1.6;
  font-size: 15px;
  word-wrap: break-word;
  max-width: calc(100% - 62px);
  transition: all var(--transition-fast) ease;
}

.message.bot .text {
  background: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-bottom-left-radius: 6px;
}

.message.user .text {
  background: #4f46e5;
  color: white;
  border-bottom-right-radius: 6px;
  animation: userMessageSend 0.3s ease-out;
}

@keyframes userMessageSend {
  0% {
    transform: translateY(10px);
    opacity: 0.8;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.message-time {
  font-size: 12px; 
  color: var(--text-tertiary);
  margin-top: 10px; 
  padding-left: 62px; 
  opacity: 0.8;
  transition: opacity var(--transition-fast) ease;
}

.message:hover .message-time {
  opacity: 1;
}

.message.user .message-time {
  text-align: right;
  padding-left: 0;
  padding-right: 62px; 
}

/* Индикатор набора */
.typing-indicator {
  display: flex;
  align-items: center;
  gap: 18px; 
  padding: 12px 0; 
  animation: fadeInUp 0.3s ease-out;
}

.typing-dots {
  display: flex;
  gap: 8px; 
  padding: 14px 18px;
  background: var(--bg-card);
  border-radius: 18px;
  border: 1px solid var(--border-color);
  animation: pulseSoft 1.5s infinite ease-in-out;
}

@keyframes pulseSoft {
  0%, 100% { 
    opacity: 1;
    transform: scale(1);
  }
  50% { 
    opacity: 0.8;
    transform: scale(0.98);
  }
}

.typing-dots span {
  width: 9px; 
  height: 9px;
  background: var(--text-tertiary);
  border-radius: 50%;
  animation: bounce 1.4s infinite cubic-bezier(0.4, 0, 0.2, 1);
}

.typing-dots span:nth-child(2) { animation-delay: 0.2s; }
.typing-dots span:nth-child(3) { animation-delay: 0.4s; }

/* Адаптивность для Chat */
@media (max-width: 1024px) {
  .messages-scroll-area {
    padding-left: 20px;
    padding-right: 20px;
  }
}

@media (max-width: 768px) {
  .messages-scroll-area {
    padding: 16px;
  }
}

@media (max-width: 480px) {
  .messages-scroll-area {
    padding: 14px;
  }
}
</style>