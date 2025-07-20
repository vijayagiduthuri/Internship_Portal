import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/signup/Signup'
import LoginPage from './pages/AuthPages/LoginPage';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;
