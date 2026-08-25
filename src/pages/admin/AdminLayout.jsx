import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, PlusCircle, Settings, Car, Users, Mountain, Package, Map as MapIcon, Image as ImageIcon, MessageSquare } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Manage Vehicles', path: '/admin/vehicles', icon: <Car size={20} /> },
    { name: 'Add Vehicle', path: '/admin/add-vehicle', icon: <PlusCircle size={20} /> },
    { name: 'Manage Drivers', path: '/admin/drivers', icon: <Users size={20} /> },
    { name: 'Add Driver', path: '/admin/add-driver', icon: <PlusCircle size={20} /> },
    { name: 'Manage Pro Trips', path: '/admin/tour-trips', icon: <MapIcon size={20} /> },
    { name: 'Add Pro Trip', path: '/admin/add-tour-trip', icon: <PlusCircle size={20} /> },
    { name: 'Manage Gallery', path: '/admin/gallery', icon: <ImageIcon size={20} /> },
    { name: 'Manage Blogs', path: '/admin/blogs', icon: <FileText size={20} /> },
    { name: 'Add New Blog', path: '/admin/add-blog', icon: <PlusCircle size={20} /> },
    { name: 'Manage Treks/Tours', path: '/admin/tour-trips', icon: <Mountain size={20} /> },
    { name: 'Add Trek/Tour', path: '/admin/add-tour-trip', icon: <PlusCircle size={20} /> },
    { name: 'Manage Packages', path: '/admin/packages', icon: <Package size={20} /> },
    { name: 'Add Package', path: '/admin/add-package', icon: <PlusCircle size={20} /> },
    { name: 'Manage Testimonials', path: '/admin/testimonials', icon: <MessageSquare size={20} /> },
    { name: 'Add Testimonial', path: '/admin/add-testimonial', icon: <PlusCircle size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row pt-20">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 px-2">Admin Panel</h2>
        <nav className="flex flex-col gap-2 flex-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path !== '/admin' && location.pathname.startsWith(link.path));
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-[#e53a24] text-white font-medium' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
              >
                {link.icon}
                {link.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
