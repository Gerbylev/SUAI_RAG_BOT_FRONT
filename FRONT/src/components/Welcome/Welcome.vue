<template>
  <div v-if="show" class="welcome-section">
    <div class="welcome-card">
      <div class="welcome-header">
        <div class="welcome-icon">
          <div class="welcome-logo">SRB</div>
        </div>
        <div class="welcome-text">
          <h2>Добро пожаловать в Suai Rag Bot!</h2>
          <p class="welcome-description">
            Я ваш AI-ассистент, готовый помочь с вопросами об учебе, расписании, 
            преподавателях и других аспектах студенческой жизни университета.
          </p>
        </div>
      </div>
      <div class="welcome-features">
        <span class="feature-tag">📅 Расписание</span>
        <span class="feature-tag">🏠 Общежития</span>
        <span class="feature-tag">💰 Стипендии</span> 
        <span class="feature-tag">📝 Экзамены</span>
      </div>
      <button class="close-welcome-btn" @click="$emit('close')">✕</button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
}>()

defineEmits<{
  close: []
}>()
</script>

<style scoped>
.welcome-section {
  padding: 22px 30px; 
  background: var(--bg-card);
  border-bottom: 1px solid var(--border-color);
  position: relative;
  flex-shrink: 0;
  animation: slideDown 0.5s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.welcome-card {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

.welcome-header {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 20px; 
}

.welcome-logo {
  font-size: 30px;
  font-weight: 800;
  color: white;
  background: var(--srb-blue);
  width: 60px; 
  height: 60px; 
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1px;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);
  animation: pulseLogo 2s infinite ease-in-out;
}

@keyframes pulseLogo {
  0%, 100% { 
    transform: scale(1);
    box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);
  }
  50% { 
    transform: scale(1.03);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
  }
}

.welcome-card h2 {
  margin: 0 0 12px 0;
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.3;
}

.welcome-description {
  font-size: 15px; 
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

.welcome-features {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; 
  margin-top: 16px; 
}

.feature-tag {
  font-size: 13px;
  padding: 8px 12px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-secondary);
}

.close-welcome-btn {
  position: absolute;
  top: 0;
  right: 0;
  width: 34px;
  height: 34px; 
  border-radius: 8px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  font-size: 18px;
  cursor: pointer;
  transition: all var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-welcome-btn:hover {
  background: var(--bg-secondary);
  transform: rotate(90deg) scale(1.1);
}

/* Адаптивность для Welcome */
@media (max-width: 768px) {
  .welcome-section {
    padding: 16px;
  }
  
  .welcome-card h2 {
    font-size: 22px;
  }
}

@media (max-width: 480px) {
  .welcome-section {
    padding: 14px;
  }
}
</style>