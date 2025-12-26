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
            <div class="text-wrapper">
              <div class="text">{{ message.text }}</div>
              <!-- Изображения под сообщением бота -->
              <div v-if="message.type === 'bot' && message.images && Object.keys(message.images).length > 0" class="images-container">
                <div class="images-gallery">
                  <div
                    v-for="(imageData, imageName) in message.images"
                    :key="imageName"
                    class="image-item"
                  >
                    <img
                      v-if="imageData.data"
                      :src="`data:image/png;base64,${imageData.data}`"
                      :alt="`Map: ${imageData.destination}`"
                      class="image-content"
                    />
                    <div class="image-meta" v-if="imageData.destination">
                      <div class="image-title">🗺️ {{ imageData.building }}</div>
                      <div class="image-details">
                        📍 {{ imageData.starting_point }} → {{ imageData.destination }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Источники под сообщением бота -->
              <div v-if="message.type === 'bot' && message.sources && Object.keys(message.sources).length > 0" class="sources-container">
                <div class="sources-label">📚 Источники:</div>
                <div class="sources-list">
                  <a
                    v-for="(url, num) in sortedSources(message.sources)"
                    :key="num"
                    :href="url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="source-link"
                  >
                    [{{ num }}]
                  </a>
                </div>
              </div>
            </div>
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

// Сортирует источники по номеру
const sortedSources = (sources: Record<string, string>): Record<string, string> => {
  const sorted: Record<string, string> = {}
  Object.keys(sources)
    .sort((a, b) => parseInt(a) - parseInt(b))
    .forEach(key => {
      sorted[key] = sources[key]
    })
  return sorted
}

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

/* Стили для источников */
.text-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sources-container {
  margin-top: 8px;
  padding: 8px 12px;
  background: rgba(79, 70, 229, 0.08);
  border-left: 3px solid #4f46e5;
  border-radius: 6px;
  font-size: 12px;
}

.sources-label {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 6px;
  font-size: 12px;
}

.sources-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.source-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px 8px;
  background: #4f46e5;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  transition: all var(--transition-fast) ease;
  cursor: pointer;
  border: 1px solid transparent;
}

.source-link:hover {
  background: #4338ca;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.source-link:active {
  transform: translateY(0);
}

/* Стили для изображений */
.images-container {
  margin-top: 8px;
  border-radius: 8px;
  overflow: hidden;
}

.images-gallery {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.image-item {
  overflow: hidden;
  border-radius: 8px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  animation: imageLoad 0.3s ease-out;
}

@keyframes imageLoad {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.image-content {
  width: 100%;
  height: auto;
  display: block;
  max-width: 500px;
  border-radius: 6px 6px 0 0;
  object-fit: cover;
  transition: transform 0.2s ease;
  cursor: pointer;
}

.image-content:hover {
  transform: scale(1.02);
}

.image-meta {
  padding: 10px 12px;
  background: rgba(79, 70, 229, 0.05);
  border-top: 1px solid var(--border-color);
  font-size: 12px;
}

.image-title {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.image-details {
  color: var(--text-secondary);
  font-size: 11px;
  line-height: 1.4;
}

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