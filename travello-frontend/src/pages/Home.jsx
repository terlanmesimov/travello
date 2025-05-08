// Components
import Header from "../components/Header";
import Search from "../components/Search";
import Map from "../components/Map";
import PlaceGrid from "../components/PlaceGrid";
import Footer from "../components/Footer";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [resultData, setResultData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchRef = useRef(null);
  const mapRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading to showcase the animation
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="page-wrapper home-page">
      <Header />
      
      <section className="hero-section" ref={searchRef}>
        <div className="hero-content">
          <h1 className="hero-title">Kəşf et, Səyahət et, Xatırla</h1>
          <p className="hero-subtitle">Həyatınızın səyahətini bizimlə planlaşdırın</p>
          <div>
            <Search setResultData={setResultData} />
          </div>
        </div>
        <div className="hero-overlay"></div>
      </section>
      
      <section className="section destinations-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Məkanlar</h2>
            <p className="section-subtitle">Azərbaycanın ən məşhur turizm məkanlarını kəşf edin</p>
          </div>
          
          <PlaceGrid resultData={resultData} isLoading={isLoading} />
        </div>
      </section>
      
      <section className="section map-section" ref={mapRef}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Xəritədə Tapın</h2>
            <p className="section-subtitle">Məkanları xəritədə görün və marşrutunuzu planlaşdırın</p>
          </div>
          
          <div className="map-container">
            <Map />
          </div>
        </div>
      </section>
      
      <section className="section features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Niyə Travello?</h2>
            <p className="section-subtitle">Səyahətlərinizi daha yaxşı edən xidmətlər</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card" onClick={() => scrollToSection(searchRef)}>
              <div className="feature-icon">🔍</div>
              <h3 className="feature-title">Asan Axtarış</h3>
              <p className="feature-description">Minlərlə məkanı bir neçə kliklə tapın</p>
            </div>
            
            <div className="feature-card" onClick={() => scrollToSection(mapRef)}>
              <div className="feature-icon">🗺️</div>
              <h3 className="feature-title">İnteraktiv Xəritə</h3>
              <p className="feature-description">Məkanları xəritədə görün və idarə edin</p>
            </div>
            
            <div className="feature-card" onClick={() => navigate('/favorites')}>
              <div className="feature-icon">❤️</div>
              <h3 className="feature-title">Sevimlilər</h3>
              <p className="feature-description">Sevimli məkanlarınızı saxlayın və asanlıqla baxın</p>
            </div>
            
            <div className="feature-card" onClick={() => navigate('/blog')}>
              <div className="feature-icon">📝</div>
              <h3 className="feature-title">Səyahət Bloqu</h3>
              <p className="feature-description">Səyahət məsləhətləri və ilham verici məqalələr</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;
