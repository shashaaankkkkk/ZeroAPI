import React, { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/70 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <h1 className="logo-font text-3xl sm:text-4xl text-[var(--color-primary)] font-bold">
              ZeroAPI
            </h1>
            <span className="bg-[var(--color-primary)] text-white text-xs px-2 py-0.5 rounded-md">beta</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center text-sm font-medium text-gray-700">
            <a href="#features" className="hover:text-black transition">Features</a>
            <a href="#usecases" className="hover:text-black transition">Use Cases</a>
            <a href="#agents" className="hover:text-black transition">AI Agents</a>
            <a href="#pricing" className="hover:text-black transition">Pricing</a>
            <a href="#docs" className="hover:text-black transition">Docs</a>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="#login" className="text-gray-700 hover:text-black text-sm transition">Login</a>
            <a
              href="#get-started"
              className="bg-[var(--color-primary)] text-white text-sm px-4 py-2 rounded-md shadow-sm hover:opacity-90 transition"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-black focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-2 text-sm text-gray-700">
          <a href="#features" className="block">Features</a>
          <a href="#usecases" className="block">Use Cases</a>
          <a href="#agents" className="block">AI Agents</a>
          <a href="#pricing" className="block">Pricing</a>
          <a href="#docs" className="block">Docs</a>
          <a href="#login" className="block text-gray-700">Login</a>
          <a
            href="#get-started"
            className="block text-center bg-[var(--color-primary)] text-white px-4 py-2 rounded-md"
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
