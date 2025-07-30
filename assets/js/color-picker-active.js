/**
 * Color Picker - Active Version (PR#14)
 * Purpose: Implement actual color switching without persistence
 * Safe: Only changes DOM attributes temporarily, no localStorage
 */

(function() {
  'use strict';

  // Wait for theme system to initialize
  function waitForThemeSystem(callback) {
    const checkInterval = setInterval(() => {
      if (document.documentElement.getAttribute('data-color')) {
        clearInterval(checkInterval);
        callback();
      }
    }, 100);
    
    // Timeout after 5 seconds
    setTimeout(() => clearInterval(checkInterval), 5000);
  }

  function createActiveColorPicker() {
    // Get current color from DOM
    const currentColor = document.documentElement.getAttribute('data-color') || 'blue';
    console.log('[Color Picker Active] Current color:', currentColor);

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
          Changes are temporary (reload to reset)
        </p>
      </div>
    `;

    // Find or create container
    let colorPickerContainer = document.querySelector('.color-picker-container');
    if (!colorPickerContainer) {
      // Check if theme-controls exists
      const themeControls = document.querySelector('.theme-controls');
      if (themeControls) {
        // Add to existing theme controls
        colorPickerContainer = document.createElement('div');
        colorPickerContainer.className = 'color-picker-container';
        colorPickerContainer.innerHTML = colorPickerHTML;
        themeControls.appendChild(colorPickerContainer);
      } else {
        // Create standalone container
        colorPickerContainer = document.createElement('div');
        colorPickerContainer.className = 'theme-controls color-picker-container';
        colorPickerContainer.innerHTML = colorPickerHTML;
        document.body.appendChild(colorPickerContainer);
      }
    }

    // Get elements
    const toggleButton = colorPickerContainer.querySelector('.color-picker-toggle');
    const panel = colorPickerContainer.querySelector('.color-picker-panel');
    
    // Toggle panel visibility
    toggleButton.addEventListener('click', () => {
      const isOpen = panel.classList.contains('open');
      panel.classList.toggle('open');
      panel.setAttribute('aria-hidden', isOpen);
      console.log('[Color Picker Active] Panel toggled:', !isOpen ? 'open' : 'closed');
    });

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.color-picker-toggle') && 
          !e.target.closest('.color-picker-panel')) {
        panel.classList.remove('open');
        panel.setAttribute('aria-hidden', 'true');
      }
    });

    // Handle color selection - This is the main change from PR#13
    colorPickerContainer.querySelectorAll('.color-option').forEach(option => {
      option.addEventListener('click', () => {
        const selectedColor = option.dataset.color;
        
        // Apply the color change
        document.documentElement.setAttribute('data-color', selectedColor);
        console.log('[Color Picker Active] Color changed to:', selectedColor);
        
        // Update active states
        colorPickerContainer.querySelectorAll('.color-option').forEach(opt => {
          opt.classList.toggle('active', opt.dataset.color === selectedColor);
        });
        
        // Announce change for accessibility
        announceColorChange(selectedColor);
        
        // Log success
        console.log('[Color Picker Active] Color successfully applied:', selectedColor);
        console.log('[Color Picker Active] CSS variables should now update automatically');
      });
    });

    console.log('[Color Picker Active] Color picker activated successfully');
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
      waitForThemeSystem(createActiveColorPicker);
    });
  } else {
    waitForThemeSystem(createActiveColorPicker);
  }
})();