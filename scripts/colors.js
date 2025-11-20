// scripts/colors.js
(function () {
  const root = document.documentElement;

  // Keys → CSS variable base names and their localStorage keys
  const keys = {
    accent: 'accentColor',
    main: 'mainColor',
    background: 'backgroundColor',
    navbar: 'navbarColor',
    box: 'boxColor',
    textcolor2: 'textColor2'
  };

  // Default Nord colors (as requested)
  const defaults = {
    accent: '#88C0D0',
    main: '#ECEFF4',
    background: '#4C566A',
    navbar: '#434C5E',
    box: '#2e3440',
    textcolor2: '#D08770'
  };

  // Theme presets
  const themes = {
    nord: {
      '--background-color': '#4C566A',
      '--navbar-color': '#434C5E',
      '--accent-color': '#88C0D0',
      '--main-color': '#ECEFF4',
      '--box-color': '#2e3440',
      '--textcolor2-color': '#D08770'
    },

    catppuccin_macchiato: {
      '--background-color': '#24273a',
      '--navbar-color': '#1e2030',
      '--accent-color': '#8aadf4',
      '--main-color': '#cad3f5',
      '--box-color': '#363a4f',
      '--textcolor2-color': '#f5bde6'
    },

    everforest: {
      '--background-color': '#4F5B58',
      '--navbar-color': '#374145',
      '--accent-color': '#A7C080',
      '--main-color': '#7FBBB3',
      '--box-color': '#3b4a45',
      '--textcolor2-color': '#E67C7C'
    },

    rosepine: {
      '--background-color': '#232136',
      '--navbar-color': '#44415a',
      '--accent-color': '#ea9a97',
      '--main-color': '#c4a7e7',
      '--box-color': '#2a273f',
      '--textcolor2-color': '#f6c177'
    },

    gruvbox: {
      '--background-color': '#504945',
      '--navbar-color': '#3C3836',
      '--accent-color': '#d79921',
      '--main-color': '#d65d0e',
      '--box-color': '#3a352c',
      '--textcolor2-color': '#689d6a'
    },

    lilac: {
      '--background-color': '#A58AC1',
      '--navbar-color': '#443B54',
      '--accent-color': '#857996',
      '--main-color': '#DEC2FF',
      '--box-color': '#61547a',
      '--textcolor2-color': '#FFB3F3'
    },

    coral: {
      '--background-color': '#aa998f',
      '--navbar-color': '#7d4f50',
      '--accent-color': '#d1be9c',
      '--main-color': '#f9eae1',
      '--box-color': '#cc8b86',
      '--textcolor2-color': '#ffb5a7'
    },

    daydream: {
      '--background-color': '#485665',
      '--navbar-color': '#8e7c93',
      '--accent-color': '#d0a5c0',
      '--main-color': '#f6c0d0',
      '--box-color': '#294756',
      '--textcolor2-color': '#d7b4f3'
    },

    maple: {
      '--background-color': '#533e2d',
      '--navbar-color': '#a27035',
      '--accent-color': '#b88b48',
      '--main-color': '#ddca7d',
      '--box-color': '#2c2926',
      '--textcolor2-color': '#e6b566'
    },

    ocean: {
      '--background-color': '#80ced7',
      '--navbar-color': '#007ea7',
      '--accent-color': '#83c5c9',
      '--main-color': '#ccdbdc',
      '--box-color': '#003249',
      '--textcolor2-color': '#00d4f0'
    },

    woodwork: {
      '--background-color': '#99c5b5',
      '--navbar-color': '#899eab',
      '--accent-color': '#afece7',
      '--main-color': '#70cdba',
      '--box-color': '#706c61',
      '--textcolor2-color': '#d9ae5f'
    }
  };

  // Apply CSS vars from theme map
  function setCssVarsFromMap(map) {
    Object.entries(map).forEach(([k, v]) => {
      root.style.setProperty(k, v);
    });
  }

  // Apply a single CSS variable + persist optionally
  function applyKey(key, value, persist = true) {
    root.style.setProperty(`--${key}-color`, value);
    if (persist) localStorage.setItem(keys[key], value);
  }

  // Load saved or default colors + theme
  function loadColors() {
    const savedTheme = localStorage.getItem('theme') || 'nord';
    const themeVars = themes[savedTheme] || themes.nord;
    setCssVarsFromMap(themeVars);

    Object.keys(keys).forEach(key => {
      const storageKey = keys[key];
      const stored = localStorage.getItem(storageKey);
      const value = stored || defaults[key];

      applyKey(key, value, false);

      const el = document.getElementById(`${key}Color`);
      if (el) el.value = value;
    });
  }

  // Switch theme
  window.setTheme = function (name) {
    const theme = themes[name];
    if (!theme) return;

    setCssVarsFromMap(theme);
    localStorage.setItem('theme', name);

    Object.keys(keys).forEach(key => {
      const cssKey = `--${key}-color`;
      const themeVal = theme[cssKey] || defaults[key];
      localStorage.setItem(keys[key], themeVal);

      const el = document.getElementById(`${key}Color`);
      if (el) el.value = themeVal;

      applyKey(key, themeVal, false);
    });
  };

  // Reset to defaults
  window.resetColors = function () {
    Object.keys(keys).forEach(key => {
      localStorage.removeItem(keys[key]);
      applyKey(key, defaults[key], false);

      const el = document.getElementById(`${key}Color`);
      if (el) el.value = defaults[key];
    });

    localStorage.removeItem('theme');

    // Apply default Nord theme
    setCssVarsFromMap({
      '--background-color': defaults.background,
      '--navbar-color': defaults.navbar,
      '--accent-color': defaults.accent,
      '--main-color': defaults.main,
      '--box-color': defaults.box,
      '--textcolor2-color': defaults.textcolor2
    });

    const sel = document.getElementById('presetThemeSelect');
    if (sel) sel.value = 'nord';
  };

  // Hook up color pickers
  function attachInputListeners() {
    Object.keys(keys).forEach(key => {
      const el = document.getElementById(`${key}Color`);
      if (!el) return;

      el.addEventListener('input', (e) => {
        applyKey(key, e.target.value, false);
      });

      el.addEventListener('change', (e) => {
        applyKey(key, e.target.value, true);
        localStorage.removeItem('theme');
      });
    });
  }

  // Init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      loadColors();
      attachInputListeners();
    });
  } else {
    loadColors();
    attachInputListeners();
  }
})();


// Sync dropdown
function syncThemeSelect() {
  const sel = document.getElementById('presetThemeSelect');
  if (!sel) return;

  const savedTheme = localStorage.getItem('theme') || 'nord';
  sel.value = savedTheme;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', syncThemeSelect);
} else {
  syncThemeSelect();
}
