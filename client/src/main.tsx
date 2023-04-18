import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import { SliderContextProvider } from './context/slider-context'
import { StoreContextProvider } from './context/store-context'
import { SnackbarContextProvider } from './context/snackbar-context';

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <SliderContextProvider>
        <StoreContextProvider>
          <SnackbarContextProvider>
        <App />
          </SnackbarContextProvider>
        </StoreContextProvider>
      </SliderContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
