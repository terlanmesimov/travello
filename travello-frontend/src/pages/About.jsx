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
              səyahət planları təqdim edirik.
            </p>
          </div>

          <div className="about-mission-vision">
            <div className="mission">
              <h2 className="mission-heading">Missiyamız</h2>
              <p className="mission-text">
                Azərbaycanın turizm potensialını dünyaya tanıtmaq və
                səyahətsevərlərə unudulmaz təcrübələr yaşatmaq.
              </p>
            </div>
            <div className="vision">
              <h2 className="vision-heading">Vizyonumuz</h2>
              <p className="vision-text">
                Azərbaycanı regionun ən populyar turizm mərkəzinə çevirmək.
              </p>
            </div>
          </div>

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
                +994 12 345 67 89
              </li>
              <li className="contact-item">
                <svg
                  className="contact-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                </svg>
                info@travello.az
              </li>
              <li className="contact-item">
                <svg
                  className="contact-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                </svg>
                Bakı, Azərbaycan
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
