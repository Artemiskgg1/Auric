"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Menu, X, ChevronDown, User } from "lucide-react";
import Logo from "../Logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const Nav = () => {
  const navLinks = [
    { text: "Features", href: "#", dropdown: true },
    { text: "Pricing", href: "#" },
    { text: "Resources", href: "#", dropdown: true },
    { text: "Integrations", href: "#" },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className="fixed top-0   rounded-lg w-full z-20 bg-gradient-to-b from-white via-[#F4F9FF] to-[#E0ECFF]  text-zinc-900">
      <div className="flex items-center justify-between px-6 py-3 h-16 md:mx-8">
        <div className="mt-1 pr-8 border-r border-gray-200 h-[80%] flex items-start">
          <Logo />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 lg:space-x-8 text-sm lg:text-md">
          {navLinks.map((link, index) => (
            <div key={index} className="relative flex items-center">
              {link.dropdown ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="hover:text-blue-600 font-medium flex items-center"
                    >
                      {link.text}
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuItem asChild>
                      <Link href="#">Option 1</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="#">Option 2</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  href={link.href}
                  className="hover:text-blue-600 font-medium"
                >
                  {link.text}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Sign Up Button */}
        <Link href="/sign-up">
          <Button className="hidden md:flex bg-gradient-to-t from-sky-500 to-indigo-500 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-800">
            <User />
            Sign up
          </Button>
        </Link>

        {/* Mobile Menu Button */}
        <Button variant="ghost" className="md:hidden" onClick={toggleMenu}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md flex flex-col px-4 py-4 space-y-2 w-full">
          {navLinks.map((link, index) => (
            <div key={index} className="relative w-full">
              {link.dropdown ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center justify-between w-full text-gray-900 font-medium px-4 py-2 rounded-md border border-gray-200"
                    >
                      {link.text}
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                    <DropdownMenuItem asChild>
                      <Link
                        href="#"
                        className="block w-full px-4 py-2 hover:bg-gray-100"
                      >
                        Option 1
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="#"
                        className="block w-full px-4 py-2 hover:bg-gray-100"
                      >
                        Option 2
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  href={link.href}
                  className="block w-full px-4 py-2 text-gray-900 font-medium rounded-md hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.text}
                </Link>
              )}
            </div>
          ))}

          {/* Sign-up Button */}
          <div className="px-4">
            <Link href="/sign-up">
              <Button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md font-medium text-center">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
