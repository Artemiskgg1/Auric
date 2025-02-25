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
    <nav className="fixed top-0 w-full z-20 bg-white  text-zinc-900">
      <div className="flex items-center justify-between px-6 py-3 h-16 md:mx-8">
        <div className="mt-4">
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
        <div className="md:hidden bg-white shadow-md flex flex-col space-y-4 px-6 py-4">
          {navLinks.map((link, index) => (
            <div key={index} className="relative">
              {link.dropdown ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex justify-between w-full text-gray-900 font-medium"
                    >
                      {link.text}
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full mt-1">
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
                  className="block text-gray-900 font-medium hover:underline"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.text}
                </Link>
              )}
            </div>
          ))}
          <Link href="/sign-up">
            <Button className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium text-center w-full">
              Sign up
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
