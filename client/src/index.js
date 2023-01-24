import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss'
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'src/redux/store'
import { Provider } from 'react-redux';
import SpinnerAnimation from './components/SpinnerAnimation';
const LazyApp = lazy(() => import('./App'))


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store} >
            <PersistGate loading={null} persistor={persistor}>
                <Suspense fallback={<SpinnerAnimation />}>
                    <LazyApp />
                </Suspense>
            </PersistGate>
        </Provider>
    </React.StrictMode>

);
