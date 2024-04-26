import { app, BrowserWindow, globalShortcut, ipcMain, ipcRenderer, WebContents, WebContentsPrintOptions } from 'electron';
import path from 'node:path';

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist');
process.env.VITE_PUBLIC = app.isPackaged
	? process.env.DIST
	: path.join(process.env.DIST, '../public');

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];

function createWindow() {
	win = new BrowserWindow({
		fullscreen: true,
		icon: path.join(process.env.VITE_PUBLIC, 'RGS-logo.png'),
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			// devTools: false, //TODO: Remove on Production
			plugins: true, 
			nodeIntegration: false,
			backgroundThrottling: false,
			contextIsolation: true,
		},
	});
	// win.removeMenu(); // Remove default menu //TODO: Uncomment on Production
	win.webContents.openDevTools(); // Devtools on Open //TODO: Remove on Production

	// Test active push message to Renderer-process.
	win.webContents.on('did-finish-load', () => {
		win?.webContents.send(
			'main-process-message',
			new Date().toLocaleString(),
		);
	});

	if (VITE_DEV_SERVER_URL) {
		win.loadURL(VITE_DEV_SERVER_URL);
	} else {
		// win.loadFile('dist/index.html');
		win.loadFile(path.join(process.env.DIST, 'index.html'));
	}

	ipcMain.on('print-invoice', (event, data) => {
		const newWindow = new BrowserWindow({
			fullscreen: true,
			icon: path.join(process.env.VITE_PUBLIC, 'RGS-logo.png'),
			webPreferences: {
				preload: path.join(__dirname, 'preload.js'),
				plugins: true, 
				nodeIntegration: false,
				backgroundThrottling: false,
				contextIsolation: true,
			},
		});
		const windowWebContents: WebContents = newWindow.webContents;
		const options: WebContentsPrintOptions = {
			landscape: false,
			color: false,
			printBackground: false,
			pageSize: 'A4',
			silent: false, //TODO: convert to true after final testing
			margins: {marginType: 'none'},
		};
		ipcMain.handle('send-data', () => { return data; });
		windowWebContents.loadURL('http://localhost:5173/#/pos/print-invoice').then(() => {
			setTimeout(() => {
				windowWebContents.print(options, (success, reason) => { 
					console.log(success, reason);
					if (success) {
						windowWebContents.close();
					}
				})
			}, 3000);
		});
	})
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
		win = null;
	}
});

app.on('browser-window-focus', () => {
	globalShortcut.register('CommandOrControl+R', () => {
		console.log('Command/Control+R is pressed: Shortcut Disabled');
	});
	globalShortcut.register('Control+Shift+R', () => {
		console.log('Command/Control SHIFT+R is pressed: Shortcut Disabled');
	});
	globalShortcut.register('Alt+F4', () => {
		console.log('ALT F4 DISABLED');
		return false;
	});
	globalShortcut.register('Control+W', () => {
		console.log('DISABLE Ctrl + W');
	});
});
app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

app.whenReady().then(createWindow);
