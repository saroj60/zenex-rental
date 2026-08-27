import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBlogContext } from '../context/BlogContext';

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

const LatestBlogs = () => {
  const { blogs } = useBlogContext();
  
  // Use loaded blogs, fallback if empty
  const displayBlogs = (blogs && blogs.length > 0) ? blogs.slice(0, 3) : STATIC_FALLBACK_BLOGS;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 20 } }
  };

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="py-20 px-4 md:px-8 bg-white border-t border-slate-100"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#e53a24]/10 text-[#e53a24] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-3">
              <Sparkles size={12} fill="currentColor" />
              <span>Travel Guides & Stories</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#0f3493] leading-none tracking-tight">
              Latest from Our Blog
            </h2>
            <p className="text-slate-500 font-medium mt-3">
              Discover local secrets, travel recommendations, and expert guides from the field.
            </p>
          </div>
          
          <Link 
            to="/blogs" 
            className="flex items-center gap-2 text-[#e53a24] font-black hover:text-[#d04b08] transition-colors group shrink-0 text-sm md:text-base"
          >
            Explore All Articles 
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Blog Post Grid */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayBlogs.map((blog) => (
            <motion.div variants={itemVariants} key={blog.id} className="flex">
              <Link 
                to={`/blogs/${blog.id}`} 
                className="w-full bg-white rounded-3xl border border-slate-100 flex flex-col group hover:shadow-2xl hover:shadow-slate-200/60 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
              >
                {/* Cover Image */}
                <div className="relative h-56 md:h-60 overflow-hidden bg-slate-50 shrink-0">
                  <img 
                    src={blog.coverImage || 'https://images.unsplash.com/photo-1544735716-87fa59a45b4e?q=80&w=800'} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1544735716-87fa59a45b4e?q=80&w=800'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  {blog.category && (
                    <span className="absolute top-4 right-4 bg-[#0f3493] text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md z-10">
                      {blog.category}
                    </span>
                  )}
                </div>

                {/* Text Info */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-slate-800 group-hover:text-[#e53a24] transition-colors leading-snug mb-3 line-clamp-2">
                    {blog.title}
                  </h3>
                  
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow font-medium font-body-md">
                    {blog.content}
                  </p>

                  {/* Footer Metadata */}
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50 text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <User size={13} className="text-[#e53a24]" />
                      <span className="truncate max-w-[120px]">{blog.author || "Zenex Team"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-[#e53a24]" />
                      <span>
                        {blog.date 
                          ? new Date(blog.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) 
                          : "Aug 2026"}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
};

export default LatestBlogs;
