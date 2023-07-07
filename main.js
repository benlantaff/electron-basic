const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const updater = require("./updater");

/* Keep a global reference of the window objects. If you don't, the windows will
 be closed automatically when the JavaScript object is garbage collected. */
let mainWindow;
let updateWindow;

/* Switch env to 'Dev' while you are working in development mode */
let env = "Prod";

/* Create a new BrowserWindow when `app` is ready */
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 700,
    height: 500,
    frame: false,
    resizable: false,
    webSecurity: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  updateWindow = new BrowserWindow({
    width: 300,
    height: 200,
    frame: false,
    resizable: false,
    show: false,
    icon: __dirname + "/icon.png",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      parent: mainWindow,
    },
  });

  /* Load your Express app into the new BrowserWindow */
  mainWindow.loadFile("src/index.html");
  updateWindow.loadFile("src/updates.html");

  /* Open DevTools - Remove for PRODUCTION! */
  if (env == "Dev") {
    updateWindow.close();
    mainWindow.show();
    // mainWindow.webContents.openDevTools();
  } else {
    updateWindow.show();
    updater(updateWindow, mainWindow);
  }

  /* Listen for window being closed */
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

/* When Electron `app` is ready, create the window. */
app.on("ready", createWindow);

/* Quit when all windows are closed - (Not macOS - Darwin) */
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// IPC Messaging - Exit button
ipcMain.on("exit", async (e, data) => {
  app.quit();
});

/* When app icon is clicked and app is running, (macOS) recreate the BrowserWindow */
app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
