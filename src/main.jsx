import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './Router.jsx'
import { CurrencyProvider } from './context/CurrencyContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { AppDataProvider } from './context/AppDataContext.jsx'
import { BookingProvider } from './context/BookingContext.jsx'

import { BlogProvider } from './context/BlogContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <AppDataProvider>
        <BookingProvider>
          <CurrencyProvider>
            <BlogProvider>
              <RouterProvider router={router} />
            </BlogProvider>
          </CurrencyProvider>
        </BookingProvider>
      </AppDataProvider>
    </AuthProvider>
  </StrictMode>,
)
