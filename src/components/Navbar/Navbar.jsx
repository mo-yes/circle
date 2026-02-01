{/* import Heroui Component */}
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";

{/* import react & react-router-dom Component  */}
import { Link } from "react-router-dom"; 
import { useState, useContext } from "react";

{/* import Contexts Component */}
import { AuthContext } from "../../context/AuthContext";

{/* Navbar Component's */}
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import UserDropdown from "./UserDropdown";

{/* Navbar Component */}
export default function Navbar() {  
  {/* LocalStorage Contain Token */}
  const { isLoggedIn } = useContext(AuthContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <HeroNavbar 
      className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-all"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* Logo */}
      <NavbarBrand>
        <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
          <Logo />
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">Circle</span>
        </Link>
      </NavbarBrand>

      {/* Navigation Links */}
      <NavbarContent justify="center">
        {/* Navigation Component */}
        <NavLinks onLinkClick={() => setIsMenuOpen(false)} />
      </NavbarContent>

      {/* Actions */}
      <NavbarContent as="div" justify="end" className="flex items-center gap-3">
        {/* ThemeMode toggle (Dark / Light) */}
        <ThemeToggle />

        {/* User Dropdown Component (Avatar + Menu) */}
        <UserDropdown />

        {/* Mobile menu toggle */}
        <NavbarMenuToggle className="sm:hidden" />
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="sm:hidden bg-white dark:bg-gray-900 px-6">
        <div className="flex flex-col items-center justify-start min-h-[70vh] gap-1 w-full">
          <NavbarMenuItem className="w-full border-b border-gray-100 dark:border-gray-800">
            <Link to="/" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </NavbarMenuItem>
          
          <NavbarMenuItem className="w-full border-b border-gray-100 dark:border-gray-800">
            <Link to="/profile" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>
              Profile
            </Link>
          </NavbarMenuItem>
          
          <NavbarMenuItem className="w-full border-b border-gray-100 dark:border-gray-800">
            <Link to="/settings" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>
              Settings
            </Link>
          </NavbarMenuItem>

          <div className="w-full mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
            {isLoggedIn ? (
              <>
                <p className="font-semibold text-gray-800 dark:text-white">John Doe</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Signed in</p>
              </>
            ) : (
              <>
                <p className="font-semibold text-gray-800 dark:text-white">Welcome</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Sign in to your account</p>
              </>
            )}
          </div>
        </div>
      </NavbarMenu>
    </HeroNavbar>
  );
}
