import React from 'react';
import ReactDOM from 'react-dom/client';
import {AuthProvider, Layout} from "./components";
import {HashRouter} from "react-router-dom";
import {RoutesPage} from "./components/routes";

import * as firebase from 'firebase/app'

firebase.initializeApp({
  apiKey: "AIzaSyD7JIZKiiixvNKEt92aigP3SLRQ6SebBp4",
  authDomain: "vk-copy-6630e.firebaseapp.com",
  projectId: "vk-copy-6630e",
  storageBucket: "vk-copy-6630e.appspot.com",
  messagingSenderId: "978580946010",
  appId: "1:978580946010:web:42135d437c3ead34086c63"
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <HashRouter>
        <Layout>
          <RoutesPage/>
        </Layout>
      </HashRouter>
    </AuthProvider>
  </React.StrictMode>
);
