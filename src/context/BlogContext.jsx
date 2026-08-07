import React, { createContext, useContext, useState, useEffect } from 'react';

const BlogContext = createContext();

export const useBlogContext = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

  // Fetch blogs from backend on mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs');
        if (res.ok) {
          const data = await res.json();
          setBlogs(data);
        }
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  const addBlog = async (blogData) => {
    try {
      let body = blogData;
      let headers = { 'Content-Type': 'application/json' };
      if (blogData instanceof FormData) {
        body = blogData;
        headers = {};
      } else {
        body = JSON.stringify(blogData);
      }
      const res = await fetch('/api/blogs', { method: 'POST', headers, body });
      const newB = await res.json();
      setBlogs((prev) => [newB, ...prev]);
      return newB;
    } catch (error) {
      console.error('Failed to add blog:', error);
      throw error;
    }
  };

  const updateBlog = async (id, updatedData) => {
    try {
      let body = updatedData;
      let headers = { 'Content-Type': 'application/json' };
      if (updatedData instanceof FormData) {
        body = updatedData;
        headers = {};
      } else {
        body = JSON.stringify(updatedData);
      }
      const res = await fetch(`/api/blogs/${id}`, { method: 'PUT', headers, body });
      const updatedB = await res.json();
      setBlogs((prev) => prev.map((blog) => (blog.id === id ? updatedB : blog)));
      return updatedB;
    } catch (error) {
      console.error('Failed to update blog:', error);
      throw error;
    }
  };

  const deleteBlog = async (id) => {
    try {
      await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error('Failed to delete blog:', error);
      throw error;
    }
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog, updateBlog, deleteBlog }}>
      {children}
    </BlogContext.Provider>
  );
};
