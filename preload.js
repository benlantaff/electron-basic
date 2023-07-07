const pkg = require("./package.json");
const os = require("node:os");
const { ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
  const exitButton = document.getElementById("exit");

  exitButton.addEventListener("click", (e) => {
    ipcRenderer.send("exit");
  });

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  replaceText(`app-version`, `v${pkg.version}`);
  replaceText(`platform`, os.platform);
});
