function applyTheme(isDark) {
  const htmlEl = document.getElementsByTagName('html')[0];
  htmlEl.classList.remove(isDark ? 'uk-dark' : 'uk-light');
  htmlEl.classList.add(isDark ? 'uk-light' : 'uk-dark');
}

function setupTheme() {
  if (!window.matchMedia) {
    return;
  }

  function onChange(e) {
    applyTheme(e.matches);
  }

  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  if (mql.addListener) {
    mql.addListener(onChange);
  }

  applyTheme(mql.matches);
}

setupTheme();
