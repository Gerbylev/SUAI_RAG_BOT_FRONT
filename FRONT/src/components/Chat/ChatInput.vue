<template>
  <div class="chat-input-section">
    <!-- Поле ввода -->
    <div class="input-container-fixed">
      <div class="input-wrapper">
        <div class="input-icon">💬</div>
        <input
          v-model="inputValue"
          @keyup.enter="send"
          :placeholder="isLoading ? 'Ожидаю ответа...' : 'Задайте вопрос об университете...'"
          :disabled="isLoading"
          ref="inputRef"
          class="chat-input"
          autofocus
        />
        <button 
          @click="send"
          :disabled="!inputValue.trim() || isLoading"
          class="send-btn"
          :class="{ loading: isLoading }"
        >
          <span v-if="isLoading" class="send-btn-loading">⏳</span>
          <span v-else class="send-btn-icon">Отправить</span>
        </button>
      </div>
      <div class="input-hint">
        Нажмите Enter для отправки • SRB AI Assistant v1.0
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, nextTick, onMounted } from 'vue'

const props = defineProps<{
  modelValue: string
  isLoading: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'send': []
}>()

const inputValue = ref(props.modelValue)
const inputRef = ref<HTMLInputElement>()

// Следим за изменениями props.isLoading для восстановления фокуса после ответа
watch(() => props.isLoading, (newValue, oldValue) => {
  // Если загрузка закончилась (была true, стала false)
  if (oldValue === true && newValue === false) {
    // Небольшая задержка для гарантии, что DOM обновился
    nextTick(() => {
      setTimeout(() => {
        inputRef.value?.focus()
      }, 100)
    })
  }
})

watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue
})

watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue)
})

const send = () => {
  if (inputValue.value.trim() && !props.isLoading) {
    emit('send')
    // Фокус сохраняется, так как input не размонтируется
    nextTick(() => {
      // Небольшая задержка для гарантии, что значение очистилось
      setTimeout(() => {
        inputRef.value?.focus()
      }, 50)
    })
  }
}

// Инициализация фокуса
onMounted(() => {
  // Фокус при монтировании с задержкой
  setTimeout(() => {
    inputRef.value?.focus()
  }, 300)
})

// Метод для внешнего управления фокусом (если понадобится)
const focusInput = () => {
  inputRef.value?.focus()
}

// Экспортируем метод для возможного использования из родителя
defineExpose({ focusInput })
</script>

<style scoped>
/* Стили остаются без изменений */
.chat-input-section {
  background: var(--bg-card);
  border-top: 1px solid var(--border-color);
  padding: 0;
  flex-shrink: 0;
  width: 100%;
  animation: slideUp 0.4s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.input-container-fixed {
  padding: 16px 30px; 
  background: var(--bg-card);
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 14px;
  background: var(--bg-primary);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  padding: 10px 10px 10px 16px; 
  transition: all var(--transition-slow) cubic-bezier(0.4, 0, 0.2, 1);
}

.input-wrapper:focus-within {
  border-color: var(--srb-blue);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  transform: translateY(-1px);
}

.input-icon {
  font-size: 20px;
  color: var(--text-tertiary);
  transition: transform var(--transition-speed) ease;
}

.input-wrapper:focus-within .input-icon {
  transform: scale(1.1) rotate(5deg);
}

.chat-input {
  flex: 1;
  padding: 12px 0; 
  border: none;
  font-size: 15px;
  background: transparent;
  color: var(--text-primary);
  outline: none;
  transition: all var(--transition-fast) ease;
}

.chat-input:focus {
  transform: translateX(2px);
}

/* Делаем поле ввода активным по умолчанию */
.chat-input:focus-visible {
  outline: none;
}

.send-btn {
  padding: 12px 20px; 
  border-radius: 10px;
  background: var(--srb-blue);
  border: none;
  color: white;
  font-size: 13px; 
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  position: relative;
  overflow: hidden;
}

.send-btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%);
  transform-origin: 50% 50%;
}

.send-btn:focus:not(:active)::after {
  animation: ripple 1s ease-out;
}

@keyframes ripple {
  0% {
    transform: scale(0, 0);
    opacity: 0.5;
  }
  100% {
    transform: scale(20, 20);
    opacity: 0;
  }
}

.send-btn:hover:not(:disabled) {
  background: var(--srb-dark-blue);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
}

.send-btn:active:not(:disabled) {
  transform: translateY(0) scale(0.98);
  transition: all var(--transition-fast) ease;
}

.send-btn.loading {
  background: #6b7280;
  animation: pulseLoading 1.5s infinite ease-in-out;
}

@keyframes pulseLoading {
  0%, 100% { 
    opacity: 1;
    transform: translateY(-2px);
  }
  50% { 
    opacity: 0.8;
    transform: translateY(-1px);
  }
}

.send-btn-loading {
  font-size: 16px; 
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.send-btn-icon {
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all var(--transition-fast) ease;
}

.send-btn:hover .send-btn-icon {
  transform: translateX(2px);
}

.input-hint {
  font-size: 11px; 
  color: var(--text-tertiary);
  margin-top: 8px;
  text-align: center;
  opacity: 0.8;
  transition: opacity var(--transition-fast) ease;
}

.input-container-fixed:hover .input-hint {
  opacity: 1;
}

/* Адаптивность для ChatInput */
@media (max-width: 1024px) {
  .input-container-fixed {
    padding-left: 20px;
    padding-right: 20px;
  }
}

@media (max-width: 768px) {
  .input-container-fixed {
    padding: 12px 16px;
  }
}

@media (max-width: 480px) {
  .input-container-fixed {
    padding: 10px 14px;
  }
  
  .input-wrapper {
    padding: 6px 6px 6px 12px;
  }
}
</style>