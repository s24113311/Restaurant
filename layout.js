
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu, X, Phone, Mail, MapPin, Facebook, Instagram, Twitter, ShoppingCart, Settings, LayoutDashboard, Utensils, Box, Wrench } from "lucide-react"; // Added new icons for AdminLayout
import { CartProvider, useCart } from "@/components/cart/CartContext";
import CartSidebar from "@/components/cart/CartSidebar";

// Public navigation items for the main website
const navigationItems = [
  { name: "Home", url: createPageUrl("Home") },
  { name: "Menu", url: createPageUrl("Menu") },
  { name: "Order Online", url: createPageUrl("OrderOnline") },
  { name: "Locations", url: createPageUrl("Locations") },
  { name: "Contact", url: createPageUrl("Contact") }
];

// AppLayout for public-facing pages, includes cart, header, and footer
function AppLayout({ children }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { itemCount } = useCart(); // useCart is only available inside CartProvider

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  
  return (
    <div className="min-h-screen bg-white flex flex-col"> {/* Added flex flex-col for proper footer pinning */}
      <style>
        {`
          :root {
            --laoban-red: #d32f2f;
            --laoban-gold: #ffa726;
            --laoban-dark-gold: #ff8f00;
            --laoban-light: #fff5f5;
          }
        `}
      </style>

      {/* Navigation Header */}
      <header className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">老</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Laoban</h1>
                <p className="text-sm text-gray-500">老板餐厅</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.url}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    location.pathname === item.url
                      ? "text-white bg-gradient-to-r from-red-600 to-red-700 shadow-lg"
                      : "text-gray-700 hover:text-red-600 hover:bg-red-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <button onClick={toggleCart} className="relative p-2 rounded-full text-gray-700 hover:bg-red-50 hover:text-red-600">
                <ShoppingCart className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
            </nav>

            {/* Mobile Menu Actions */}
            <div className="md:hidden flex items-center gap-2">
               <button onClick={toggleCart} className="relative p-2 rounded-lg text-gray-700 hover:bg-gray-100">
                <ShoppingCart className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <nav className="flex flex-col space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.url}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      location.pathname === item.url
                        ? "text-white bg-gradient-to-r from-red-600 to-red-700"
                        : "text-gray-700 hover:text-red-600 hover:bg-red-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
      
      <CartSidebar isOpen={isCartOpen} toggleCart={toggleCart} />

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Restaurant Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">老</span>
                </div>
                <h3 className="text-2xl font-bold">Laoban</h3>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                Experience authentic Chinese cuisine with handcrafted dumplings and traditional flavors. 
                Made fresh daily with the finest ingredients.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-red-400" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-red-400" />
                  <span>hello@laoban.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-red-400" />
                  <span>123 Chinatown Street, New York, NY 10013</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.url}
                      className="text-gray-300 hover:text-red-400 transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-red-600 transition-colors duration-200">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-red-600 transition-colors duration-200">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-red-600 transition-colors duration-200">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
              <div className="mt-6">
                <h5 className="font-medium mb-2">Hours</h5>
                <div className="text-sm text-gray-300 space-y-1">
                  <p>Monday - Thursday: 11:00 AM - 9:00 PM</p>
                  <p>Friday - Saturday: 11:00 AM - 10:00 PM</p>
                  <p>Sunday: 12:00 PM - 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Laoban Restaurant. All rights reserved. | Made with care in New York's Chinatown
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// AdminLayout for admin dashboard pages
function AdminLayout({ children }) {
  const location = useLocation();

  // Admin specific navigation items
  const adminNavigationItems = [
    { name: "Dashboard", url: createPageUrl("AdminDashboard"), icon: LayoutDashboard },
    { name: "Orders", url: createPageUrl("AdminOrders"), icon: Utensils },
    { name: "Products", url: createPageUrl("AdminProducts"), icon: Box },
    { name: "Settings", url: createPageUrl("AdminSettings"), icon: Wrench },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <style>
        {`
          :root {
            --laoban-red: #d32f2f;
            --laoban-gold: #ffa726;
            --laoban-dark-gold: #ff8f00;
            --laoban-light: #fff5f5;
          }
        `}
      </style>
      <header className="bg-gray-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to={createPageUrl("AdminDashboard")} className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">老</span>
            </div>
            <h1 className="text-xl font-bold">Laoban Admin</h1>
          </Link>
          <nav className="flex items-center space-x-6">
            {adminNavigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.url}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.url
                      ? "bg-gray-700 text-red-400"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 mr-2" />}
                  {item.name}
                </Link>
              );
            })}
            <Link to={createPageUrl("Home")} className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md" title="Back to main site">
              <Settings className="w-5 h-5" />
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
      <footer className="bg-gray-800 text-gray-400 text-center py-4 text-sm">
        <p>&copy; 2024 Laoban Admin Dashboard</p>
      </footer>
    </div>
  );
}

// Main Layout component that decides which layout to render based on the current URL
export default function Layout({ children }) {
  const location = useLocation();
  // Determine if the current path is an admin page by checking if it starts with "Admin"
  const isAdminPath = location.pathname.includes('Admin');

  if (isAdminPath) {
    return <AdminLayout>{children}</AdminLayout>;
  } else {
    // Public-facing pages need the CartProvider
    return (
      <CartProvider>
        <AppLayout>{children}</AppLayout>
      </CartProvider>
    );
  }
}
