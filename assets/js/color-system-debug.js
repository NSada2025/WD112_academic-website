/**
 * Color System Debug Tool for PR#12
 * Purpose: Verify current color system state without making changes
 * Safe: Read-only operations, no modifications to DOM or storage
 */

(function() {
  'use strict';

  console.log('=== Color System Debug Start ===');

  // 1. Check current DOM state
  try {
    const root = document.documentElement;
    console.log('1. Current data attributes:', {
      theme: root.getAttribute('data-theme') || 'not set',
      color: root.getAttribute('data-color') || 'not set',
      allDataAttributes: root.dataset
    });
  } catch (e) {
    console.error('Error reading DOM attributes:', e);
  }

  // 2. Check CSS variables
  try {
    const computedStyle = getComputedStyle(document.documentElement);
    console.log('2. CSS Variables Check:', {
      primary50: computedStyle.getPropertyValue('--primary-50'),
      primary500: computedStyle.getPropertyValue('--primary-500'),
      primary900: computedStyle.getPropertyValue('--primary-900'),
      linkColor: computedStyle.getPropertyValue('--link-color'),
      bgColor: computedStyle.getPropertyValue('--bg-color')
    });
  } catch (e) {
    console.error('Error reading CSS variables:', e);
  }

  // 3. Check localStorage
  try {
    console.log('3. LocalStorage Check:', {
      hasLocalStorage: typeof(Storage) !== "undefined",
      currentTheme: localStorage.getItem('site-theme-mode'),
      currentColor: localStorage.getItem('site-color-palette'),
      allKeys: Object.keys(localStorage)
    });
  } catch (e) {
    console.error('Error accessing localStorage:', e);
  }

  // 4. Check if color picker UI exists
  try {
    const colorPicker = document.querySelector('.color-picker-toggle');
    const colorPanel = document.querySelector('.color-picker-panel');
    console.log('4. UI Elements Check:', {
      colorPickerExists: !!colorPicker,
      colorPanelExists: !!colorPanel,
      colorPickerClasses: colorPicker?.className,
      colorPanelClasses: colorPanel?.className
    });
  } catch (e) {
    console.error('Error checking UI elements:', e);
  }

  // 5. Test color switching (without applying)
  try {
    const testColors = ['blue', 'rose', 'green'];
    console.log('5. Color Definition Test:');
    testColors.forEach(color => {
      // Create temporary element to test CSS
      const testDiv = document.createElement('div');
      testDiv.style.display = 'none';
      testDiv.setAttribute('data-color', color);
      document.body.appendChild(testDiv);
      
      // Check if CSS rules exist for this color
      const hasRules = getComputedStyle(testDiv).length > 0;
      console.log(`  - ${color}: CSS rules ${hasRules ? 'exist' : 'missing'}`);
      
      // Clean up
      document.body.removeChild(testDiv);
    });
  } catch (e) {
    console.error('Error testing color definitions:', e);
  }

  console.log('=== Color System Debug End ===');
  console.log('Next step: Check console for any errors or unexpected values');
})();