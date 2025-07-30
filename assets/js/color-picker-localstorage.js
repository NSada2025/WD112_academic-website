/**
 * Color Picker with localStorage - PR#15
 * Purpose: Persist color selection across page reloads
 * Based on color-picker-active.js with localStorage integration
 */

(function() {
  'use strict';

  // Storage key
  const STORAGE_KEY = 'site-color-palette';

  // Initialize with localStorage support
  function initializeColorPicker(callback) {
    // Try to load saved color from localStorage
    const savedColor = localStorage.getItem(STORAGE_KEY);
    const defaultColor = 'blue';
    
    // Validate saved color
    const validColors = ['blue', 'zinc', 'rose', 'green', 'violet', 'orange', 'teal'];
    const colorToUse = (savedColor && validColors.includes(savedColor)) ? savedColor : defaultColor;
    
    // Set the color attribute
    document.documentElement.setAttribute('data-color', colorToUse);
    console.log('[Color Picker LS] Initialized with color:', colorToUse, savedColor ? '(from localStorage)' : '(default)');
    
    callback();
  }

  function createColorPickerWithStorage() {
    // Get current color from DOM
    const currentColor = document.documentElement.getAttribute('data-color') || 'blue';
    console.log('[Color Picker LS] Current color:', currentColor);

    // Color options (matching _variables.scss)
    const colors = [
      { name: 'blue', label: 'Blue', hex: '#3b82f6' },
      { name: 'zinc', label: 'Gray', hex: '#71717a' },
      { name: 'rose', label: 'Rose', hex: '#f43f5e' },
      { name: 'green', label: 'Green', hex: '#22c55e' },
      { name: 'violet', label: 'Violet', hex: '#8b5cf6' },
      { name: 'orange', label: 'Orange', hex: '#f97316' },
      { name: 'teal', label: 'Teal', hex: '#14b8a6' }
    ];

    // Create UI elements
    const colorPickerHTML = `
      <button class="color-picker-toggle" aria-label="Color theme picker" title="Choose color theme">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
        </svg>
      </button>
      <div class="color-picker-panel" aria-hidden="true">
        <h3 class="color-picker-header">Color Theme</h3>
        <div class="color-options">
          ${colors.map(color => `
            <button class="color-option ${color.name === currentColor ? 'active' : ''}" 
                    data-color="${color.name}"
                    aria-label="${color.label} theme"
                    title="${color.label}">
              <span class="color-swatch" style="background-color: ${color.hex}"></span>
              <span class="color-name">${color.label}</span>
            </button>
          `).join('')}
        </div>
        <p class="color-picker-note" style="margin-top: 1rem; font-size: 0.875rem; color: var(--text-light);">
          Your color choice is saved automatically
        </p>
      </div>
    `;

    // Create our own container to avoid conflicts with theme-switcher
    let colorPickerContainer = document.querySelector('.simple-color-picker');
    if (!colorPickerContainer) {
      colorPickerContainer = document.createElement('div');
      colorPickerContainer.className = 'simple-color-picker';
      colorPickerContainer.innerHTML = colorPickerHTML;
      colorPickerContainer.style.cssText = 'position: fixed; bottom: 8rem; right: 2rem; z-index: 9998;';
      document.body.appendChild(colorPickerContainer);
    }

    // Get elements
    const toggleButton = colorPickerContainer.querySelector('.color-picker-toggle');
    const panel = colorPickerContainer.querySelector('.color-picker-panel');
    
    // Toggle panel visibility
    toggleButton.addEventListener('click', () => {
      const isOpen = panel.classList.contains('open');
      panel.classList.toggle('open');
      panel.setAttribute('aria-hidden', isOpen);
      console.log('[Color Picker LS] Panel toggled:', !isOpen ? 'open' : 'closed');
    });

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.color-picker-toggle') && 
          !e.target.closest('.color-picker-panel')) {
        panel.classList.remove('open');
        panel.setAttribute('aria-hidden', 'true');
      }
    });

    // Handle color selection with localStorage
    colorPickerContainer.querySelectorAll('.color-option').forEach(option => {
      option.addEventListener('click', () => {
        const selectedColor = option.dataset.color;
        
        // Apply the color change
        document.documentElement.setAttribute('data-color', selectedColor);
        
        // Save to localStorage
        try {
          localStorage.setItem(STORAGE_KEY, selectedColor);
          console.log('[Color Picker LS] Color saved to localStorage:', selectedColor);
        } catch (e) {
          console.error('[Color Picker LS] Failed to save to localStorage:', e);
        }
        
        // Update active states
        colorPickerContainer.querySelectorAll('.color-option').forEach(opt => {
          opt.classList.toggle('active', opt.dataset.color === selectedColor);
        });
        
        // Announce change for accessibility
        announceColorChange(selectedColor);
        
        // Log success
        console.log('[Color Picker LS] Color changed and persisted:', selectedColor);
      });
    });

    console.log('[Color Picker LS] Color picker with localStorage activated successfully');
  }

  // Announce color change for screen readers
  function announceColorChange(colorName) {
    const colors = {
      'blue': 'Blue',
      'zinc': 'Gray',
      'rose': 'Rose', 
      'green': 'Green',
      'violet': 'Violet',
      'orange': 'Orange',
      'teal': 'Teal'
    };
    
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'screen-reader-text';
    announcement.textContent = `Color theme changed to ${colors[colorName] || colorName}`;
    
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
  }

  // Initialize when ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initializeColorPicker(createColorPickerWithStorage);
    });
  } else {
    initializeColorPicker(createColorPickerWithStorage);
  }
})();