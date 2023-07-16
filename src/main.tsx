import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '../node_modules/primeflex/primeflex.css'
//theme
import "@/util/styles/theme.css";
//core
import "primereact/resources/primereact.min.css";
//icons
import 'primeicons/primeicons.css';
import App from './pages/App/App.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App/>)
