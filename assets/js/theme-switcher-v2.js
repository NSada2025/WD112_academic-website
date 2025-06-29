/**
 * Enhanced Theme Switcher v2.0
 * Improved UI/UX with integrated controls and better accessibility
 */

(function() {
  'use strict';

  // Configuration
  const STORAGE_KEYS = {
    theme: 'site-theme-mode',
    color: 'site-color-palette',
    fontSize: 'site-font-size',
    layoutWidth: 'site-layout-width',
    animations: 'site-animations',
    autoTheme: 'site-auto-theme'
  };

  // Extended color palettes with descriptions
  const COLOR_PALETTES = [
    { 
      name: 'blue', 
      label: 'Ocean Blue', 
      color: '#3b82f6',
      description: 'Professional and trustworthy'
    },
    { 
      name: 'zinc', 
      label: 'Neutral Gray', 
      color: '#71717a',
      description: 'Clean and minimalist'
    },
    { 
      name: 'rose', 
      label: 'Warm Rose', 
      color: '#f43f5e',
      description: 'Friendly and approachable'
    },
    { 
      name: 'green', 
      label: 'Forest Green', 
      color: '#22c55e',
      description: 'Natural and calming'
    },
    { 
      name: 'violet', 
      label: 'Royal Purple', 
      color: '#8b5cf6',
      description: 'Creative and innovative'
    },
    { 
      name: 'orange', 
      label: 'Sunset Orange', 
      color: '#f97316',
      description: 'Energetic and bold'
    },
    { 
      name: 'teal', 
      label: 'Ocean Teal', 
      color: '#14b8a6',
      description: 'Modern and refreshing'
    },
    { 
      name: 'highcontrast', 
      label: 'High Contrast', 
      color: '#000000',
      description: 'Maximum readability'
    },
    { 
      name: 'sepia', 
      label: 'Sepia Tone', 
      color: '#8B4513',
      description: 'Warm reading experience'
    }
  ];

  // State management
  const state = {
    theme: 'light',
    color: 'blue',
    fontSize: 'medium',
    layoutWidth: 'standard',
    animations: true,
    autoTheme: false,
    panelOpen: false,
    previewActive: false
  };

  // Initialize theme system
  function init() {
    loadStoredPreferences();
    createThemeUI();
    applyAllSettings();
    setupEventListeners();
    setupAutoTheme();
    addCustomStyles();
  }

  // Load preferences from localStorage
  function loadStoredPreferences() {
    Object.keys(STORAGE_KEYS).forEach(key => {
      const stored = localStorage.getItem(STORAGE_KEYS[key]);
      if (stored !== null) {
        if (key === 'animations' || key === 'autoTheme') {
          state[key] = stored === 'true';
        } else {
          state[key] = stored;
        }
      }
    });
  }

  // Create enhanced theme UI
  function createThemeUI() {
    const uiHTML = `
      <div class="theme-panel-wrapper">
        <!-- Integrated theme button -->
        <button class="theme-panel-toggle" aria-label="Open theme settings" aria-expanded="false">
          <div class="theme-toggle-content">
            <svg class="theme-icon sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg class="theme-icon moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
            <span class="theme-label">Theme</span>
          </div>
        </button>
        
        <!-- Enhanced theme panel -->
        <div class="theme-panel" aria-hidden="true">
          <div class="theme-panel-header">
            <h3>Customize Your Experience</h3>
            <button class="theme-panel-close" aria-label="Close theme settings">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div class="theme-panel-content">
            <!-- Quick theme toggle -->
            <div class="theme-section">
              <div class="theme-section-header">
                <h4>Appearance</h4>
                <div class="theme-quick-toggle">
                  <button class="theme-mode-btn light ${state.theme === 'light' ? 'active' : ''}" data-theme="light" aria-label="Light mode">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="5"></circle>
                      <line x1="12" y1="1" x2="12" y2="3"></line>
                      <line x1="12" y1="21" x2="12" y2="23"></line>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    </svg>
                  </button>
                  <button class="theme-mode-btn dark ${state.theme === 'dark' ? 'active' : ''}" data-theme="dark" aria-label="Dark mode">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                  </button>
                  <button class="theme-mode-btn auto ${state.autoTheme ? 'active' : ''}" data-theme="auto" aria-label="Auto mode">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 2v20"></path>
                      <path d="M12 2a10 10 0 0 1 0 20"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Color palette grid with preview -->
            <div class="theme-section">
              <h4>Color Theme</h4>
              <div class="color-grid">
                ${COLOR_PALETTES.map(palette => `
                  <button class="color-tile ${palette.name === state.color ? 'active' : ''}" 
                          data-color="${palette.name}" 
                          aria-label="${palette.label} theme"
                          title="${palette.description}">
                    <span class="color-preview" style="background-color: ${palette.color}"></span>
                    <span class="color-label">${palette.label}</span>
                  </button>
                `).join('')}
              </div>
            </div>
            
            <!-- Typography settings -->
            <div class="theme-section">
              <h4>Typography</h4>
              <div class="setting-group">
                <label for="fontSize">Font Size</label>
                <div class="segmented-control">
                  <button class="segment ${state.fontSize === 'small' ? 'active' : ''}" data-fontsize="small">Small</button>
                  <button class="segment ${state.fontSize === 'medium' ? 'active' : ''}" data-fontsize="medium">Medium</button>
                  <button class="segment ${state.fontSize === 'large' ? 'active' : ''}" data-fontsize="large">Large</button>
                </div>
              </div>
            </div>
            
            <!-- Layout settings -->
            <div class="theme-section">
              <h4>Layout</h4>
              <div class="setting-group">
                <label for="layoutWidth">Content Width</label>
                <div class="segmented-control">
                  <button class="segment ${state.layoutWidth === 'compact' ? 'active' : ''}" data-layout="compact">Compact</button>
                  <button class="segment ${state.layoutWidth === 'standard' ? 'active' : ''}" data-layout="standard">Standard</button>
                  <button class="segment ${state.layoutWidth === 'wide' ? 'active' : ''}" data-layout="wide">Wide</button>
                </div>
              </div>
            </div>
            
            <!-- Accessibility settings -->
            <div class="theme-section">
              <h4>Accessibility</h4>
              <div class="setting-group">
                <label class="switch-label">
                  <input type="checkbox" id="animationsToggle" ${state.animations ? 'checked' : ''}>
                  <span class="switch"></span>
                  <span>Enable animations</span>
                </label>
              </div>
            </div>
            
            <!-- Preview and reset -->
            <div class="theme-actions">
              <button class="btn-preview" id="previewBtn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                Preview Changes
              </button>
              <button class="btn-reset" id="resetBtn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                  <path d="M3 3v5h5"></path>
                </svg>
                Reset to Default
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', uiHTML);
  }

  // Apply all settings
  function applyAllSettings() {
    // Theme mode
    document.documentElement.setAttribute('data-theme', state.theme);
    
    // Color palette
    document.documentElement.setAttribute('data-color', state.color);
    
    // Font size
    document.documentElement.setAttribute('data-font-size', state.fontSize);
    
    // Layout width
    document.documentElement.setAttribute('data-layout-width', state.layoutWidth);
    
    // Animations
    document.documentElement.setAttribute('data-animations', state.animations ? 'enabled' : 'disabled');
    
    // Update UI states
    updateUIStates();
    
    // Save preferences
    savePreferences();
  }

  // Save preferences to localStorage
  function savePreferences() {
    Object.keys(STORAGE_KEYS).forEach(key => {
      localStorage.setItem(STORAGE_KEYS[key], state[key].toString());
    });
  }

  // Update UI to reflect current state
  function updateUIStates() {
    // Update theme toggle icon
    const toggle = document.querySelector('.theme-panel-toggle');
    if (toggle) {
      toggle.classList.toggle('dark', state.theme === 'dark');
    }

    // Update active states
    document.querySelectorAll('[data-theme]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === state.theme || 
                                    (btn.dataset.theme === 'auto' && state.autoTheme));
    });

    document.querySelectorAll('[data-color]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.color === state.color);
    });

    document.querySelectorAll('[data-fontsize]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.fontsize === state.fontSize);
    });

    document.querySelectorAll('[data-layout]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.layout === state.layoutWidth);
    });
  }

  // Setup event listeners
  function setupEventListeners() {
    // Panel toggle
    const panelToggle = document.querySelector('.theme-panel-toggle');
    const panel = document.querySelector('.theme-panel');
    const closeBtn = document.querySelector('.theme-panel-close');

    if (panelToggle && panel) {
      panelToggle.addEventListener('click', togglePanel);
      closeBtn.addEventListener('click', closePanel);
    }

    // Theme mode buttons
    document.querySelectorAll('.theme-mode-btn').forEach(btn => {
      btn.addEventListener('click', handleThemeModeClick);
    });

    // Color tiles
    document.querySelectorAll('.color-tile').forEach(tile => {
      tile.addEventListener('click', handleColorClick);
      tile.addEventListener('mouseenter', handleColorHover);
      tile.addEventListener('mouseleave', clearPreview);
    });

    // Font size buttons
    document.querySelectorAll('[data-fontsize]').forEach(btn => {
      btn.addEventListener('click', handleFontSizeClick);
    });

    // Layout buttons
    document.querySelectorAll('[data-layout]').forEach(btn => {
      btn.addEventListener('click', handleLayoutClick);
    });

    // Animations toggle
    const animToggle = document.getElementById('animationsToggle');
    if (animToggle) {
      animToggle.addEventListener('change', handleAnimationsToggle);
    }

    // Preview and reset buttons
    const previewBtn = document.getElementById('previewBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    if (previewBtn) previewBtn.addEventListener('click', togglePreview);
    if (resetBtn) resetBtn.addEventListener('click', resetToDefaults);

    // Close panel on outside click
    document.addEventListener('click', handleOutsideClick);

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);
  }

  // Panel management
  function togglePanel() {
    state.panelOpen = !state.panelOpen;
    const panel = document.querySelector('.theme-panel');
    const toggle = document.querySelector('.theme-panel-toggle');
    
    if (panel && toggle) {
      panel.classList.toggle('open', state.panelOpen);
      panel.setAttribute('aria-hidden', !state.panelOpen);
      toggle.setAttribute('aria-expanded', state.panelOpen);
      
      if (state.panelOpen) {
        // Focus first interactive element
        const firstButton = panel.querySelector('button');
        if (firstButton) firstButton.focus();
      }
    }
  }

  function closePanel() {
    state.panelOpen = false;
    const panel = document.querySelector('.theme-panel');
    const toggle = document.querySelector('.theme-panel-toggle');
    
    if (panel && toggle) {
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  }

  // Event handlers
  function handleThemeModeClick(e) {
    const mode = e.currentTarget.dataset.theme;
    
    if (mode === 'auto') {
      state.autoTheme = !state.autoTheme;
      if (state.autoTheme) {
        updateAutoTheme();
      }
    } else {
      state.autoTheme = false;
      state.theme = mode;
    }
    
    applyAllSettings();
    announceChange(`${mode} mode activated`);
  }

  function handleColorClick(e) {
    const color = e.currentTarget.dataset.color;
    state.color = color;
    applyAllSettings();
    
    const palette = COLOR_PALETTES.find(p => p.name === color);
    announceChange(`${palette.label} color theme selected`);
  }

  function handleColorHover(e) {
    if (!state.previewActive) {
      const color = e.currentTarget.dataset.color;
      document.documentElement.setAttribute('data-color-preview', color);
    }
  }

  function clearPreview() {
    if (!state.previewActive) {
      document.documentElement.removeAttribute('data-color-preview');
    }
  }

  function handleFontSizeClick(e) {
    state.fontSize = e.currentTarget.dataset.fontsize;
    applyAllSettings();
    announceChange(`Font size changed to ${state.fontSize}`);
  }

  function handleLayoutClick(e) {
    state.layoutWidth = e.currentTarget.dataset.layout;
    applyAllSettings();
    announceChange(`Layout width changed to ${state.layoutWidth}`);
  }

  function handleAnimationsToggle(e) {
    state.animations = e.target.checked;
    applyAllSettings();
    announceChange(`Animations ${state.animations ? 'enabled' : 'disabled'}`);
  }

  function handleOutsideClick(e) {
    const wrapper = document.querySelector('.theme-panel-wrapper');
    if (wrapper && !wrapper.contains(e.target) && state.panelOpen) {
      closePanel();
    }
  }

  function handleKeyboard(e) {
    if (e.key === 'Escape' && state.panelOpen) {
      closePanel();
    }
  }

  // Preview functionality
  function togglePreview() {
    state.previewActive = !state.previewActive;
    const btn = document.getElementById('previewBtn');
    
    if (state.previewActive) {
      // Store current state
      btn.dataset.prevState = JSON.stringify(state);
      btn.textContent = 'Apply Changes';
      btn.classList.add('active');
    } else {
      // Apply previewed changes
      btn.textContent = 'Preview Changes';
      btn.classList.remove('active');
    }
  }

  // Reset to defaults
  function resetToDefaults() {
    if (confirm('Reset all theme settings to defaults?')) {
      state.theme = 'light';
      state.color = 'blue';
      state.fontSize = 'medium';
      state.layoutWidth = 'standard';
      state.animations = true;
      state.autoTheme = false;
      
      applyAllSettings();
      announceChange('Theme settings reset to defaults');
    }
  }

  // Auto theme based on time
  function setupAutoTheme() {
    if (state.autoTheme) {
      updateAutoTheme();
      // Check every hour
      setInterval(updateAutoTheme, 3600000);
    }
  }

  function updateAutoTheme() {
    const hour = new Date().getHours();
    const isDaytime = hour >= 6 && hour < 18;
    state.theme = isDaytime ? 'light' : 'dark';
    applyAllSettings();
  }

  // Accessibility announcements
  function announceChange(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
  }

  // Add custom styles
  function addCustomStyles() {
    const styles = document.createElement('style');
    styles.id = 'theme-switcher-v2-styles';
    styles.textContent = `
      /* Import existing theme styles */
      @import url('theme-switcher-v2-styles.css');
    `;
    document.head.appendChild(styles);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();