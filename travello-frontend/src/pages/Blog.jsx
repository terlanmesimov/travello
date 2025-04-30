// Components
import { useCallback, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import axios from "axios";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  const getBlogs = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_REST_API_URL}/blog/list`
      );
      console.log(response.data);
      setBlogs(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getBlogs();
  }, [getBlogs]);
  return (
    <div className="page-wrapper">
      <Header />
      <div className="blog">
        <div className="container">
          <h2 className="blog-heading">Turizm Məlumatları</h2>
          <p className="blog-subheading">
            Səyahət məqalələri, tövsiyələr, tədbirlər və xəbərlər.
          </p>
          <div className="blog-posts">
            {blogs.map((blog) => (
              <BlogPost
                id={blog.id}
                image={blog.imageBase64}
                name={blog.name}
                description={blog.description}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const BlogPost = ({id, image, name, description}) => {
  return (
    <div key={id} className="blog-post">
      <img
        src={
          image && typeof image === "string" && image.trim() !== ""
            ? image.startsWith("data:")
              ? image
              : `data:image/png;base64,${image}`
            : image
        }
        alt={name}
        className="blog-image"
      />
      <div className="blog-content">
        <h3 className="blog-title">{name}</h3>
        <p className="blog-excerpt">{description}</p>
        <a href={`/blog-detail/${id}`} className="blog-link">
          Ətraflı Oxu
        </a>
      </div>
    </div>
  );
};

export default Blog;
