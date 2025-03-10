import { useState } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink for routing
import { IconPlus, IconLayersOff, IconLogout, IconMenu2, IconX } from "@tabler/icons-react";
import bapaLogoWhite from "../assets/bapalogowhite.svg"; // Adjust path if necessary

const menuItems = [
  { label: "Create New Course", icon: <IconPlus size={18} />, path: "/instructorcreatecourse" },
  { label: "My Courses", icon: <IconLayersOff size={18} />, path: "/my-courses" },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Sidebar open/close state

  return (
    <div>
      {/* Burger Menu for Mobile */}
      <button
        className="md:hidden p-2 text-white bg-gray-900 fixed top-4 left-4 z-50 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-[260px] bg-gray-900 text-white p-4 flex flex-col transition-transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative`}
      >
        {/* Logo Section */}
        <div className="flex justify-center items-center mb-6">
          <img src={bapaLogoWhite} alt="BAPA Logo" className="h-12" />
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path} // Navigate to the corresponding path
              className={({ isActive }) =>
                `flex items-center gap-3 w-full px-4 py-3 rounded-md transition ${
                  isActive ? "bg-orange-500 text-white" : "text-gray-400 hover:bg-orange-500 hover:text-white"
                }`
              }
              onClick={() => setIsOpen(false)} // Close menu on mobile
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Sign Out Button */}
        <NavLink
          to="/logout"
          className="flex items-center gap-3 text-gray-500 w-full px-4 py-3 rounded-md hover:bg-orange-500 hover:text-white transition mt-auto"
        >
          <IconLogout size={18} />
          Sign-out
        </NavLink>
      </div>

      {/* Overlay for mobile when menu is open */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 md:hidden" onClick={() => setIsOpen(false)} />}
    </div>
  );
};
