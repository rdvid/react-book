import './styles.css'
import Login from './@pages/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './@pages/Home'
import Page404 from './@pages/Page404'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />}> 
          <Route path='/' element={<Home />}/>
          <Route path='/home' element={<Home />}/>
        </Route>
        <Route path='*' element={<Page404 />}></Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
