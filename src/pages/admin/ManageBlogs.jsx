import React from 'react';
import { Link } from 'react-router-dom';
import { useBlogContext } from '../../context/BlogContext';
import { Trash2, Edit3, Eye } from 'lucide-react';

const ManageBlogs = () => {
  const { blogs, deleteBlog } = useBlogContext();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      deleteBlog(id);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Blogs</h1>
          <p className="text-gray-500 mt-1">View, edit, or remove published blog posts.</p>
        </div>
        <Link to="/dashboard/add-blog" className="px-5 py-2.5 bg-[#ea580c] text-white rounded-xl font-medium hover:bg-[#ea580c]/90 transition-colors">
          + Add New Blog
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-4 px-4 font-semibold text-gray-600">Blog Title</th>
              <th className="py-4 px-4 font-semibold text-gray-600">Category</th>
              <th className="py-4 px-4 font-semibold text-gray-600">Date</th>
              <th className="py-4 px-4 font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-8 text-center text-gray-500">
                  No blogs found. Start by creating a new one!
                </td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr key={blog.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img src={blog.coverImage || 'https://via.placeholder.com/150'} alt="cover" className="w-12 h-12 rounded-lg object-cover" />
                      <span className="font-medium text-gray-900 line-clamp-1">{blog.title}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{blog.category}</td>
                  <td className="py-4 px-4 text-gray-500 text-sm">
                    {new Date(blog.date).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/blogs/${blog.id}`} target="_blank" className="p-2 text-gray-400 hover:text-blue-500 transition-colors" title="View">
                        <Eye size={18} />
                      </Link>
                      <button className="p-2 text-gray-400 hover:text-green-500 transition-colors" title="Edit">
                        <Edit3 size={18} />
                      </button>
                      <button onClick={() => handleDelete(blog.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBlogs;
