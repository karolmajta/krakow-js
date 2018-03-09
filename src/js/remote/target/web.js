const codeMapping = {
    '8': 'BACK',
    '13': 'ENTER',
    '37': 'LEFT',
    '38': 'UP',
    '39': 'RIGHT',
    '40': 'DOWN',
};

export class Remote {
    constructor(window) {
        this.listeners = {
            keyup: [],
            keydown: [],
        };
        window.addEventListener('keyup', this.onKeyUp);
        window.addEventListener('keydown', this.onKeyDown);
    }

    addEventListener(eventType, eventHandler) {
        if (eventType === 'keyup') {
            this.listeners.keyup.push(eventHandler);
        } else if (eventType === 'keydown') {
            this.listeners.keydown.push(eventHandler);
        } else {
            console.warn(`Unknown event type ${eventType}`);
        }
    }

    removeEventListener(eventType, eventHandler) {
        if (eventType === 'keyup') {
            this.listeners.keyup = this.listeners.keyup.filter(h => h !== eventHandler);
        } else if (eventType === 'keydown') {
            this.listeners.keydown = this.listeners.keydown.filter(h => h !== eventHandler);
        } else {
            console.warn(`Unknown event type ${eventType}`);
        }
    }

    onKeyUp = (e) => {
        const key = codeMapping[e.which];
        if (key) {
            this.listeners.keyup.forEach(l => l({ key }));
        }
    };

    onKeyDown = (e) => {
        const key = codeMapping[e.which];
        if (key) {
            this.listeners.keydown.forEach(l => l({ key }));
        }
    };
}