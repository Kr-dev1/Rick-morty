// Import necessary styles and components
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Root from './pages/Characters'
import Profile from './pages/Profile'

/**
 * Main App component that sets up the routing configuration
 * Uses React Router for navigation between different pages
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the main characters listing page */}
        <Route path="/" element={<Root />} />
        {/* Route for individual character profile pages */}
        <Route path="/character/:id" element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App
