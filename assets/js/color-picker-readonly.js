/**
 * Color Picker UI - Read Only Version (PR#13)
 * Purpose: Display current color and available options without functionality
 * Safe: No color changes, only visual display
 */

(function() {
  'use strict';

  // Wait for DOM and theme-switcher to initialize
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

  function createColorPickerUI() {
    // Get current color
    const currentColor = document.documentElement.getAttribute('data-color') || 'blue';
    console.log('[Color Picker UI] Current color:', currentColor);

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
          Click colors to preview (PR#14 coming soon)
        </p>
      </div>
    `;

    // Find or create theme controls container
    let themeControls = document.querySelector('.theme-controls');
    if (!themeControls) {
      themeControls = document.createElement('div');
      themeControls.className = 'theme-controls';
      document.body.appendChild(themeControls);
    }

    // Add color picker to theme controls
    const colorPickerContainer = document.createElement('div');
    colorPickerContainer.innerHTML = colorPickerHTML;
    themeControls.appendChild(colorPickerContainer.firstElementChild);
    themeControls.appendChild(colorPickerContainer.lastElementChild);

    // Toggle panel visibility (read-only interaction)
    const toggleButton = document.querySelector('.color-picker-toggle');
    const panel = document.querySelector('.color-picker-panel');
    
    toggleButton.addEventListener('click', () => {
      const isOpen = panel.classList.contains('open');
      panel.classList.toggle('open');
      panel.setAttribute('aria-hidden', isOpen);
      console.log('[Color Picker UI] Panel toggled:', !isOpen ? 'open' : 'closed');
    });

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.color-picker-toggle') && !e.target.closest('.color-picker-panel')) {
        panel.classList.remove('open');
        panel.setAttribute('aria-hidden', 'true');
      }
    });

    // Log clicks on color options (no action taken)
    document.querySelectorAll('.color-option').forEach(option => {
      option.addEventListener('click', () => {
        const color = option.dataset.color;
        console.log('[Color Picker UI] Color clicked:', color, '(read-only mode)');
      });
    });

    console.log('[Color Picker UI] UI created successfully');
  }

  // Initialize when ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      waitForThemeSystem(createColorPickerUI);
    });
  } else {
    waitForThemeSystem(createColorPickerUI);
  }
})();