import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useBlogContext } from '../context/BlogContext';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { blogs } = useBlogContext();

  const blog = blogs.find((b) => b.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#ebf3fa]">
        <div className="text-center bg-white p-12 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Blog not found</h2>
          <p className="text-gray-500 mb-8">The blog post you are looking for does not exist or has been removed.</p>
          <Link to="/blogs" className="px-6 py-3 bg-[#e53a24] text-white rounded-xl font-medium hover:bg-[#e53a24]/90 transition-colors">
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#ebf3fa] min-h-screen pb-20 pt-24 md:pt-32">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <button onClick={() => navigate('/blogs')} className="flex items-center gap-2 text-gray-600 hover:text-[#e53a24] transition-colors mb-8 font-medium">
          <ArrowLeft size={20} /> Back to all blogs
        </button>

        <article className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {blog.coverImage && (
            <div className="w-full h-64 md:h-96 relative">
              <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              {blog.category && (
                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                  <Tag size={14} /> {blog.category}
                </div>
              )}
            </div>
          )}

          <div className="p-6 md:p-12">
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-10 pb-8 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[#e53a24]">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Written by</p>
                  <p className="font-medium text-gray-900">{blog.author}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Published on</p>
                  <p className="font-medium text-gray-900">{new Date(blog.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>
            </div>

            <div 
              className="prose prose-lg max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;
