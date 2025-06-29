/**
 * Theme Configuration
 * Centralized configuration for all theme options and settings
 */

window.ThemeConfig = {
  // Storage keys
  STORAGE_KEYS: {
    theme: 'site-theme-mode',
    color: 'site-color-palette',
    fontSize: 'site-font-size',
    layoutWidth: 'site-layout-width',
    animations: 'site-animations',
    autoTheme: 'site-auto-theme',
    seasonalThemes: 'site-seasonal-themes',
    accessibility: 'site-accessibility-mode'
  },

  // Default settings
  DEFAULTS: {
    theme: 'light',
    color: 'blue',
    fontSize: 'medium',
    layoutWidth: 'standard',
    animations: true,
    autoTheme: false,
    seasonalThemes: false,
    accessibility: false
  },

  // Color palettes with enhanced metadata
  COLOR_PALETTES: [
    {
      id: 'blue',
      name: 'Ocean Blue',
      description: 'Professional and trustworthy',
      category: 'standard',
      primaryColor: '#3b82f6',
      accessibility: {
        contrastRatio: 4.5,
        wcagLevel: 'AA'
      },
      tags: ['professional', 'academic', 'corporate']
    },
    {
      id: 'zinc',
      name: 'Neutral Gray',
      description: 'Clean and minimalist',
      category: 'standard',
      primaryColor: '#71717a',
      accessibility: {
        contrastRatio: 4.8,
        wcagLevel: 'AA'
      },
      tags: ['minimal', 'modern', 'clean']
    },
    {
      id: 'rose',
      name: 'Warm Rose',
      description: 'Friendly and approachable',
      category: 'standard',
      primaryColor: '#f43f5e',
      accessibility: {
        contrastRatio: 4.2,
        wcagLevel: 'AA'
      },
      tags: ['warm', 'friendly', 'creative']
    },
    {
      id: 'green',
      name: 'Forest Green',
      description: 'Natural and calming',
      category: 'standard',
      primaryColor: '#22c55e',
      accessibility: {
        contrastRatio: 4.6,
        wcagLevel: 'AA'
      },
      tags: ['nature', 'eco', 'growth']
    },
    {
      id: 'violet',
      name: 'Royal Purple',
      description: 'Creative and innovative',
      category: 'standard',
      primaryColor: '#8b5cf6',
      accessibility: {
        contrastRatio: 4.1,
        wcagLevel: 'AA'
      },
      tags: ['creative', 'luxury', 'innovative']
    },
    {
      id: 'orange',
      name: 'Sunset Orange',
      description: 'Energetic and bold',
      category: 'standard',
      primaryColor: '#f97316',
      accessibility: {
        contrastRatio: 4.3,
        wcagLevel: 'AA'
      },
      tags: ['energetic', 'bold', 'dynamic']
    },
    {
      id: 'teal',
      name: 'Ocean Teal',
      description: 'Modern and refreshing',
      category: 'standard',
      primaryColor: '#14b8a6',
      accessibility: {
        contrastRatio: 4.7,
        wcagLevel: 'AA'
      },
      tags: ['modern', 'fresh', 'balanced']
    },
    {
      id: 'highcontrast',
      name: 'High Contrast',
      description: 'Maximum readability',
      category: 'accessibility',
      primaryColor: '#000000',
      accessibility: {
        contrastRatio: 21,
        wcagLevel: 'AAA'
      },
      tags: ['accessibility', 'high-contrast', 'readable']
    },
    {
      id: 'sepia',
      name: 'Sepia Tone',
      description: 'Warm reading experience',
      category: 'accessibility',
      primaryColor: '#8B4513',
      accessibility: {
        contrastRatio: 5.2,
        wcagLevel: 'AA'
      },
      tags: ['reading', 'vintage', 'eye-friendly']
    },
    // Seasonal themes
    {
      id: 'spring',
      name: 'Spring Bloom',
      description: 'Fresh greens and pastels',
      category: 'seasonal',
      primaryColor: '#22c55e',
      season: 'spring',
      months: [2, 3, 4], // March, April, May
      accessibility: {
        contrastRatio: 4.4,
        wcagLevel: 'AA'
      },
      tags: ['seasonal', 'fresh', 'nature']
    },
    {
      id: 'summer',
      name: 'Summer Sun',
      description: 'Bright and vibrant',
      category: 'seasonal',
      primaryColor: '#f59e0b',
      season: 'summer',
      months: [5, 6, 7], // June, July, August
      accessibility: {
        contrastRatio: 4.1,
        wcagLevel: 'AA'
      },
      tags: ['seasonal', 'bright', 'energetic']
    },
    {
      id: 'autumn',
      name: 'Autumn Leaves',
      description: 'Warm earth tones',
      category: 'seasonal',
      primaryColor: '#dc2626',
      season: 'autumn',
      months: [8, 9, 10], // September, October, November
      accessibility: {
        contrastRatio: 4.8,
        wcagLevel: 'AA'
      },
      tags: ['seasonal', 'warm', 'cozy']
    },
    {
      id: 'winter',
      name: 'Winter Frost',
      description: 'Cool blues and silvers',
      category: 'seasonal',
      primaryColor: '#0284c7',
      season: 'winter',
      months: [11, 0, 1], // December, January, February
      accessibility: {
        contrastRatio: 4.9,
        wcagLevel: 'AA'
      },
      tags: ['seasonal', 'cool', 'crisp']
    },
    // Time-based themes
    {
      id: 'dawn',
      name: 'Dawn Glow',
      description: 'Soft morning colors',
      category: 'time-based',
      primaryColor: '#e11d48',
      timeRange: [5, 8], // 5 AM - 8 AM
      accessibility: {
        contrastRatio: 4.3,
        wcagLevel: 'AA'
      },
      tags: ['morning', 'soft', 'peaceful']
    },
    {
      id: 'dusk',
      name: 'Dusk Purple',
      description: 'Evening purple and orange',
      category: 'time-based',
      primaryColor: '#9333ea',
      timeRange: [18, 21], // 6 PM - 9 PM
      accessibility: {
        contrastRatio: 4.2,
        wcagLevel: 'AA'
      },
      tags: ['evening', 'dramatic', 'warm']
    },
    {
      id: 'midnight',
      name: 'Midnight Blue',
      description: 'Deep dark with stars',
      category: 'time-based',
      primaryColor: '#1e293b',
      timeRange: [21, 5], // 9 PM - 5 AM
      accessibility: {
        contrastRatio: 6.1,
        wcagLevel: 'AA'
      },
      tags: ['night', 'dark', 'mysterious']
    },
    // Academic themes
    {
      id: 'academic',
      name: 'Academic Classic',
      description: 'Traditional and scholarly',
      category: 'academic',
      primaryColor: '#1e40af',
      accessibility: {
        contrastRatio: 5.5,
        wcagLevel: 'AA'
      },
      tags: ['academic', 'traditional', 'scholarly']
    },
    {
      id: 'nature',
      name: 'Nature Study',
      description: 'Earth and forest tones',
      category: 'academic',
      primaryColor: '#65a30d',
      accessibility: {
        contrastRatio: 4.6,
        wcagLevel: 'AA'
      },
      tags: ['nature', 'research', 'organic']
    },
    {
      id: 'ocean',
      name: 'Ocean Research',
      description: 'Deep sea blues and teals',
      category: 'academic',
      primaryColor: '#0891b2',
      accessibility: {
        contrastRatio: 4.8,
        wcagLevel: 'AA'
      },
      tags: ['marine', 'research', 'deep']
    }
  ],

  // Font size options
  FONT_SIZES: [
    {
      id: 'small',
      name: 'Small',
      description: 'Compact reading',
      baseSize: '14px',
      scale: 0.875
    },
    {
      id: 'medium',
      name: 'Medium',
      description: 'Standard reading',
      baseSize: '16px',
      scale: 1
    },
    {
      id: 'large',
      name: 'Large',
      description: 'Comfortable reading',
      baseSize: '18px',
      scale: 1.125
    },
    {
      id: 'xlarge',
      name: 'Extra Large',
      description: 'Accessibility focused',
      baseSize: '20px',
      scale: 1.25
    }
  ],

  // Layout width options
  LAYOUT_WIDTHS: [
    {
      id: 'compact',
      name: 'Compact',
      description: 'Narrow layout for focus',
      maxWidth: '800px',
      padding: '1rem'
    },
    {
      id: 'standard',
      name: 'Standard',
      description: 'Balanced layout',
      maxWidth: '1200px',
      padding: '2rem'
    },
    {
      id: 'wide',
      name: 'Wide',
      description: 'Full-width layout',
      maxWidth: '1400px',
      padding: '3rem'
    },
    {
      id: 'full',
      name: 'Full Width',
      description: 'Maximum screen usage',
      maxWidth: '100%',
      padding: '1rem'
    }
  ],

  // Theme categories for organization
  CATEGORIES: {
    standard: {
      name: 'Standard Themes',
      description: 'Versatile themes for general use',
      icon: '🎨'
    },
    accessibility: {
      name: 'Accessibility',
      description: 'High contrast and readability focused',
      icon: '♿'
    },
    seasonal: {
      name: 'Seasonal',
      description: 'Themes that change with seasons',
      icon: '🌸'
    },
    'time-based': {
      name: 'Time of Day',
      description: 'Themes that adapt to time',
      icon: '🕐'
    },
    academic: {
      name: 'Academic',
      description: 'Scholarly and research focused',
      icon: '🎓'
    }
  },

  // Accessibility features
  ACCESSIBILITY_FEATURES: {
    highContrast: {
      name: 'High Contrast Mode',
      description: 'Increase contrast for better visibility',
      enabled: false
    },
    reducedMotion: {
      name: 'Reduce Motion',
      description: 'Minimize animations and transitions',
      enabled: false
    },
    focusVisible: {
      name: 'Enhanced Focus',
      description: 'Improve keyboard navigation visibility',
      enabled: false
    },
    largeText: {
      name: 'Large Text',
      description: 'Increase text size for readability',
      enabled: false
    }
  },

  // Animation presets
  ANIMATION_PRESETS: {
    none: {
      name: 'No Animations',
      description: 'Disable all animations',
      transitions: false,
      hover: false,
      loading: false
    },
    minimal: {
      name: 'Minimal',
      description: 'Essential animations only',
      transitions: true,
      hover: false,
      loading: true
    },
    standard: {
      name: 'Standard',
      description: 'Normal animation level',
      transitions: true,
      hover: true,
      loading: true
    },
    enhanced: {
      name: 'Enhanced',
      description: 'Rich animations and effects',
      transitions: true,
      hover: true,
      loading: true,
      decorative: true
    }
  },

  // Utility functions
  utils: {
    // Get color palette by ID
    getColorPalette(id) {
      return this.COLOR_PALETTES.find(palette => palette.id === id);
    },

    // Get palettes by category
    getPalettesByCategory(category) {
      return this.COLOR_PALETTES.filter(palette => palette.category === category);
    },

    // Get seasonal theme for current month
    getSeasonalTheme() {
      const currentMonth = new Date().getMonth();
      return this.COLOR_PALETTES.find(palette => 
        palette.category === 'seasonal' && 
        palette.months.includes(currentMonth)
      );
    },

    // Get time-based theme for current hour
    getTimeBasedTheme() {
      const currentHour = new Date().getHours();
      return this.COLOR_PALETTES.find(palette => {
        if (palette.category !== 'time-based') return false;
        const [start, end] = palette.timeRange;
        if (start <= end) {
          return currentHour >= start && currentHour < end;
        } else {
          // Handle overnight range (e.g., 21-5)
          return currentHour >= start || currentHour < end;
        }
      });
    },

    // Check if palette meets accessibility requirements
    isAccessible(paletteId, level = 'AA') {
      const palette = this.getColorPalette(paletteId);
      return palette && palette.accessibility.wcagLevel === level;
    },

    // Get recommended palettes based on preferences
    getRecommendedPalettes(preferences = {}) {
      let palettes = [...this.COLOR_PALETTES];

      // Filter by accessibility requirements
      if (preferences.requireAccessible) {
        palettes = palettes.filter(p => p.accessibility.wcagLevel === 'AA');
      }

      // Filter by category
      if (preferences.category) {
        palettes = palettes.filter(p => p.category === preferences.category);
      }

      // Filter by tags
      if (preferences.tags) {
        palettes = palettes.filter(p => 
          preferences.tags.some(tag => p.tags.includes(tag))
        );
      }

      return palettes;
    },

    // Validate theme configuration
    validateConfig(config) {
      const errors = [];

      // Check required fields
      if (!config.theme || !['light', 'dark', 'auto'].includes(config.theme)) {
        errors.push('Invalid theme mode');
      }

      if (!config.color || !this.getColorPalette(config.color)) {
        errors.push('Invalid color palette');
      }

      if (!config.fontSize || !this.FONT_SIZES.find(f => f.id === config.fontSize)) {
        errors.push('Invalid font size');
      }

      if (!config.layoutWidth || !this.LAYOUT_WIDTHS.find(l => l.id === config.layoutWidth)) {
        errors.push('Invalid layout width');
      }

      return {
        valid: errors.length === 0,
        errors
      };
    }
  }
};

// Export for module systems if available
if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.ThemeConfig;
}