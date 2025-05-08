import Footer from "../components/Footer";
import Header from "../components/Header";

const About = () => {
  return (
    <>
      <Header />
      <div className="about">
        <div className="container">
          <h1 className="about-heading">Haqqımızda</h1>

          <div className="about-content">
            <p className="about-text">
              Travello, Azərbaycanın görməli yerlərini kəşf etmək və
              səyahətinizi unudulmaz etmək üçün yaradılmış bir platformadır. Biz
              sizə ölkəmizin ən gözəl məkanları haqqında məlumat, tövsiyələr və
              səyahət planları təqdim edirik. 2020-ci ildən bəri minlərlə 
              səyahətsevərə dəstək göstərərək, Azərbaycanın turizm potensialını 
              dünyada tanıtmağa çalışırıq.
            </p>
          </div>

          <div className="about-mission-vision">
            <div className="mission">
              <h2 className="mission-heading">Missiyamız</h2>
              <p className="mission-text">
                Azərbaycanın turizm potensialını dünyaya tanıtmaq və
                səyahətsevərlərə unudulmaz təcrübələr yaşatmaq. Hər bir səyahətçinin 
                tələblərini qarşılayacaq məzmun və xidmətlər təqdim edərək, 
                səyahət planlaşdırmağı daha asan və əyləncəli etmək.
              </p>
            </div>
            <div className="vision">
              <h2 className="vision-heading">Vizyonumuz</h2>
              <p className="vision-text">
                Azərbaycanı regionun ən populyar turizm mərkəzinə çevirmək və 
                Travello'nu səyahətsevərlərin ilk seçimi etmək. Yenilikçi texnologiyalar və 
                istifadəçi mərkəzli xidmətlərlə fərqlənərək, səyahət sektorunda 
                qabaqcıl platforma olmaq.
              </p>
            </div>
          </div>

          {/* Xidmətlərimiz bölməsi */}
          <section className="about-services">
            <h2 className="services-heading">Xidmətlərimiz</h2>
            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon">🗺️</div>
                <h3 className="service-title">Məkan Kəşfi</h3>
                <p className="service-description">Azərbaycanın ən gözəl və nadir məkanlarını kəşf edin, ətraflı məlumat və ziyarətçi rəylərini oxuyun.</p>
              </div>
              
              <div className="service-card">
                <div className="service-icon">📸</div>
                <h3 className="service-title">Fotogalereya</h3>
                <p className="service-description">Hər bir məkan üçün yüksək keyfiyyətli şəkillər və 360° görüntülərlə virtual səyahət imkanı.</p>
              </div>
              
              <div className="service-card">
                <div className="service-icon">📱</div>
                <h3 className="service-title">Mobil Əlçatanlıq</h3>
                <p className="service-description">Oflayn xəritələr və məlumatlar ilə istənilən yerdə, hətta internet olmadan belə məlumat əldə edin.</p>
              </div>
              
              <div className="service-card">
                <div className="service-icon">📝</div>
                <h3 className="service-title">Səyahət Bloqu</h3>
                <p className="service-description">Ekspertlərimizin hazırladığı məsləhətlər, bələdçilər və səyahət təcrübələri ilə tanış olun.</p>
              </div>
            </div>
          </section>

          {/* Komanda bölməsi */}
          <section className="about-team">
            <h2 className="team-heading">Komandamız</h2>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-photo"></div>
                <h3 className="member-name">Əli Məmmədov</h3>
                <p className="member-position">Təsisçi & CEO</p>
                <p className="member-bio">10+ il turizm sahəsində təcrübə. Səyahət həvəskarı və fotoqraf.</p>
              </div>
              
              <div className="team-member">
                <div className="member-photo"></div>
                <h3 className="member-name">Leyla Əliyeva</h3>
                <p className="member-position">Məzmun Meneceri</p>
                <p className="member-bio">Səyahət yazıçısı və bloger. 30+ ölkəyə səyahət etmişdir.</p>
              </div>
              
              <div className="team-member">
                <div className="member-photo"></div>
                <h3 className="member-name">Orxan Hüseynli</h3>
                <p className="member-position">Texnologiya Direktoru</p>
                <p className="member-bio">Texnologiya həvəskarı və proqramçı. İstifadəçi təcrübəsi mütəxəssisi.</p>
              </div>
              
              <div className="team-member">
                <div className="member-photo"></div>
                <h3 className="member-name">Aygün Kazımova</h3>
                <p className="member-position">Müştəri Əlaqələri</p>
                <p className="member-bio">İstifadəçilərimizdən gələn hər sualı həll etməyi sevir.</p>
              </div>
            </div>
          </section>

          {/* Nailiyyətlərimiz */}
          <section className="about-achievements">
            <h2 className="achievements-heading">Nailiyyətlərimiz</h2>
            <div className="achievements-grid">
              <div className="achievement-card">
                <div className="achievement-number">10K+</div>
                <p className="achievement-text">Aktiv İstifadəçi</p>
              </div>
              
              <div className="achievement-card">
                <div className="achievement-number">500+</div>
                <p className="achievement-text">Məkan Kataloqu</p>
              </div>
              
              <div className="achievement-card">
                <div className="achievement-number">2000+</div>
                <p className="achievement-text">Müsbət Rəy</p>
              </div>
              
              <div className="achievement-card">
                <div className="achievement-number">50+</div>
                <p className="achievement-text">Tərəfdaşlıq</p>
              </div>
            </div>
          </section>

          <div className="about-contact">
            <h2 className="contact-heading">Əlaqə</h2>
            <ul className="contact-list">
              <li className="contact-item">
                <svg
                  className="contact-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
                <div className="contact-info">
                  <a href="tel:+994123456789">+994 12 345 67 89</a>
                </div>
              </li>
              <li className="contact-item">
                <svg
                  className="contact-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                </svg>
                <div className="contact-info">
                  <a href="mailto:info@travello.az">info@travello.az</a>
                </div>
              </li>
              <li className="contact-item">
                <svg
                  className="contact-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                </svg>
                <div className="contact-info">
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">Bakı, Azərbaycan</a>
                </div>
              </li>
              <li className="contact-item">
                <svg
                  className="contact-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                </svg>
                <div className="contact-info">
                  <div className="social-links">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> | 
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"> Instagram</a> |
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"> Twitter</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
