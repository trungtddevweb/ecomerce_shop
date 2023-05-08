import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from 'src/redux/store'
import { Provider } from 'react-redux'
import SpinnerAnimation from './components/SpinnerAnimation'
import { ThemeProvider } from '@mui/styles'
import theme from 'src/theme/theme'
import { CssBaseline } from '@mui/material'
import ErrorBoundaryCustom from './components/ErrorBoundary'
import { ToastContainer } from 'react-toastify'
import ConfirmDialog from './components/ConfirmDialog'
const LazyApp = lazy(() => import('./App'))

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <CssBaseline />
            <PersistGate loading={null} persistor={persistor}>
                <ErrorBoundaryCustom>
                    <Suspense fallback={<SpinnerAnimation />}>
                        <ThemeProvider theme={theme}>
                            <LazyApp />
                        </ThemeProvider>
                    </Suspense>
                </ErrorBoundaryCustom>
            </PersistGate>
            <ToastContainer position='top-right' limit={5} />
            <ConfirmDialog />
        </Provider>
    </React.StrictMode>
)
