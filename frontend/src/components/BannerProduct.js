import React from 'react';
import { Link } from 'react-router-dom';

import img1 from '../assest/banner/7862886.jpg';
import img2 from '../assest/banner/headphone.webp';
import img3 from '../assest/banner/10226827.jpg';
import img4 from '../assest/banner/20866.jpg';
import img5 from '../assest/banner/img5.webp';


const banners = [
  {
    img: img1,
    text: '🔥 New Launches',
    subtext: 'Discover the latest arrivals',
    link: '/search?q=launches',
    colSpan: 'md:col-span-2',
  },
  {
    img: img2,
    text: '⚡ Mega Deals',
    subtext: 'Limited-time discounts!',
    link: '/search?q=deals',
  },
  {
    img: img3,
    text: '📱 Mobiles',
    subtext: 'Best-selling smartphones',
    link: '/search?q=mobiles',
  },
  {
    img: img4,
    text: '🎧 Accessories',
    subtext: 'Upgrade your setup',
    link: '/search?q=accessories',
  },
  {
    img: img5,
    text: '⌚ Smartwatches',
    subtext: 'Smart & stylish',
    link: '/search?q=smartwatch',
  },
];

const BannerProductGrid = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {banners.map((item, index) => (
          <Link
            to={item.link}
            key={index}
            className={`relative group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 ease-in-out ${item.colSpan || ''}`}
          >
            {/* Background Image */}
            <img
              src={item.img}
              alt={item.text}
              className="w-full h-40 md:h-56 object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent group-hover:backdrop-blur-sm transition duration-500" />

            {/* Text Content */}
            <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-500">
              <h3 className="text-lg md:text-xl font-bold">{item.text}</h3>
              <p className="text-sm md:text-base text-gray-200">{item.subtext}</p>
            </div>

            {/* Fade border ring on hover */}
            <div className="absolute inset-0 rounded-xl ring-2 ring-transparent group-hover:ring-[#38a3a5] transition-all duration-300" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BannerProductGrid;
