import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Router from './routes';
import ScrollToTop from './components/ScrollToTop';

//auth check provider
import { AuthProvider } from './context/auth';

import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './pages/ErrorPage';

function App() {

  const errorHandler = (error, errorInfo) => {
    console.log("error logging", error, errorInfo);
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorPage} onError={errorHandler}>
      <AuthProvider>
        <ScrollToTop />
        <Router />
      </AuthProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </ErrorBoundary>
  )
}

export default App
