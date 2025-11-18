
import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Login from './components/Login'
import Protected from './components/Protected'


const Root = () => {
  const token = localStorage.getItem('token')
  return token ? <Navigate to="/protected" /> : <Navigate to="/login" />
}

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/login" element={<Login />} />
      <Route path="/protected" element={<Protected />} />
      <Route path="*" element={<Navigate to="/" />} /> {/* Redirige todo lo demás */}
    </Routes>
  </Router>
)

export default App