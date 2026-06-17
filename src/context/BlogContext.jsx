import React, { createContext, useContext, useState, useEffect } from 'react';

const BlogContext = createContext();

export const useBlogContext = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

  // Load from local storage on mount
  useEffect(() => {
    const storedBlogs = localStorage.getItem('app_blogs');
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    } else {
      // Seed with some initial data if empty
      const initialBlogs = [
        {
          id: '1',
          title: 'Top 5 Treks in the Annapurna Region',
          coverImage: 'https://images.unsplash.com/photo-1544735716-87fa59a45b4e?q=80&w=1170&auto=format&fit=crop',
          author: 'Admin',
          date: new Date().toISOString(),
          category: 'Trekking',
          content: 'The Annapurna region is arguably the most popular trekking destination in Nepal. The area offers a huge variety of trekking routes, from short 3-day treks to month-long expeditions. Along the trails, you will find comfortable teahouses, warm hospitality, and some of the most breathtaking mountain views on the planet.\n\n### 1. Annapurna Base Camp Trek\nThis is a classic trek that takes you right into the heart of the Annapurna sanctuary. You will walk through rhododendron forests, terraced fields, and traditional Gurung villages before arriving at the base camp, surrounded by towering peaks.\n\n### 2. Annapurna Circuit\nThe Annapurna Circuit is legendary among trekkers. It circles the entire Annapurna massif and crosses the Thorong La Pass at an elevation of 5,416m. The landscape changes dramatically from lush green valleys to arid, high-altitude deserts.\n\n### 3. Ghorepani Poon Hill Trek\nIf you are short on time but still want incredible views, the Poon Hill trek is perfect. It is a relatively easy 4-5 day trek that offers one of the best sunrise views of the Annapurna and Dhaulagiri ranges.\n\n### 4. Mardi Himal Trek\nThis is a hidden gem in the Annapurna region. The trail takes you along a ridge with spectacular views of Machhapuchhre (Fishtail) and Annapurna South. It is less crowded than the main trails, offering a more peaceful experience.\n\n### 5. Nar Phu Valley Trek\nFor those looking for an off-the-beaten-path adventure, the Nar Phu Valley trek explores remote Tibetan villages and high passes. It is a culturally rich trek that feels like stepping back in time.'
        }
      ];
      setBlogs(initialBlogs);
      localStorage.setItem('app_blogs', JSON.stringify(initialBlogs));
    }
  }, []);

  // Save to local storage whenever blogs change
  useEffect(() => {
    if (blogs.length > 0) {
      localStorage.setItem('app_blogs', JSON.stringify(blogs));
    }
  }, [blogs]);

  const addBlog = (blogData) => {
    const newBlog = {
      ...blogData,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      author: 'Admin'
    };
    setBlogs((prev) => [newBlog, ...prev]);
  };

  const updateBlog = (id, updatedData) => {
    setBlogs((prev) => prev.map((blog) => (blog.id === id ? { ...blog, ...updatedData } : blog)));
  };

  const deleteBlog = (id) => {
    setBlogs((prev) => prev.filter((blog) => blog.id !== id));
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog, updateBlog, deleteBlog }}>
      {children}
    </BlogContext.Provider>
  );
};
