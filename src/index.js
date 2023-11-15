import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';
import {AuthProvider} from './app/Auth/Context/auth.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './app/Chatbot/StorageContext/store.js';
ReactDOM.render(
    <AuthProvider>
        <Provider store={store}>
            <App />
            </Provider>
    </AuthProvider>, 
    document.getElementById('root')
);