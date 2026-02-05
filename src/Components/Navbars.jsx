"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navs() {
  const [open, setOpen] = useState(false);

  // stop page scrolling when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  const links = [
    { label: "About", href: "/#about" },
    { label: "Projects", href: "/#projects" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-gray-700/60">
      <div className="mx-auto w-[90%] flex items-center justify-between py-3">
        {/* Logo */}
        <Link href="/#home" className="text-3xl sm:text-4xl font-semibold text-white">
          Auth-Mern
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex text-lg gap-7 text-gray-400">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-white transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-white p-2 rounded border border-gray-600"
          aria-label="Open menu"
        >
          {/* hamburger icon i intentionally use this i can use react-icon */}
          <span className="block w-6">
            <span className="block h-[2px] bg-white mb-1 "></span>
            <span className="block h-[2px] bg-white mb-1"></span>
            <span className="block h-[2px] bg-white"></span>
          </span>
        </button>
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 z-[60] bg-black/70">
          {/* click outside closes */}
          <button
            className="absolute inset-0 bg-black "
            onClick={() => setOpen(false)}
            aria-label="Close overlay"
          />
          <div className="relative bg-black border-b border-gray-300 pb-5">
            <div className="mx-auto w-[90%] flex items-center justify-between py-3">
              <span className="text-white text-xl font-semibold">Menu</span>

              {/* X close */}
              <button
                onClick={() => setOpen(false)}
                className="text-white p-2 rounded border border-gray-600"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <nav className="mx-auto w-[90%] py-6 flex flex-col gap-4">
              {links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-gray-200 text-lg py-2 border-b border-gray-300"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          
        </div>
      )}
    </header>
  );
}