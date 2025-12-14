/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-[#0F3D2E] to-[#064E3B] text-white pt-16 pb-8 mt-auto border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex flex-col gap-1 mb-4">
              <span className="font-bold text-xl tracking-tight leading-none">
                CGIAR
              </span>
              <span className="text-[10px] font-bold tracking-wide text-[#6AC290] leading-tight">
                MULTIFUNCTIONAL
                <br />
                LANDSCAPES
              </span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Science for a food-secure future. Transforming land, water, and
              food systems for a sustainable tomorrow.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-[#6AC290] mb-4 uppercase text-xs tracking-widest">
              Explore
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a
                  href="#"
                  className="hover:text-[#6AC290] transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-[#6AC290] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#6AC290] transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-[#6AC290] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Where We Work
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#6AC290] transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-[#6AC290] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Innovations
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#6AC290] transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-[#6AC290] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Impact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-[#6AC290] mb-4 uppercase text-xs tracking-widest">
              Resources
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a
                  href="#"
                  className="hover:text-[#6AC290] transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-[#6AC290] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Publications
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#6AC290] transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-[#6AC290] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Data & Tools
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#6AC290] transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-[#6AC290] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  News
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#6AC290] transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-[#6AC290] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Events
                </a>
              </li>
            </ul>
          </div>

          {/* Contact / Social */}
          <div>
            <h4 className="font-semibold text-[#6AC290] mb-4 uppercase text-xs tracking-widest">
              Connect
            </h4>
            <p className="text-sm text-gray-300 mb-4">
              Stay updated with our latest research and innovations.
            </p>
            <div className="flex gap-4">
              {/* Twitter Icon */}
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-[#6AC290] hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              {/* LinkedIn Icon */}
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-[#6AC290] hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <div>
            &copy; {new Date().getFullYear()} CGIAR System Organization.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Use
            </a>
            <a href="#" className="hover:text-white">
              Cookie Notice
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
