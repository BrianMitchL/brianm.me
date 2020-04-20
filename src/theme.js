function applyTheme(isDark) {
  const darkFunc = isDark ? 'add' : 'remove';
  const lightFunc = !isDark ? 'add' : 'remove';
  document.querySelectorAll('.themeable').forEach((el) => {
    el.classList[darkFunc]('uk-light');
    el.classList[lightFunc]('uk-dark');
  });
}

function setupTheme() {
  if (!window.matchMedia) {
    return;
  }

  function onChange(e) {
    applyTheme(e.matches);
  }

  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  if (mql.addEventListener) {
    mql.addEventListener('change', onChange);
  } else {
    mql.addListener(onChange);
  }

  applyTheme(mql.matches);
}

setupTheme();
