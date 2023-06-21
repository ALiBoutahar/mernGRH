// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <App />
// );


import React from "react";
// import ReactDOM from "react-dom";
import App from "./App";
import * as ReactDOMClient from 'react-dom/client';

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
 