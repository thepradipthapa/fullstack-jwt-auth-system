import './assets/css/style.css'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import Home from './components/home.jsx'
import Footer from './components/footer.jsx'
import Header from './components/header.jsx'
import { BrowserRouter, Routes, Route } from "react-router";

function App() {

  return (
    <>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App
