import React from 'react';
import ReactDOM from 'react-dom/client'; // 'react-dom/client'에서 createRoot를 가져옵니다.
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// ReactDOM.createRoot() 사용
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
); // 타입스크립트에서는 as HTMLElement로 타입 명시
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

serviceWorkerRegistration.register();
