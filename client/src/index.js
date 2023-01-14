import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss'

const LazyApp = lazy(() => import('./App'))


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Suspense fallback={<div>Loading...</div>}>
            <LazyApp />
        </Suspense>
    </React.StrictMode>

);
