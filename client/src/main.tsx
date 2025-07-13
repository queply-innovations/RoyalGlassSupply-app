import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './css/index.css';
import store from './store';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);

// Remove Preload scripts loading
postMessage({ payload: 'removeLoading' }, '*');

// Use contextBridge
// window.ipcRenderer.on('main-process-message', (_event, message) => {
// 	console.log(message);
// });

// window.addEventListener('keydown', e => {
// 	const { key, altKey, ctrlKey, metaKey, shiftKey, code } = e;

// 	//Disable Alt + F4
// 	if (key === 'F4' && altKey) {
// 		e.preventDefault();
// 		console.log('Alt + F4 is pressed: Shortcut Disabled');
// 	}
// 	//Disable Ctrl + Shift + R
// 	//TODO CTRL ALT DELETE
// 	if (ctrlKey && altKey && key === 'Delete') {
// 		e.preventDefault();
// 	}
// 	//Disable Cmd + Q
// 	if (metaKey && key === 'Q') {
// 		e.preventDefault();
// 	}
// 	//Disable Ctrl + Shift + Escape
// 	//TODO CTRL SHIFT DELETE
// 	if (ctrlKey && shiftKey && code === 'Escape') {
// 		e.preventDefault();
// 	}
// });
