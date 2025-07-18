import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/AuthPages/LoginPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
