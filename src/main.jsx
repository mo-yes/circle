import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HeroUIProvider } from '@heroui/react'
import { Toaster } from 'react-hot-toast'
import AuthContextProvider from './context/AuthContext.jsx'
import ThemeContextProvider from './context/ThemeContext.jsx'
import "./i18n";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeContextProvider>
      <HeroUIProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </HeroUIProvider>
      <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          padding: "12px 16px",
          borderRadius: "12px",
          fontWeight: 600,
        },
        success: {
          duration: 3000,
        },
      }}/>
    </ThemeContextProvider>
  </StrictMode>
)

