import './styles.css'
import Login from './@pages/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './@pages/Home'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App
