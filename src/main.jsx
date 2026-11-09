import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import App from './App.jsx'

const updateSW = registerSW({
  onNeedRefresh() {
    if (
      window.confirm(
        'Versi baru Jurnal Tahfidz Digital tersedia. Muat ulang aplikasi sekarang?',
      )
    ) {
      void updateSW(true)
    }
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
