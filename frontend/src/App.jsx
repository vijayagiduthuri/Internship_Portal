

import { Route, Routes } from 'react-router-dom'
import Signup from './pages//Signup'
import Login from './pages/Login'
import CompanyRegistration from './pages/CompanyRegistrartion'
import UserProfile from './pages/UserProfile'
import UserHomePage from './pages/UserHomePage';

function App() {
  return (
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/company-registration" element={<CompanyRegistration/>}/>
      <Route path='/UserHomePage' element={<UserHomePage/>}/>
      <Route path="user-profile" element={<UserProfile/>}/>
    </Routes>
  )
}

export default App;
