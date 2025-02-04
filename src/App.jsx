import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Login from './components/LoginForm';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import EditForm from './components/EditForm';
import Categories from './components/Categories';
import { UserProvider } from './contexts/UserContext';

const AppRoutes = () => (
  <UserProvider>
  <Router>
    <Toaster position='top-center' />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/nosotros" element={<AboutUs />} />
      <Route path="/contacto" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/edit-user/:userId" element={<EditForm />} />
      <Route path="/categories" element={<Categories />} />
    </Routes>
  </Router>
  </UserProvider>
);

export default AppRoutes;
