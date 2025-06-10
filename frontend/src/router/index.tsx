import React from 'react'
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Dashboard from '../pages/Dashboard'

const AppRouter: React.FC = () => {


  return (
    <Router>
        <Routes>
            <Route path='/' element={<Dashboard/>}/>
        </Routes>
    </Router>
  )
}

export default AppRouter