import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AppLayout from './components/AppLayout'
import About from './pages/About'

const rootEl = document.getElementById('root')!
const root = createRoot(rootEl)

function render() {
  const isAbout = window.location.hash.startsWith('#/about')
  root.render(
    <StrictMode>
      <AppLayout>
        {isAbout ? <About /> : <App />}
      </AppLayout>
    </StrictMode>,
  )
}

window.addEventListener('hashchange', render)
render()
