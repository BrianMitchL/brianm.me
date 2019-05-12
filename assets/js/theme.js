// adapted from https://medium.freecodecamp.org/how-to-detect-a-users-preferred-color-scheme-in-javascript-ec8ee514f1ef

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
    if (mqDark.addEventListener) {
      mqDark.addEventListener('change', listener);
    } else {
      mqDark.addListener(listener);
    }
    const mqLight = window.matchMedia(LIGHT);
    if (mqLight.addEventListener) {
      mqLight.addEventListener('change', listener);
    } else {
      mqLight.addListener(listener);
    }

    // run the toggler on page load
    if (mqDark.matches) {
      changeWebsiteTheme('dark');
    } else if (mqLight.matches) {
      changeWebsiteTheme('light');
    }
  }

  detectColorScheme();
})();
