const stylesheet = window.screen.height >= 1080 ? 'app-1080p.css' : 'app-720p.css';
const styleElement = window.document.createElement('link');
styleElement.setAttribute('rel', 'stylesheet');
styleElement.setAttribute('type', 'text/css');
styleElement.setAttribute('href', stylesheet);
window.document.head.appendChild(styleElement);