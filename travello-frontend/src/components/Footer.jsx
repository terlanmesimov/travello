import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-columns">
            <div className="footer-column">
              <div className="footer-logo">
                <span className="logo-text">Travello</span>
                <span className="logo-icon">✈️</span>
              </div>
              <p className="footer-description">
                Azərbaycanın və dünyanın görməli yerlərini kəşf edin. 
                Mükəmməl səyahət təcrübəsi üçün ehtiyacınız olan hər şey burada.
              </p>
              <div className="social-links">
                <a href="#" className="social-link">
                  <i className="social-icon facebook"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="social-icon instagram"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="social-icon twitter"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="social-icon youtube"></i>
                </a>
              </div>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-title">Kəşf et</h3>
              <ul className="footer-links">
                <li><a href="/">Ana Səhifə</a></li>
                <li><a href="/blog">Bloq</a></li>
                <li><a href="/about">Haqqımızda</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-title">Əlaqə</h3>
              <ul className="contact-list">
                <li className="contact-item">
                  <i className="contact-icon phone-icon"></i>
                  <span>+994 12 345 67 89</span>
                </li>
                <li className="contact-item">
                  <i className="contact-icon email-icon"></i>
                  <span>info@travello.az</span>
                </li>
                <li className="contact-item">
                  <i className="contact-icon location-icon"></i>
                  <span>Bakı, Azərbaycan</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">
            © {new Date().getFullYear()} Travello. Bütün hüquqlar qorunur.
          </p>
          <div className="footer-nav">
            <a href="#">Təhlükəsizlik</a>
            <a href="#">Məxfilik</a>
            <a href="#">Şərtlər</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
