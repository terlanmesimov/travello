import axios from "axios";
import React, { useEffect, useState } from "react";
import AddBlogModal from "../components/AddBlogModal";
import EditBlogModal from "../components/EditBlogModal";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [places, setPlaces] = useState([]);

  const fetchPlaces = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/place/list`
      );
      const data = response.data;
      setPlaces(data);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/blog/list`
      );
      const data = response.data;
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleClickAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleAddBlog = (newBlog) => {
    setBlogs((prevBlogs) => [...prevBlogs, { ...newBlog, id: Date.now() }]);
  };

  const handleClickEdit = (blog) => {
    setSelectedBlog(blog);
    setIsEditModalOpen(true);
  };

  const handleSaveBlog = (updatedBlog) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    );
  };

  const handleClickDelete = async (blog) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/blog/delete/${blog.id}`
      );
      console.log(response.data);
      setBlogs((prevBlogs) => prevBlogs.filter((b) => b.id !== blog.id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchPlaces();
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="blog-page">
      <AddBlogModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddBlog}
        places={places}
      />
      {selectedBlog && (
        <EditBlogModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveBlog}
          initialData={selectedBlog}
          places={places}
        />
      )}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <button onClick={handleClickAdd} className="add-button">
        Add Blog
      </button>
      <div className="blog-grid">
        {filteredBlogs.map((blog) => (
          <div className="blog-card" key={blog.id}>
            <img
              src={
                blog.imageBase64 &&
                typeof blog.imageBase64 === "string" &&
                blog.imageBase64.trim() !== ""
                  ? blog.imageBase64.startsWith("data:")
                    ? blog.imageBase64
                    : `data:image/png;base64,${blog.imageBase64}`
                  : blog.imageBase64
              }
              alt={blog.name}
              className="blog-image"
            />
            <h3 className="blog-name">{blog.name}</h3>
            <p className="blog-description">{blog.description}</p>
            <div className="blog-actions">
              <button
                onClick={() => handleClickEdit(blog)}
                className="edit-button"
              >
                Edit
              </button>
              <button
                onClick={() => handleClickDelete(blog)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
