import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
    plugins: [react()],
    // Use repo name for project pages. If you later use a custom domain, you can switch this to '/'.
    base: mode === 'production' ? '/lorum.ipsum/' : '/',
}))
