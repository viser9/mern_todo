import { useState,useEffect } from 'react'
import SignIn from './components/signIn'
import LogIn from './components/logIn'
import List from './components/list';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn/>}/>
        <Route path="/list" element={<List/>}/>
        <Route path="/login" element={<LogIn/>} />
      </Routes>
    </Router>
  )
}

export default App
