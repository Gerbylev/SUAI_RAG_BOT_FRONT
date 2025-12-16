<template>
  <footer class="assistant-footer">
    <div class="footer-content">
      <div class="footer-left">
        <div class="footer-logo">
          <div class="footer-logo-letters">SRB</div>
          <div class="footer-logo-text">Suai Rag Bot</div>
        </div>
        <span class="separator">|</span>
        <span class="footer-status">Статус: <span class="online-status">Активен</span></span>
      </div>
      <div class="footer-right">
        <span class="footer-version">RAG AI Assistant v1.0</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.assistant-footer {
  background: var(--bg-card);
  border-top: 1px solid var(--border-color);
  height: var(--footer-height);
  flex-shrink: 0;
  width: 100%;
  margin: 0;
  padding: 0;
}

.footer-content {
  width: 100%;
  height: 100%;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  box-sizing: border-box;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 13px;
  color: var(--text-tertiary);
  flex-wrap: nowrap;
  min-width: 0;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.footer-logo-letters {
  font-size: 15px; 
  font-weight: 800;
  color: white;
  background: var(--srb-blue);
  width: 34px;
  height: 34px; 
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1px;
  flex-shrink: 0;
}

.footer-logo-text {
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
  flex-shrink: 0;
  font-size: 13px;
}

.separator {
  opacity: 0.4;
  flex-shrink: 0;
  font-size: 13px;
}

.footer-status {
  font-size: 12px;
  white-space: nowrap;
  flex-shrink: 0;
}

.online-status {
  color: var(--online-color);
  font-weight: 600;
}

.footer-right {
  font-size: 12px;
  color: var(--text-tertiary);
  white-space: nowrap;
  flex-shrink: 0;
}

/* Адаптивность для Footer */
@media (max-width: 1024px) {
  .footer-content {
    padding: 0 20px;
  }
}

@media (max-width: 768px) {
  .footer-content {
    padding: 0 18px;
  }
}

@media (max-width: 480px) {
  .footer-content {
    padding: 0 15px;
    flex-direction: column;
    gap: 6px;
    text-align: center;
  }
  
  .footer-left {
    flex-direction: column;
    gap: 6px;
  }
  
  .separator {
    display: none;
  }
}
</style>