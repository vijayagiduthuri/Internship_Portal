import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/signup/Signup'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
