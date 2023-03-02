const pkg = require('./package.json');
const os = require('node:os');

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  replaceText(`app-version`, `v${pkg.version}`);
  replaceText(`platform`, os.platform);
});
