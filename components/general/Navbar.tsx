import Link from "next/link";
import { buttonVariants } from "../ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="relative py-5 flex items-center justify-between">
      {/* Left side: Logo */}
      <Link href={"/"}>
        <h1 className="text-3xl font-semibold">Blog</h1>
      </Link>

      {/* Center: Links */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-6">
        <Link
          href={"/"}
          className="text-sm font-medium hover:text-blue-500 transition-colors"
        >
          Home
        </Link>
        <Link
          href={"/posts"}
          className="text-sm font-medium hover:text-blue-500 transition-colors"
        >
          Posts
        </Link>
        <Link
          href={"/dashboard"}
          className="text-sm font-medium hover:text-blue-500 transition-colors"
        >
          Dashboard
        </Link>
      </div>

      {/* Right side: Auth Buttons */}
      {user ? (
        <div className="flex items-center gap-4">
          <p>{user.given_name}</p>
          <LogoutLink className={buttonVariants({ variant: "secondary" })}>
            Logout
          </LogoutLink>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <LoginLink className={buttonVariants()}>Login</LoginLink>
          <RegisterLink className={buttonVariants({ variant: "secondary" })}>
            Sign up
          </RegisterLink>
        </div>
      )}
    </nav>
  );
}
