import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, Car, MapPin, Package, Mountain, CalendarCheck, Settings, LogOut, Menu, UserCircle, X, Users, FileText, Image as ImageIcon, Layers } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navLinks = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard, exact: true },
    { name: 'Fleet Management', path: '/dashboard/fleet', icon: Car },
    { name: 'Drivers', path: '/dashboard/drivers', icon: Users },
    { name: 'Destinations', path: '/dashboard/destinations', icon: MapPin },
    { name: 'Tours & Treks', path: '/dashboard/tour-trips', icon: Mountain },
    { name: 'Trip Regions', path: '/dashboard/regions', icon: Layers },
    { name: 'Bookings', path: '/dashboard/bookings', icon: CalendarCheck },
    { name: 'Blogs', path: '/dashboard/blogs', icon: FileText },
    { name: 'Gallery', path: '/dashboard/gallery', icon: ImageIcon },
  ];

  return (
    <div className="flex min-h-screen bg-[#F4F6F8] font-body-md text-gray-900">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-64 bg-[#0a2f4c] shadow-2xl flex flex-col fixed inset-y-0 left-0 z-30 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'max-lg:-translate-x-full'}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="flex items-center" onClick={() => setIsSidebarOpen(false)}>
              <img src="/logo.jpg" alt="Zenex Travel Logo" className="h-10 w-auto rounded-2xl object-contain bg-white p-1" />
            </Link>
            <button className="lg:hidden text-white" onClick={() => setIsSidebarOpen(false)}>
              <X size={24} />
            </button>
          </div>
          
          <div className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-4 px-3">Admin Portal</div>
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <NavLink 
                key={link.name}
                to={link.path}
                end={link.exact}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${
                    isActive 
                      ? 'bg-[#1e3a8a] text-white shadow-inner border border-blue-800' 
                      : 'text-blue-200 hover:bg-blue-900/50 hover:text-white'
                  }`
                }
              >
                <link.icon size={18} />
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t border-white/10">
          <button className="flex items-center gap-3 px-3 py-2.5 w-full text-left text-blue-200 hover:bg-blue-900/50 hover:text-white rounded-xl font-medium transition-colors mb-2">
            <Settings size={18} /> Settings
          </button>
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 w-full text-left text-red-300 hover:bg-red-500/20 hover:text-red-200 rounded-xl font-medium transition-colors">
            <LogOut size={18} /> Secure Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:ml-64 w-full">
        
        {/* Topbar */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-10 w-full">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-gray-500 hover:text-[#1e3a8a]" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-bold text-gray-800 hidden sm:block">Control Panel</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-900">{user?.name || 'Admin'}</p>
              <p className="text-xs text-gray-500 font-medium">{user?.email || 'admin@zenextravel.com'}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center shadow-md">
              <UserCircle size={24} />
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 p-4 md:p-8 pb-20 w-full overflow-x-hidden">
          <Outlet />
        </main>
        
      </div>

    </div>
  );
};

export default DashboardLayout;
