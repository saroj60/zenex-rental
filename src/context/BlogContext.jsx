import React, { createContext, useContext, useState, useEffect } from 'react';

const BlogContext = createContext();

export const useBlogContext = () => useContext(BlogContext);

const STATIC_FALLBACK_BLOGS = [
  {
    id: "mustang-jeep-rental-guide",
    title: "Ultimate Guide to Renting a 4x4 Jeep in Nepal for Mustang & Manang",
    coverImage: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070",
    category: "Car Rental Tips",
    content: "Mustang is the crown jewel of Nepal's trans-Himalayan region. The rugged, unpaved off-road conditions require high-clearance, heavy-duty 4x4 vehicles. In this guide, we break down self-drive requirements, costs, best seasons (Spring and Autumn), and route details from Kathmandu/Pokhara up to Jomsom and Muktinath. We highly recommend booking our seasoned drivers who are well-versed in navigating treacherous landslide zones and local terrain hazards.",
    author: "Zenex Travel Experts",
    date: "2026-08-10T12:00:00.000Z"
  },
  {
    id: "ebc-packing-list",
    title: "Everest Base Camp Trek Packing List: Essential Gear Checklist",
    coverImage: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2076",
    category: "Trekking Guides",
    content: "Packing right for Everest Base Camp is the difference between a successful summit hike and an early flight back. From proper thermal layers to worn-in trekking boots, hydration systems, and acute mountain sickness (AMS) medication, we compile the complete packing guide. Note that Lukla flights have a strict weight limit of 15kg (10kg main duffel + 5kg hand bag), so packing light and smart is critical.",
    author: "Guide Pasang Sherpa",
    date: "2026-08-12T12:00:00.000Z"
  },
  {
    id: "pokhara-adventure-guide",
    title: "Top 7 Adventure Activities to Experience in Pokhara",
    coverImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2074",
    category: "Activity Highlights",
    content: "Pokhara is the adventure capital of Nepal. From paragliding over Phewa lake from Sarangkot hill to zip-lining, ultra-light flights, mountain biking, and white-water rafting, there's an adventure for everyone. Read about our recommended operators, pricing guides, safety tips, and when to catch the clearest mountain views of Mt. Fishtail and the Annapurnas.",
    author: "Tourism Editor Milan",
    date: "2026-08-14T12:00:00.000Z"
  }
];

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState(STATIC_FALLBACK_BLOGS);

  // Fetch blogs from backend on mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setBlogs(data);
          } else {
            setBlogs(STATIC_FALLBACK_BLOGS);
          }
        } else {
          setBlogs(STATIC_FALLBACK_BLOGS);
        }
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
        setBlogs(STATIC_FALLBACK_BLOGS);
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
