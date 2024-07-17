import React, { useState } from 'react'
import Header from './components/Header/Header'
import { Provider } from 'react-redux'
import Habitsform from './components/Habitsform'
import store from  "./store/store"
import SignUp from './components/SignUp'
import { Footer, Login } from './components'
import { Outlet } from 'react-router-dom'

function App() {

  const habit = {name: "Habit Name", goal: 21, importance: "Habit Importance", hrsday: 12}
  
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default App
