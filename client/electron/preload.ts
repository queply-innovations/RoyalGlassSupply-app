import { Invoices } from '@/features/invoice/__test__/types';
import { CartItem } from '@/features/pos/__test__/types';
import { contextBridge, ipcRenderer } from 'electron';

// --------- Expose some API to the Renderer process ---------
// contextBridge.exposeInMainWorld('ipcRenderer', withPrototype(ipcRenderer))
contextBridge.exposeInMainWorld('api', {
	send: (data: any) => ipcRenderer.send('print-invoice', data),
	receive: () => ipcRenderer.invoke('send-data'),
	transferSend: (data: any) => ipcRenderer.send('print-transfer', data),
	transferRec: () => ipcRenderer.invoke('send-transfer'),
	invSend: (data: any) => ipcRenderer.send('print-inv', data),
	invRec: () => ipcRenderer.invoke('send-inv'),
	close: (message: string) => ipcRenderer.send('close', message),
	sendInvoice: (data: {
		invoiceItems: CartItem[];
		invoiceDetails: Invoices;
	}) => ipcRenderer.send('send-invoice', data),
	receiveInvoice: () => ipcRenderer.invoke('receive-invoice'),
});

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', withPrototype(ipcRenderer));

// `exposeInMainWorld` can't detect attributes and methods of `prototype`, manually patching it.
function withPrototype(obj: Record<string, any>) {
	const protos = Object.getPrototypeOf(obj);

	for (const [key, value] of Object.entries(protos)) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) continue;

		if (typeof value === 'function') {
			// Some native APIs, like `NodeJS.EventEmitter['on']`, don't work in the Renderer process. Wrapping them into a function.
			obj[key] = function (...args: any) {
				return value.call(obj, ...args);
			};
		} else {
			obj[key] = value;
		}
	}
	return obj;
}

// --------- Preload scripts loading ---------
function domReady(
	condition: DocumentReadyState[] = ['complete', 'interactive'],
) {
	return new Promise(resolve => {
		if (condition.includes(document.readyState)) {
			resolve(true);
		} else {
			document.addEventListener('readystatechange', () => {
				if (condition.includes(document.readyState)) {
					resolve(true);
				}
			});
		}
	});
}

const safeDOM = {
	append(parent: HTMLElement, child: HTMLElement) {
		if (!Array.from(parent.children).find(e => e === child)) {
			parent.appendChild(child);
		}
	},
	remove(parent: HTMLElement, child: HTMLElement) {
		if (Array.from(parent.children).find(e => e === child)) {
			parent.removeChild(child);
		}
	},
};

/**
 * https://tobiasahlin.com/spinkit
 * https://connoratherton.com/loaders
 * https://projects.lukehaas.me/css-loaders
 * https://matejkustec.github.io/SpinThatShit
 */
function useLoading() {
	const className = `loaders-css__square-spin`;
	const styleContent = `
    @keyframes square-spin {
        25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
        50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
        75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
        100% { transform: perspective(100px) rotateX(0) rotateY(0); }
    }

    @-webkit-keyframes sk-scaleout {
        0% { -webkit-transform: scale(0) }
        100% {
            -webkit-transform: scale(1.0);
            opacity: 0;
        }
    }

    @keyframes sk-scaleout {
        0% {
            -webkit-transform: scale(0);
            transform: scale(0);
        } 100% {
            -webkit-transform: scale(1.0);
            transform: scale(1.0);
            opacity: 0;
        }
    }

    .${className} > div {
        width: 200px;
        height: 200px;
        margin: 100px auto;
        background-color: #fff;

        border-radius: 100%;
        -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;
        animation: sk-scaleout 1.0s infinite ease-in-out;
    }

    .app-loading-wrap {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #282c34;
        z-index: 9;
    }

    `;
	const oStyle = document.createElement('style');
	const oDiv = document.createElement('div');

	oStyle.id = 'app-loading-style';
	oStyle.innerHTML = styleContent;
	oDiv.className = 'app-loading-wrap';
	oDiv.innerHTML = `<div class="${className}"><div></div></div>`;

	return {
		appendLoading() {
			safeDOM.append(document.head, oStyle);
			safeDOM.append(document.body, oDiv);
		},
		removeLoading() {
			safeDOM.remove(document.head, oStyle);
			safeDOM.remove(document.body, oDiv);
		},
	};
}

// ----------------------------------------------------------------------

const { appendLoading, removeLoading } = useLoading();
domReady().then(appendLoading);

window.onmessage = ev => {
	ev.data.payload === 'removeLoading' && removeLoading();
};

setTimeout(removeLoading, 4999);
