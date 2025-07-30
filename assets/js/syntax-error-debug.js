/**
 * Syntax Error Debug Tool
 * Purpose: Identify the source of "Unexpected end of input" error
 */

(function() {
  'use strict';

  console.log('[Syntax Debug] Starting debug...');

  // Check if theme-switcher styles are causing issues
  window.addEventListener('error', function(e) {
    console.error('[Syntax Debug] Error caught:', {
      message: e.message,
      filename: e.filename,
      lineno: e.lineno,
      colno: e.colno,
      error: e.error
    });
  });

  // Monitor DOM changes
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(function(node) {
          if (node.tagName === 'STYLE' && node.id === 'theme-switcher-enhanced-styles') {
            console.log('[Syntax Debug] Theme switcher styles added');
            console.log('[Syntax Debug] Style content length:', node.textContent.length);
            
            // Check for syntax issues in the style content
            try {
              // Try to parse as CSS
              const testDiv = document.createElement('div');
              testDiv.style.cssText = node.textContent.slice(0, 100);
              console.log('[Syntax Debug] Style syntax appears valid');
            } catch (e) {
              console.error('[Syntax Debug] Style syntax error:', e);
            }
          }
        });
      }
    });
  });

  observer.observe(document.head, { childList: true, subtree: true });

  // Check document ready state
  console.log('[Syntax Debug] Document state:', document.readyState);
  console.log('[Syntax Debug] Scripts loaded:', {
    themeControls: !!document.querySelector('.theme-controls'),
    colorPicker: !!document.querySelector('.simple-color-picker'),
    enhancedStyles: !!document.getElementById('theme-switcher-enhanced-styles')
  });

  console.log('[Syntax Debug] Debug initialized');
})();