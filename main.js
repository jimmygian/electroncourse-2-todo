const electron = require('electron');

const { app, BrowserWindow, Menu } = electron;
const isMac = process.platform === 'darwin'

let mainWindow;
const cmd = isMac ? 'Command' : 'Ctrl'

const mainWindowPrefs = {
    webPreferences: {
        contextIsolation: true,
        nodeIntegration: false
    }
};

const menuTemplate = [
    ...(isMac ? [{
        label: app.name,
        submenu: [
            { role: 'about' },
            { type: 'separator' }, 
            { role: 'services' },
            { type: 'separator' }, 
            { role: 'hide' },
            { role: 'hideOthers' },
            { role: 'ubhide' },
            { type: 'separator' }, 
            { role: 'quit' },
        ]
    }] : []),
    {
        label: 'File',
        submenu: [
            {
                label: 'New Todo'
            },
            {
                label: 'Click Me',
                accelerator: `${cmd}+I`,
                click: () => {
                    console.log("HIIII!")
                }
            },
            isMac ? { role: 'close' } : { role : 'quit' }
        ]
    }
]

const createMainWindow = () => {
    mainWindow = new BrowserWindow(mainWindowPrefs);
    mainWindow.loadFile('./main.html')

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
};

app.on('ready', () => {
    createMainWindow();
});

