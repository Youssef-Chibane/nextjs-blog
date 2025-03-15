"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "../ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function Navbar() {
  const { getUser } = useKindeBrowserClient();
  const user = getUser();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative py-5 flex items-center justify-between">
      {/* Logo */}
      <Link href={"/"} className="z-50">
        <h1 className="text-3xl font-semibold">Blog</h1>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-6">
        <NavLink href="/" text="Home" />
        <NavLink href="/posts" text="Posts" />
        <NavLink href="/dashboard" text="Dashboard" />
      </div>

      {/* Desktop Auth */}
      <div className="hidden md:flex items-center gap-4">
        <AuthComponents user={user} />
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-md hover:bg-gray-100 z-50"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed md:hidden inset-0 top-16 bg-white z-40 p-4 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <MobileNavLink
              href="/"
              text="Home"
              onClick={() => setIsOpen(false)}
            />
            <MobileNavLink
              href="/posts"
              text="Posts"
              onClick={() => setIsOpen(false)}
            />
            <MobileNavLink
              href="/dashboard"
              text="Dashboard"
              onClick={() => setIsOpen(false)}
            />
          </div>

          <div className="border-t pt-4">
            <AuthComponents
              user={user}
              mobile
              onClick={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, text }: { href: string; text: string }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium hover:text-blue-500 transition-colors"
    >
      {text}
    </Link>
  );
}

function MobileNavLink({
  href,
  text,
  onClick,
}: {
  href: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-lg font-medium hover:text-blue-500 transition-colors py-2"
    >
      {text}
    </Link>
  );
}

function AuthComponents({
  user,
  mobile = false,
  onClick,
}: {
  user?: any;
  mobile?: boolean;
  onClick?: () => void;
}) {
  const buttonClass = mobile ? "w-full justify-center" : "";

  return user ? (
    <div className={`flex ${mobile ? "flex-col gap-4" : "items-center gap-4"}`}>
      <p className="text-sm font-medium">{user.given_name}</p>
      <LogoutLink
        className={buttonVariants({
          variant: "secondary",
          className: buttonClass,
        })}
        onClick={onClick}
      >
        Logout
      </LogoutLink>
    </div>
  ) : (
    <div className={`flex ${mobile ? "flex-col gap-4" : "items-center gap-4"}`}>
      <LoginLink
        className={buttonVariants({ className: buttonClass })}
        onClick={onClick}
      >
        Login
      </LoginLink>
      <RegisterLink
        className={buttonVariants({
          variant: "secondary",
          className: buttonClass,
        })}
        onClick={onClick}
      >
        Sign up
      </RegisterLink>
    </div>
  );
}
