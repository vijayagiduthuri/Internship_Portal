
import { Route, Routes } from 'react-router-dom'
import Signup from './pages//Signup'
import Login from './pages/Login'
import CompanyRegistration from './pages/CompanyRegistrartion'




function App() {
  return (
    
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/companyreg" element={<CompanyRegistration/>}/>
    </Routes>
    
  )
}

export default App;
