// Components
import Footer from "../components/Footer";
import Header from "../components/Header";

const Blog = () => {
  return (
    <>
      <Header />
      <div className="blog">
        <div className="container">
          <h2 className="blog-heading">Turizm Məlumatları</h2>
          <p className="blog-subheading">
            Səyahət məqalələri, tövsiyələr, tədbirlər və xəbərlər.
          </p>

          <div className="blog-posts">
            <div className="blog-post">
              <img
                src="https://via.placeholder.com/400x250"
                alt="Bakıda Səyahət"
                className="blog-image"
              />
              <div className="blog-content">
                <h3 className="blog-title">Bakıda Səyahət Üçün Tövsiyələr</h3>
                <p className="blog-excerpt">
                  Bakının ən gözəl yerlərini kəşf edin və unudulmaz təcrübələr
                  yaşayın.
                </p>
                <a href="#" className="blog-link">
                  Ətraflı Oxu
                </a>
              </div>
            </div>
            <div className="blog-post">
              <img
                src="https://via.placeholder.com/400x250"
                alt="Qəbələdə Təbiət"
                className="blog-image"
              />
              <div className="blog-content">
                <h3 className="blog-title">Qəbələdə Təbiət Möcüzələri</h3>
                <p className="blog-excerpt">
                  Qəbələnin təbiət gözəlliklərini kəşf edin və rahatlıqla
                  istirahət edin.
                </p>
                <a href="#" className="blog-link">
                  Ətraflı Oxu
                </a>
              </div>
            </div>
            <div className="blog-post">
              <img
                src="https://via.placeholder.com/400x250"
                alt="Şəki Xan Sarayı"
                className="blog-image"
              />
              <div className="blog-content">
                <h3 className="blog-title">Şəki Xan Sarayı: Tarixi Abidə</h3>
                <p className="blog-excerpt">
                  Şəki Xan Sarayının tarixi və memarlıq gözəlliyi haqqında
                  ətraflı məlumat.
                </p>
                <a href="/blog-detail" className="blog-link">
                  Ətraflı Oxu
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
