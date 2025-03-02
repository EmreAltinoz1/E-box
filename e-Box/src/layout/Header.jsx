// # Sayfa düzeniyle ilgili ana bileşenler (Header, Footer, PageContent)

import { User, Search, ShoppingCart, Menu, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';
import md5 from 'md5';

function Header({ toggleMenu }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  // Gravatar URL oluşturma
  const getGravatarUrl = (email) => {
    const hash = md5(email.toLowerCase().trim());
    return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=200`;
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-sm">
      <h1 
        className="font-montserrat text-[24px] font-bold leading-[32px] tracking-[0.1px] text-[#252B42] cursor-pointer" 
        onClick={() => navigate('/')}
      >
        E-Box
      </h1>

      <div className="flex items-center gap-4 text-gray-600">
        <Search className="text-xl cursor-pointer hover:text-[#23A6F0] transition-colors" />
        <ShoppingCart className="text-xl cursor-pointer hover:text-[#23A6F0] transition-colors" />
        
        {currentUser ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img
                src={getGravatarUrl(currentUser.email)}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full border-2 border-[#23A6F0]"
              />
              <span className="text-sm font-medium text-[#252B42] hidden md:block">
                {currentUser.name}
              </span>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-medium text-[#23A6F0] hover:text-[#1a7ac0] transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:block">Çıkış Yap</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <User 
              className="text-xl cursor-pointer hover:text-[#23A6F0] transition-colors" 
              onClick={handleLoginClick}
            />
            <button
              onClick={handleSignUpClick}
              className="text-sm font-medium text-[#23A6F0] hover:text-[#1a7ac0] transition-colors"
            >
              Sign Up
            </button>
          </div>
        )}

        <div className="lg:hidden">
          <Menu className="text-xl cursor-pointer hover:text-[#23A6F0] transition-colors" onClick={toggleMenu} />
        </div>
      </div>
    </div>
  );
}

export default Header;