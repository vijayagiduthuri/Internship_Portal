

import { Route, Routes } from 'react-router-dom'
import Signup from './pages//Signup'
import Login from './pages/Login'
import CompanyRegistration from './pages/CompanyRegistrartion'
import UserProfile from './pages/UserProfile'
import UserDashboard from './pages/UserDashboard'
import ForgotPassword from './pages/ForgotPassword'
import UserHomePage from './pages/UserHomePage';
import InternshipApplicationForm from './pages/ApplyInternship'
import AdminPanel from './pages/AdminPanel/AdminPanel'


function App() {
  return (
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/company-registration" element={<CompanyRegistration/>}/>
      <Route path="/user-profile" element={<UserProfile/>}/>
      <Route path="/user-dashboard" element={<UserDashboard/>}/>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path='/UserHomePage' element={<UserHomePage/>}/>
      <Route path='/apply-internship' element={<InternshipApplicationForm/>}/>
      <Route path='/admin/*' element={<AdminPanel/>}/>
    </Routes>
  )
}

export default App;
