// Components
import Header from "../components/Header";
import Footer from "../components/Footer";

const BlogDetail = () => {
  return (
    <>
      <Header />
      <div className="blog-detail">
        <div className="container">
          <div className="blog-detail">
            <h1 className="blog-detail-title">
              Bakıda Səyahət Üçün Tövsiyələr
            </h1>
            <p className="blog-detail-meta">
              <span className="blog-author">Yazan: Əli Məmmədov</span> |
              <span className="blog-date">10 Oktyabr 2023</span>
            </p>
            <img
              src="https://via.placeholder.com/800x400"
              alt="Bakıda Səyahət"
              className="blog-detail-image"
            />
            <div className="blog-detail-content">
              <p>
                Bakı, Azərbaycanın paytaxtı və ən böyük şəhəridir. Xəzər
                dənizinin sahilində yerləşən bu şəhər, həm tarixi abidələri, həm
                də müasir memarlığı ilə məşhurdur.
              </p>
              <h2>İçərişəhər</h2>
              <p>
                İçərişəhər, Bakının tarixi mərkəzidir. Burada Qız Qalası,
                Şirvanşahlar Sarayı kimi məşhur abidələri ziyarət edə
                bilərsiniz.
              </p>
              <h2>Heydər Əliyev Mərkəzi</h2>
              <p>
                Heydər Əliyev Mərkəzi, müasir memarlığın ən gözəl nümunələrindən
                biridir. Bu mərkəzdə müxtəlif sərgilər və tədbirlər keçirilir.
              </p>
            </div>
          </div>

          <section className="comments-section">
            <div className="container">
              <h2 className="comments-title">Şərhlər (4)</h2>
              <div className="comment-form">
                <textarea
                  className="comment-input"
                  placeholder="Şərhinizi yazın..."
                  rows="4"
                ></textarea>
                <button className="comment-submit">Şərh Göndər</button>
              </div>
              <div className="comment-list">
                <div className="comment">
                  <div className="comment-author">İstifadəçi Adı</div>
                  <div className="comment-text">Bu məqalə çox faydalıdır!</div>
                  <div className="comment-date">12 Oktyabr 2023</div>
                </div>
                <div className="comment">
                  <div className="comment-author">Başqa İstifadəçi</div>
                  <div className="comment-text">
                    Təşəkkürlər, çox maraqlı idi.
                  </div>
                  <div className="comment-date">13 Oktyabr 2023</div>
                </div>
              </div>
            </div>
          </section>

          <div className="related-posts">
            <h2 className="related-posts-title">Əlaqəli Məqalələr</h2>
            <div className="related-posts-grid">
              <div className="related-post">
                <img
                  src="https://via.placeholder.com/300x200"
                  alt="Qəbələdə Təbiət"
                  className="related-post-image"
                />
                <h3 className="related-post-title">
                  Qəbələdə Təbiət Möcüzələri
                </h3>
                <a href="#" className="related-post-link">
                  Ətraflı Oxu
                </a>
              </div>
              <div className="related-post">
                <img
                  src="https://via.placeholder.com/300x200"
                  alt="Şəki Xan Sarayı"
                  className="related-post-image"
                />
                <h3 className="related-post-title">
                  Şəki Xan Sarayı: Tarixi Abidə
                </h3>
                <a href="#" className="related-post-link">
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

export default BlogDetail;
