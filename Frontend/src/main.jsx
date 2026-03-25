import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ModeProvider } from './context/ModeContext.jsx'

createRoot(document.getElementById('root')).render(
  <ModeProvider>
    <App/>
  </ModeProvider>
)
