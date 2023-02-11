import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {GithubProvider} from './context/context';
import {Auth0Provider} from '@auth0/auth0-react';
import {HashRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

//dev-ozmhonyuv6ur6kpa.us.auth0.com
//'N8vO0VCoj6bW9UFUgXBfi7Rx7fZYe6pp'

root.render(
    <Auth0Provider
        domain={'dev-ozmhonyuv6ur6kpa.us.auth0.com'}
        clientId={'N8vO0VCoj6bW9UFUgXBfi7Rx7fZYe6pp'}
        redirectUri={window.location.origin}
        cacheLocation='localstorage'
    >
            <GithubProvider>
                <App/>
            </GithubProvider>

    </Auth0Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
