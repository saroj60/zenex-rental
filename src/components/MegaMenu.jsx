import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { megaMenuData } from '../data/navigationData';

const MegaMenu = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState(megaMenuData.Destinations[0]);

  return (
    <div className="absolute top-full left-0 w-full mt-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0">
      <div className="absolute -top-4 left-0 w-full h-4 bg-transparent"></div>
      
      <div className="flex flex-col md:flex-row h-full">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-1/4 bg-gray-50/50 p-4 border-r border-gray-100 flex flex-col gap-2">
          {megaMenuData.Destinations.map((destination) => (
            <button
              key={destination.country}
              onMouseEnter={() => setActiveTab(destination)}
              onClick={() => setActiveTab(destination)}
              className={`text-left px-6 py-3 rounded-xl text-base font-bold transition-all duration-200 ${
                activeTab.country === destination.country
                  ? 'bg-[#00adef] text-white shadow-md transform translate-x-1'
                  : 'text-gray-600 hover:bg-white hover:text-[#00adef] hover:shadow-sm'
              }`}
            >
              {destination.country}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="w-full md:w-3/4 p-8 min-h-[400px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeTab.categories.map((category) => (
              <div key={category.title} className="flex flex-col">
                <h3 className="text-[#3baf4a] text-lg font-bold mb-4 border-b border-gray-100 pb-2">
                  {category.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {category.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.url}
                        onClick={onClose}
                        className="text-sm font-medium text-gray-600 hover:text-[#00adef] transition-colors flex items-center gap-2 group/link"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover/link:bg-[#00adef] transition-colors"></span>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
