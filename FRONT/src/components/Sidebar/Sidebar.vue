<template>
  <aside class="quick-access-sidebar">
    <div class="sidebar-header">
      <h3>⚡ Быстрый доступ</h3>
      <p class="sidebar-subtitle">Нажмите для быстрого вопроса</p>
    </div>
    
    <div class="quick-actions">
      <button 
        v-for="action in quickActions"
        :key="action.id"
        @click="$emit('quickAction', action)"
        class="quick-action-btn"
        :title="action.title"
        :style="{ '--action-color': action.color }"
      >
        <span class="action-icon">{{ action.icon }}</span>
        <span class="action-text">{{ action.title }}</span>
      </button>
    </div>
    
    <!-- Статистика использования -->
    <div class="usage-stats-card">
      <div class="stats-icon">📊</div>
      <div class="stats-content">
        <div class="stats-title">Статистика</div>
        <div class="stats-details">
          <div class="stat-item">
            <span class="stat-label">Вопросов:</span>
            <span class="stat-value">{{ usageStats.questions }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Ответов:</span>
            <span class="stat-value">{{ usageStats.answers }}</span>
          </div>
        </div>
      </div>
      <button class="refresh-stats-btn" @click="$emit('refreshStats')" title="Обновить статистику">
        🔄
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { QuickAction, UsageStats } from '@/types'

defineProps<{
  quickActions: QuickAction[]
  usageStats: UsageStats
}>()

defineEmits<{
  quickAction: [action: QuickAction]
  refreshStats: []
}>()
</script>

<style scoped>
.quick-access-sidebar {
  width: var(--sidebar-width);
  background: var(--bg-card);
  border-radius: 14px;
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 0 4px 16px var(--shadow-color);
  flex-shrink: 0;
  height: 100%;
  max-height: calc(100% - 32px);
  overflow-y: auto;
  margin: 0;
  box-sizing: border-box;
}

.sidebar-header {
  margin-bottom: 20px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border-color);
}

.sidebar-header h3 {
  font-size: 17px; 
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 6px 0; 
  display: flex;
  align-items: center;
  gap: 8px;
}

.sidebar-subtitle {
  font-size: 13px;
  color: var(--text-tertiary);
  margin: 0;
}

/* Быстрые действия */
.quick-actions {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-bottom: 20px;
}

.quick-action-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px; 
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;
  background: linear-gradient(135deg, var(--action-color) 0%, color-mix(in srgb, var(--action-color) 80%, #000) 100%);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
  animation: fadeInUp 0.4s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.quick-action-btn:hover {
  transform: translateX(4px) scale(1.02);
  box-shadow: 0 6px 18px rgba(59, 130, 246, 0.25);
  filter: brightness(1.1);
}

/* Цвета для кнопок */
.quick-action-btn:nth-child(1) { --action-color: #3b82f6; animation-delay: 0.1s; }
.quick-action-btn:nth-child(2) { --action-color: #1e40af; animation-delay: 0.2s; }
.quick-action-btn:nth-child(3) { --action-color: #1e3a8a; animation-delay: 0.3s; }
.quick-action-btn:nth-child(4) { --action-color: #0ea5e9; animation-delay: 0.4s; }
.quick-action-btn:nth-child(5) { --action-color: #06b6d4; animation-delay: 0.5s; }

/* Карточка статистики использования */
.usage-stats-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px; 
  background: var(--bg-tertiary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  transition: all var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: auto;
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.usage-stats-card:hover {
  background: var(--bg-secondary);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px var(--shadow-color);
}

.stats-icon {
  font-size: 24px; 
  width: 44px; 
  height: 44px; 
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border-radius: 10px;
  transition: transform var(--transition-slow) ease;
}

.usage-stats-card:hover .stats-icon {
  transform: rotate(10deg);
}

.stats-content {
  flex: 1;
  min-width: 0;
}

.stats-title {
  font-size: 15px; 
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px; 
}

.stats-details {
  display: flex;
  flex-direction: column;
  gap: 6px; 
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  font-size: 12px;
  color: var(--text-tertiary);
}

.stat-value {
  font-size: 13px; 
  font-weight: 600;
  color: var(--text-primary);
  background: var(--bg-card);
  padding: 3px 8px; 
  border-radius: 6px;
  border: 1px solid var(--border-color);
}

.refresh-stats-btn {
  width: 36px; 
  height: 36px; 
  border-radius: 8px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  font-size: 18px; 
  cursor: pointer;
  transition: all var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.refresh-stats-btn:hover {
  background: var(--bg-secondary);
  transform: rotate(90deg) scale(1.1);
}

/* Адаптивность для Sidebar */
@media (max-width: 768px) {
  .quick-access-sidebar {
    display: none;
  }
}
</style>