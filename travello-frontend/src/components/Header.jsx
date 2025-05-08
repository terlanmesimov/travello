import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../routes/GlobalProvider";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { hasToken, userData, setHasToken } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    const isConfirmed = window.confirm("Çıxış etmək istədiyinizə əminsiniz ?");
    if (isConfirmed) {
      localStorage.removeItem("token");
      setHasToken(false);
      navigate("/");
    }
  };

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <nav className="nav">
          <a href="/" className="logo">
            <span className="logo-text">Travello</span>
            <span className="logo-icon">✈️</span>
          </a>
          
          <div
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          
          <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
            <a className="nav-link" href="/">
              <i className="nav-icon home-icon"></i>
              Ana Səhifə
            </a>
            <a className="nav-link" href="/blog">
              <i className="nav-icon blog-icon"></i>
              Bloq
            </a>
            <a className="nav-link" href="/about">
              <i className="nav-icon about-icon"></i>
              Haqqımızda
            </a>
            
            <div className="nav-divider"></div>
            
            {!hasToken && (
              <div className="auth-buttons">
                <a className="btn btn-outline" href="/login">
                  Daxil Ol
                </a>
                <a className="btn" href="/register">
                  Qeydiyyat
                </a>
              </div>
            )}
            
            {hasToken && (
              <div className="user-menu">
                <a className="nav-link favorites-link" href="/favorites">
                  <i className="nav-icon favorite-icon"></i>
                  Favoritlər
                </a>
                <div className="user-profile">
                  <div className="user-avatar">
                    {userData.username ? userData.username.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div className="dropdown-menu">
                    <a href="/account">Profilim</a>
                    <a href="/favorites">Favoritlərim</a>
                    <button className="logout-button" onClick={logout}>Çıxış</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header; 