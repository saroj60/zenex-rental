import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBlogContext } from '../context/BlogContext';
import { Calendar, User } from 'lucide-react';

const Blogs = () => {
  const { blogs } = useBlogContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fcf9ee] min-h-screen pb-20 pt-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Our Travel Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover stories, tips, and guides from our expert travelers and local guides.</p>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No blogs found</h2>
            <p className="text-gray-500">Check back later for exciting travel stories!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link to={`/blogs/${blog.id}`} key={blog.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col group hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden relative">
                <div className="relative h-64 overflow-hidden">
                  <img src={blog.coverImage || 'https://via.placeholder.com/800'} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  {blog.category && (
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                      {blog.category}
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl text-gray-900 font-bold mb-4 leading-snug line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-500 line-clamp-3 mb-6 flex-1">
                    {blog.content}
                  </p>
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <User size={14} className="text-[#ea580c]" />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-[#ea580c]" />
                      <span>{new Date(blog.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
