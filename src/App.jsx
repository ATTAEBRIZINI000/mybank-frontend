
import '@/App.css'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserHome from '@/pages/user/UserHome';
import UserCategories from '@/pages/user/UserCategories';
import UserNetwork from '@/pages/user/UserNetwork';
import UserProfile from '@/pages/user/UserProfile';
import UserTransactions from '@/pages/user/UserTransactions';
import UserSecurity from './pages/user/UserSecurity';
import ProtectedRoute from './components/security/ProtectedRoutes';

function App() {


  return (
    <Router>
      <Routes>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* user routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<UserHome />} />
          <Route path="/categories" element={<UserCategories />} />
          <Route path="/network" element={<UserNetwork />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/security" element={<UserSecurity />} />
          <Route path="/expenses" element={<UserTransactions />} />
        </Route>
        {/* fallback route */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  )
}

export default App
