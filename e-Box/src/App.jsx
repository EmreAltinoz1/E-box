import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { verifyToken } from './store/userSlice';
import { fetchRoles } from './redux/actions/clientActions';
import HomePage from "./pages/HomePage";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import PageContent from "./layout/PageContent";
import SignUp from "./pages/SignUp";
import LoginForm from "./pages/LoginForm";
// import Navbar from "./components/Navbar";

function App() {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // LocalStorage'da token varsa verify et
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(verifyToken());
    }
    
    // Roles'ları fetch et
    console.log("Fetching roles...");
    dispatch(fetchRoles());
  }, [dispatch]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* <Navbar /> */}
      <Header toggleMenu={toggleMenu} />
      <PageContent>
        <Routes>
          <Route path="/" element={<HomePage menuOpen={menuOpen} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginForm />} />
          {/* <Route exact path="/login" element={<LoginPage />} /> */}
        </Routes>
      </PageContent>
      <Footer />
    </>
  );
}

export default App;