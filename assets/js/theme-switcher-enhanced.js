/**
 * Enhanced Theme Switcher for WD112 Academic Website
 * Includes seasonal, time-based, and accessibility themes
 */

(function() {
  'use strict';

  // Configuration
  const STORAGE_KEYS = {
    theme: 'site-theme-mode',
    color: 'site-color-palette',
    autoTheme: 'site-auto-theme',
    animations: 'site-animations'
  };

  const COLOR_PALETTES = [
    // Standard themes
    { name: 'blue', label: 'Ocean Blue', color: '#3b82f6', category: 'standard' },
    { name: 'zinc', label: 'Neutral Gray', color: '#71717a', category: 'standard' },
    { name: 'rose', label: 'Warm Rose', color: '#f43f5e', category: 'standard' },
    { name: 'green', label: 'Forest Green', color: '#22c55e', category: 'standard' },
    { name: 'violet', label: 'Royal Purple', color: '#8b5cf6', category: 'standard' },
    { name: 'orange', label: 'Sunset Orange', color: '#f97316', category: 'standard' },
    { name: 'teal', label: 'Ocean Teal', color: '#14b8a6', category: 'standard' },
    
    // Seasonal themes
    { name: 'spring', label: 'Spring Bloom', color: '#22c55e', category: 'seasonal', season: 'spring' },
    { name: 'summer', label: 'Summer Sun', color: '#f97316', category: 'seasonal', season: 'summer' },
    { name: 'autumn', label: 'Autumn Leaves', color: '#ef4444', category: 'seasonal', season: 'autumn' },
    { name: 'winter', label: 'Winter Frost', color: '#64748b', category: 'seasonal', season: 'winter' },
    
    // Time-based themes
    { name: 'dawn', label: 'Dawn Glow', color: '#d97706', category: 'time', time: 'dawn' },
    { name: 'dusk', label: 'Dusk Purple', color: '#7c3aed', category: 'time', time: 'dusk' },
    { name: 'midnight', label: 'Midnight Blue', color: '#2563eb', category: 'time', time: 'midnight' },
    
    // Academic themes
    { name: 'academic', label: 'Academic Classic', color: '#d97706', category: 'academic' },
    { name: 'nature', label: 'Nature Study', color: '#059669', category: 'academic' },
    { name: 'ocean', label: 'Ocean Research', color: '#0284c7', category: 'academic' },
    
    // Accessibility themes
    { name: 'high-contrast', label: 'High Contrast', color: '#000000', category: 'accessibility' },
    { name: 'sepia', label: 'Sepia Tone', color: '#997b17', category: 'accessibility' }
  ];

  // State
  let currentTheme = 'light';
  let currentColor = 'blue';
  let autoThemeEnabled = false;
  let animationsEnabled = true;
  let panelOpen = false;

  // Initialize theme system
  function init() {
    loadStoredPreferences();
    createThemeControls();
    applyTheme();
    setupEventListeners();
    
    if (autoThemeEnabled) {
      startAutoTheme();
    }
  }

  // Load preferences from localStorage
  function loadStoredPreferences() {
    const storedTheme = localStorage.getItem(STORAGE_KEYS.theme);
    const storedColor = localStorage.getItem(STORAGE_KEYS.color);
    const storedAutoTheme = localStorage.getItem(STORAGE_KEYS.autoTheme);
    const storedAnimations = localStorage.getItem(STORAGE_KEYS.animations);

    if (storedTheme && ['light', 'dark'].includes(storedTheme)) {
      currentTheme = storedTheme;
    }

    if (storedColor && COLOR_PALETTES.some(p => p.name === storedColor)) {
      currentColor = storedColor;
    }

    autoThemeEnabled = storedAutoTheme === 'true';
    animationsEnabled = storedAnimations !== 'false';
  }

  // Create enhanced theme control UI
  function createThemeControls() {
    const controlsHTML = `
      <div class="theme-controls">
        <button class="theme-panel-toggle" aria-label="Open theme settings" title="Theme Settings">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"></path>
          </svg>
        </button>
        
        <div class="theme-panel" aria-hidden="true">
          <div class="theme-panel-header">
            <h3>Theme Settings</h3>
            <button class="theme-panel-close" aria-label="Close theme settings">×</button>
          </div>
          
          <div class="theme-panel-content">
            <!-- Appearance Section -->
            <div class="theme-section">
              <h4>Appearance</h4>
              <div class="theme-mode-toggle">
                <button class="mode-btn ${currentTheme === 'light' ? 'active' : ''}" data-mode="light">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
                  Light
                </button>
                <button class="mode-btn ${currentTheme === 'dark' ? 'active' : ''}" data-mode="dark">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                  Dark
                </button>
              </div>
            </div>
            
            <!-- Color Themes Section -->
            <div class="theme-section">
              <h4>Color Themes</h4>
              ${generateColorThemeHTML()}
            </div>
            
            <!-- Options Section -->
            <div class="theme-section">
              <h4>Options</h4>
              <label class="theme-option">
                <input type="checkbox" ${autoThemeEnabled ? 'checked' : ''} data-option="auto-theme">
                <span>Smart Auto-Theming</span>
                <small>Automatically switch themes based on time and season</small>
              </label>
              <label class="theme-option">
                <input type="checkbox" ${animationsEnabled ? 'checked' : ''} data-option="animations">
                <span>Animations</span>
                <small>Enable theme transition animations</small>
              </label>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', controlsHTML);
  }

  // Generate color theme HTML by category
  function generateColorThemeHTML() {
    const categories = {
      'Standard': COLOR_PALETTES.filter(p => p.category === 'standard'),
      'Seasonal': COLOR_PALETTES.filter(p => p.category === 'seasonal'),
      'Time-Based': COLOR_PALETTES.filter(p => p.category === 'time'),
      'Academic': COLOR_PALETTES.filter(p => p.category === 'academic'),
      'Accessibility': COLOR_PALETTES.filter(p => p.category === 'accessibility')
    };

    return Object.entries(categories).map(([categoryName, palettes]) => `
      <div class="color-category">
        <h5>${categoryName}</h5>
        <div class="color-grid">
          ${palettes.map(palette => `
            <button class="color-option ${palette.name === currentColor ? 'active' : ''}" 
                    data-color="${palette.name}" 
                    aria-label="Select ${palette.label} theme"
                    title="${palette.label}">
              <span class="color-swatch" style="background-color: ${palette.color}"></span>
              <span class="color-name">${palette.label}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  // Apply current theme and color
  function applyTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.documentElement.setAttribute('data-color', currentColor);
    
    if (!animationsEnabled) {
      document.documentElement.setAttribute('data-animations', 'disabled');
    } else {
      document.documentElement.removeAttribute('data-animations');
    }
    
    updateControlStates();
    savePreferences();
    
    // Add seasonal decorations if applicable
    addSeasonalDecorations();
  }

  // Update control visual states
  function updateControlStates() {
    // Update mode buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === currentTheme);
    });

    // Update color options
    document.querySelectorAll('.color-option').forEach(option => {
      option.classList.toggle('active', option.dataset.color === currentColor);
    });

    // Update checkboxes
    const autoThemeCheckbox = document.querySelector('[data-option="auto-theme"]');
    const animationsCheckbox = document.querySelector('[data-option="animations"]');
    
    if (autoThemeCheckbox) autoThemeCheckbox.checked = autoThemeEnabled;
    if (animationsCheckbox) animationsCheckbox.checked = animationsEnabled;
  }

  // Setup event listeners
  function setupEventListeners() {
    // Panel toggle
    const panelToggle = document.querySelector('.theme-panel-toggle');
    if (panelToggle) {
      panelToggle.addEventListener('click', togglePanel);
    }

    // Panel close
    const panelClose = document.querySelector('.theme-panel-close');
    if (panelClose) {
      panelClose.addEventListener('click', closePanel);
    }

    // Mode buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', () => selectMode(btn.dataset.mode));
    });

    // Color options
    document.querySelectorAll('.color-option').forEach(option => {
      option.addEventListener('click', () => selectColor(option.dataset.color));
    });

    // Option checkboxes
    document.querySelectorAll('[data-option]').forEach(checkbox => {
      checkbox.addEventListener('change', handleOptionChange);
    });

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
      const controls = document.querySelector('.theme-controls');
      if (!controls.contains(e.target) && panelOpen) {
        closePanel();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);
  }

  // Toggle theme panel
  function togglePanel() {
    panelOpen ? closePanel() : openPanel();
  }

  // Open theme panel
  function openPanel() {
    const panel = document.querySelector('.theme-panel');
    const toggle = document.querySelector('.theme-panel-toggle');
    
    if (panel && toggle) {
      panel.classList.add('open');
      panel.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      panelOpen = true;
    }
  }

  // Close theme panel
  function closePanel() {
    const panel = document.querySelector('.theme-panel');
    const toggle = document.querySelector('.theme-panel-toggle');
    
    if (panel && toggle) {
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      panelOpen = false;
    }
  }

  // Select theme mode
  function selectMode(mode) {
    if (['light', 'dark'].includes(mode)) {
      currentTheme = mode;
      applyTheme();
      announceChange(`${mode} mode activated`);
    }
  }

  // Select color palette
  function selectColor(colorName) {
    if (COLOR_PALETTES.some(p => p.name === colorName)) {
      currentColor = colorName;
      applyTheme();
      
      const palette = COLOR_PALETTES.find(p => p.name === colorName);
      announceChange(`${palette.label} theme selected`);
    }
  }

  // Handle option changes
  function handleOptionChange(e) {
    const option = e.target.dataset.option;
    const checked = e.target.checked;

    switch (option) {
      case 'auto-theme':
        autoThemeEnabled = checked;
        if (checked) {
          startAutoTheme();
        } else {
          stopAutoTheme();
        }
        break;
      
      case 'animations':
        animationsEnabled = checked;
        break;
    }

    applyTheme();
  }

  // Start auto-theming
  function startAutoTheme() {
    applyAutoTheme();
    // Check every minute for time-based changes
    setInterval(applyAutoTheme, 60000);
  }

  // Stop auto-theming
  function stopAutoTheme() {
    // Clear intervals if needed (simplified for this implementation)
  }

  // Apply automatic theme based on time and season
  function applyAutoTheme() {
    if (!autoThemeEnabled) return;

    const now = new Date();
    const hour = now.getHours();
    const month = now.getMonth() + 1; // 0-indexed

    // Time-based theming
    let newColor = currentColor;
    if (hour >= 5 && hour < 8) {
      newColor = 'dawn';
    } else if (hour >= 18 && hour < 21) {
      newColor = 'dusk';
    } else if (hour >= 21 || hour < 5) {
      newColor = 'midnight';
      currentTheme = 'dark'; // Auto dark mode for midnight
    }

    // Seasonal theming (overrides time-based if not in time ranges)
    if (hour >= 8 && hour < 18) {
      if (month >= 3 && month <= 5) {
        newColor = 'spring';
      } else if (month >= 6 && month <= 8) {
        newColor = 'summer';
      } else if (month >= 9 && month <= 11) {
        newColor = 'autumn';
      } else {
        newColor = 'winter';
      }
    }

    if (newColor !== currentColor) {
      currentColor = newColor;
      applyTheme();
    }
  }

  // Add seasonal decorations
  function addSeasonalDecorations() {
    // Add seasonal decoration class to appropriate elements
    const seasonalElements = document.querySelectorAll('.page__hero, .archive__item, .page__content h2');
    seasonalElements.forEach(el => {
      el.classList.add('seasonal-decoration');
    });
  }

  // Handle keyboard navigation
  function handleKeyboard(e) {
    if (panelOpen && e.key === 'Escape') {
      closePanel();
      document.querySelector('.theme-panel-toggle').focus();
    }
  }

  // Save preferences
  function savePreferences() {
    localStorage.setItem(STORAGE_KEYS.theme, currentTheme);
    localStorage.setItem(STORAGE_KEYS.color, currentColor);
    localStorage.setItem(STORAGE_KEYS.autoTheme, autoThemeEnabled.toString());
    localStorage.setItem(STORAGE_KEYS.animations, animationsEnabled.toString());
  }

  // Announce changes for accessibility
  function announceChange(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
  }

  // Add enhanced styles
  const enhancedStyles = `
    <style id="theme-switcher-enhanced-styles">
      /* Enhanced Theme Panel Styles */
      .theme-controls {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        z-index: 9999;
      }

      .theme-panel-toggle {
        background: var(--card-bg);
        border: 2px solid var(--border-color);
        border-radius: 50%;
        width: 56px;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        color: var(--text-color);
      }

      .theme-panel-toggle:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
      }

      .theme-panel {
        position: absolute;
        bottom: 70px;
        right: 0;
        width: 400px;
        max-width: 90vw;
        background: var(--card-bg);
        border: 2px solid var(--border-color);
        border-radius: 16px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 1000;
      }

      .theme-panel.open {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .theme-panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        border-bottom: 1px solid var(--border-color);
      }

      .theme-panel-header h3 {
        margin: 0;
        font-size: 1.25rem;
        color: var(--text-color);
      }

      .theme-panel-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--text-light);
        padding: 0.25rem;
        border-radius: 4px;
        transition: all 0.2s ease;
      }

      .theme-panel-close:hover {
        background: var(--border-color);
        color: var(--text-color);
      }

      .theme-panel-content {
        padding: 1.5rem;
        max-height: 60vh;
        overflow-y: auto;
      }

      .theme-section {
        margin-bottom: 2rem;
      }

      .theme-section h4 {
        margin: 0 0 1rem 0;
        font-size: 1rem;
        font-weight: 600;
        color: var(--text-color);
      }

      .theme-mode-toggle {
        display: flex;
        gap: 0.5rem;
      }

      .mode-btn {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.75rem;
        background: var(--bg-color);
        border: 2px solid var(--border-color);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        color: var(--text-color);
        font-size: 0.875rem;
      }

      .mode-btn:hover {
        border-color: var(--primary-400);
      }

      .mode-btn.active {
        background: var(--primary-100);
        border-color: var(--primary-500);
        color: var(--primary-700);
      }

      .color-category {
        margin-bottom: 1.5rem;
      }

      .color-category h5 {
        margin: 0 0 0.75rem 0;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--text-light);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .color-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 0.75rem;
      }

      .color-option {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem;
        background: var(--bg-color);
        border: 2px solid var(--border-color);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        text-align: center;
      }

      .color-option:hover {
        border-color: var(--primary-400);
        transform: translateY(-2px);
      }

      .color-option.active {
        border-color: var(--primary-500);
        background: var(--primary-50);
      }

      .color-swatch {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 2px solid var(--border-color);
      }

      .color-name {
        font-size: 0.75rem;
        color: var(--text-color);
        font-weight: 500;
      }

      .theme-option {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        margin-bottom: 1rem;
        cursor: pointer;
      }

      .theme-option input {
        margin-right: 0.5rem;
      }

      .theme-option span {
        font-weight: 500;
        color: var(--text-color);
      }

      .theme-option small {
        color: var(--text-light);
        font-size: 0.75rem;
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }

      /* Mobile adjustments */
      @media (max-width: 768px) {
        .theme-controls {
          bottom: 1rem;
          right: 1rem;
        }

        .theme-panel {
          width: 320px;
          bottom: 70px;
        }

        .color-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      /* Animation disable support */
      [data-animations="disabled"] * {
        animation-duration: 0s !important;
        transition-duration: 0s !important;
      }
    </style>
  `;

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      document.head.insertAdjacentHTML('beforeend', enhancedStyles);
      init();
    });
  } else {
    document.head.insertAdjacentHTML('beforeend', enhancedStyles);
    init();
  }
})();