import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import LoginPage from './pages/LoginPage';
import UserHomePage from './pages/UserHomePage';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path="/login" element={<LoginPage/>} />
      <Route path='/UserHomePage' element={<UserHomePage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App;
