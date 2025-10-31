import './assets/css/style.css'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import Home from './components/home.jsx'
import Footer from './components/footer.jsx'
import Header from './components/header.jsx'
import SendPasswordResetLink from './components/SendPasswordResetLink.jsx'
import ResetPassword from './components/ResetPassword.jsx'
import Dashboard from './components/Dashboard.jsx'
import NotFound from './components/NotFound.jsx'
import AuthProvider from './AuthProvider.jsx'
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
 
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<SendPasswordResetLink />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
