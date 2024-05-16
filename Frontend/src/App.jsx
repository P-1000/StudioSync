import React from 'react'
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom'
import Login from './pages/Login'
import Profile from './components/temp/Test'
import Temp from './Temp'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Profile/>} />
          <Route path="/login" element={<Login/>} />
        <Route path="/oauth2callback" element={<Temp/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App