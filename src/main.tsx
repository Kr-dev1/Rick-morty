// Import React and necessary dependencies
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

// Initialize React Query client for data fetching and caching
const queryClient = new QueryClient()

// Create root and render the application with React Query provider
createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)
