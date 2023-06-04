import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import RoutesApp from './routes/AppRoutes.routes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <App />
        <RoutesApp />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)
