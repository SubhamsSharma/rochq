import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import FavoriteMailProvider from './contexts/favoriteMailContext'
import MailDetails from './components/MailDetails'
import App from './App'
import './index.css'
import ReadMailProvider from './contexts/readMailContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient} >
    <FavoriteMailProvider>
    <ReadMailProvider>
    <React.StrictMode>
    <Router>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path=":id" element={<MailDetails />} />
            </Route>
        </Routes>
    </Router>
  </React.StrictMode>
  </ReadMailProvider>
  </FavoriteMailProvider>
  </QueryClientProvider>
  
)
