"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import { useAuth } from "@/app/context/AuthContext";
import Alert from "./Alert";

export function NavbarDemo() {


  const { authenticated, loading } = useAuth();
  const [error, setError] = useState("");

  const navItems = [
    {
      name: "Features",
      link: "/#features",
    },
    {
      name: "Pricing",
      link: "#pricing",
    },
    {
      name: "Dashboard",
      link: "/dashboard",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogOut = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_API}/api/auth/logout`, {
      method: 'POST',
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error);
    }
    
  }

  return (
    <div className="w-full fixed z-40">
      {error && <Alert message={error} />}
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <ThemeToggler />
            {(!loading && authenticated) ? (

              <NavbarButton variant="secondary" onClick={handleLogOut}>Logout</NavbarButton>
            ) : (
              <NavbarButton variant="secondary" href="/signin">Login</NavbarButton>
            )}

          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />

            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

          </MobileNavHeader>
          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            <ThemeToggler />
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300">
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              {(!loading && authenticated) ? (
                <NavbarButton
                  onClick={() => { setIsMobileMenuOpen(false); handleLogOut(); }}
                  variant="primary"
                  className="w-full"
                >
                  Logout
                </NavbarButton>
              ) : (
                <NavbarButton
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full"
                  href="/signin">
                  Login
                </NavbarButton>
              )}

            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Navbar */}
    </div>
  );
}

