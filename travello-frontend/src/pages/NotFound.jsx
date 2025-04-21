import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Oops! Səhifə tapılmadı.</h2>
      <p>Axtardığınız səhifə mövcud deyil və ya silinmişdir.</p>
      <Link to="/" className="back-home">
        Ana səhifəyə qayıt
      </Link>
    </div>
  );
};

export default NotFound;

