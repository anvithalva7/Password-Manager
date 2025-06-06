import React from "react"
import Navbar from "./components/Navbar"
import Major from "./Major"
import Footer from "./components/Footer"
import { ToastContainer } from 'react-toastify';


function App() {

  return (
    <>
      <Navbar />
      <ToastContainer position="bottom-right" autoClose={2000} theme="dark" />
      <Major />
      <Footer />
    </>
  )
}

export default App
