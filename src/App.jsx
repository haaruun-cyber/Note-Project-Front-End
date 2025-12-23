import React from 'react'
import Navbar from './Components/Navbar'
import './App.css'
import Home from './Pages/Home'
import { Route, Router, Routes } from 'react-router-dom'
import Addnote from './Pages/Addnote'
import Editnote from './Pages/Editnote'
const App = () => {
  return (
    <>
    <Navbar/>

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/addnote" element={<Addnote/>}/>
      <Route path="/editnote/:id" element={<Editnote/>}/>
    </Routes>
    </>
  )
}

export default App