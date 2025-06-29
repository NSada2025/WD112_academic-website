/**
 * Theme Switcher - Enhanced theme switching functionality
 * Supports light/dark mode and multiple color palettes
 */

(function() {
  'use strict';

  // Configuration
  const STORAGE_KEYS = {
    theme: 'site-theme-mode',
    color: 'site-color-palette'
  };

  const COLOR_PALETTES = [
    { name: 'blue', label: 'Blue', color: '#3b82f6' },
    { name: 'zinc', label: 'Zinc', color: '#71717a' },
    { name: 'rose', label: 'Rose', color: '#f43f5e' },
    { name: 'green', label: 'Green', color: '#22c55e' },
    { name: 'violet', label: 'Violet', color: '#8b5cf6' },
    { name: 'orange', label: 'Orange', color: '#f97316' },
    { name: 'teal', label: 'Teal', color: '#14b8a6' }
  ];

  // State
  let currentTheme = 'light';
  let currentColor = 'blue';
  let colorPickerOpen = false;

  // Initialize theme system
  function init() {
    loadStoredPreferences();
    createThemeControls();
    applyTheme();
    setupEventListeners();
  }

  // Load preferences from localStorage
  function loadStoredPreferences() {
    const storedTheme = localStorage.getItem(STORAGE_KEYS.theme);
    const storedColor = localStorage.getItem(STORAGE_KEYS.color);

    if (storedTheme && ['light', 'dark'].includes(storedTheme)) {
      currentTheme = storedTheme;
    }

    if (storedColor && COLOR_PALETTES.some(p => p.name === storedColor)) {
      currentColor = storedColor;
    }
  }

  // Create theme control UI
  function createThemeControls() {
    const controlsHTML = `
      <div class="theme-controls">
        <button class="dark-mode-toggle" aria-label="Toggle dark mode" title="Toggle dark mode">
          <svg class="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
          <svg class="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>
        
        <button class="color-picker-toggle" aria-label="Choose color theme" title="Choose color theme">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2v20"></path>
            <path d="M2 12h20"></path>
            <path d="M12 2a10 10 0 0 1 0 20"></path>
          </svg>
        </button>
        
        <div class="color-picker-panel" aria-hidden="true">
          <div class="color-picker-header">Choose a color theme</div>
          <div class="color-options">
            ${COLOR_PALETTES.map(palette => `
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
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', controlsHTML);
  }

  // Apply current theme and color
  function applyTheme() {
    // Apply theme mode
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Apply color palette
    document.documentElement.setAttribute('data-color', currentColor);
    
    // Update button states
    updateButtonStates();
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEYS.theme, currentTheme);
    localStorage.setItem(STORAGE_KEYS.color, currentColor);
  }

  // Update button visual states
  function updateButtonStates() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (darkModeToggle) {
      darkModeToggle.classList.toggle('dark', currentTheme === 'dark');
    }

    // Update active color option
    document.querySelectorAll('.color-option').forEach(option => {
      option.classList.toggle('active', option.dataset.color === currentColor);
    });
  }

  // Setup event listeners
  function setupEventListeners() {
    // Dark mode toggle
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', toggleDarkMode);
    }

    // Color picker toggle
    const colorPickerToggle = document.querySelector('.color-picker-toggle');
    if (colorPickerToggle) {
      colorPickerToggle.addEventListener('click', toggleColorPicker);
    }

    // Color options
    document.querySelectorAll('.color-option').forEach(option => {
      option.addEventListener('click', () => selectColor(option.dataset.color));
    });

    // Close color picker when clicking outside
    document.addEventListener('click', (e) => {
      const controls = document.querySelector('.theme-controls');
      if (!controls.contains(e.target) && colorPickerOpen) {
        closeColorPicker();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);
  }

  // Toggle dark mode
  function toggleDarkMode() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme();
    
    // Announce change for screen readers
    announceChange(`${currentTheme} mode activated`);
  }

  // Toggle color picker
  function toggleColorPicker() {
    colorPickerOpen ? closeColorPicker() : openColorPicker();
  }

  // Open color picker
  function openColorPicker() {
    const panel = document.querySelector('.color-picker-panel');
    const toggle = document.querySelector('.color-picker-toggle');
    
    if (panel && toggle) {
      panel.classList.add('open');
      panel.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      colorPickerOpen = true;
      
      // Focus first color option for keyboard navigation
      const firstOption = panel.querySelector('.color-option');
      if (firstOption) firstOption.focus();
    }
  }

  // Close color picker
  function closeColorPicker() {
    const panel = document.querySelector('.color-picker-panel');
    const toggle = document.querySelector('.color-picker-toggle');
    
    if (panel && toggle) {
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      colorPickerOpen = false;
    }
  }

  // Select color palette
  function selectColor(colorName) {
    if (COLOR_PALETTES.some(p => p.name === colorName)) {
      currentColor = colorName;
      applyTheme();
      closeColorPicker();
      
      // Announce change
      const palette = COLOR_PALETTES.find(p => p.name === colorName);
      announceChange(`${palette.label} color theme selected`);
    }
  }

  // Handle keyboard navigation
  function handleKeyboard(e) {
    if (colorPickerOpen && e.key === 'Escape') {
      closeColorPicker();
      document.querySelector('.color-picker-toggle').focus();
    }
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

  // Add CSS for theme controls
  function addStyles() {
    const styles = `
      <style id="theme-switcher-styles">
        /* Additional color palettes */
        [data-color="orange"] {
          --primary-50: #fff7ed;
          --primary-100: #ffedd5;
          --primary-200: #fed7aa;
          --primary-300: #fdba74;
          --primary-400: #fb923c;
          --primary-500: #f97316;
          --primary-600: #ea580c;
          --primary-700: #c2410c;
          --primary-800: #9a3412;
          --primary-900: #7c2d12;
          --hero-gradient-start: var(--primary-50);
          --hero-gradient-end: var(--primary-100);
          --link-color: var(--primary-600);
          --link-hover: var(--primary-700);
        }

        [data-color="teal"] {
          --primary-50: #f0fdfa;
          --primary-100: #ccfbf1;
          --primary-200: #99f6e4;
          --primary-300: #5eead4;
          --primary-400: #2dd4bf;
          --primary-500: #14b8a6;
          --primary-600: #0d9488;
          --primary-700: #0f766e;
          --primary-800: #115e59;
          --primary-900: #134e4a;
          --hero-gradient-start: var(--primary-50);
          --hero-gradient-end: var(--primary-100);
          --link-color: var(--primary-600);
          --link-hover: var(--primary-700);
        }

        /* Screen reader only class */
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

        /* Mobile adjustments for theme controls */
        @media (max-width: 600px) {
          .theme-controls {
            bottom: 20px;
            right: 20px;
          }

          .color-picker-panel {
            right: 0;
            left: auto;
            width: 280px;
          }
        }
      </style>
    `;

    document.head.insertAdjacentHTML('beforeend', styles);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      addStyles();
      init();
    });
  } else {
    addStyles();
    init();
  }
})();