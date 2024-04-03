import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './fonts/BILYALAYEREDBASE.ttf'
import './fonts/bilyaStyle.css'
import UserStore from './store/UserStore.js';


const userStore = new UserStore();

export const Context = createContext({
  userStore,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{userStore}}>
      <App />
    </Context.Provider>
);
