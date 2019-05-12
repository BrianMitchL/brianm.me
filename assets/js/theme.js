(function() {
  const DARK = '(prefers-color-scheme: dark)';
  const LIGHT = '(prefers-color-scheme: light)';

  function changeWebsiteTheme(scheme) {
    const darkFunc = scheme === 'dark' ? 'add' : 'remove';
    const lightFunc = scheme === 'light' ? 'add' : 'remove';
    document.querySelectorAll('.themeable').forEach(el => {
      el.classList[darkFunc]('uk-light');
      el.classList[lightFunc]('uk-dark');
    });
  }

  function detectColorScheme() {
    if (!window.matchMedia) {
      return;
    }

    function listener({ matches, media }) {
      if (!matches) {
        return;
      }
      if (media === DARK) {
        changeWebsiteTheme('dark');
      } else if (media === LIGHT) {
        changeWebsiteTheme('light');
      }
    }

    const mqDark = window.matchMedia(DARK);
    mqDark.addListener(listener);
    const mqLight = window.matchMedia(LIGHT);
    mqLight.addListener(listener);

    // run the toggler on page load
    if (mqDark.matches) {
      changeWebsiteTheme('dark');
    } else if (mqLight.matches) {
      changeWebsiteTheme('light');
    }
  }

  detectColorScheme();
})();
