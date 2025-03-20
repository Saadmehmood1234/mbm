import React from "react";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import {
  Rocket,
  LayoutDashboard,
  UserCircle,
  ChevronDown,
  LogIn,
} from "lucide-react";

const Nav = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  const user = session.user;
  console.log("Session", session.user);
  return (
    <header className="w-full border-b-4 border-amber-400 flex justify-between items-center h-20 bg-gradient-to-br from-purple-800 to-indigo-900 shadow-md px-8">
      <Link href="/">
        <div className="flex items-center gap-2">
          <Rocket className="w-8 h-8 text-amber-400" />
          <span className="text-xl font-bold text-gray-200">Sonu Don</span>
        </div>
      </Link>
      <div className="flex items-center gap-6">
        <Link href="/dashboard">
          {" "}
          <button className="p-2 rounded-lg cursor-pointer transition-colors">
            <LayoutDashboard className="w-6 h-6 text-amber-400 hover:text-amber-200" />
          </button>
        </Link>

        <div className="flex items-center gap-3 cursor-pointer group">
          {session.user?.image ? (
            <img
              src={session.user.image}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <UserCircle className="w-8 h-8 text-amber-400" />
          )}
          <div className="flex max-sm:hidden items-center gap-1">
            <span className="text-amber-400 font-medium">
              {session.user?.name || "Account"}
            </span>
            {/* <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors" /> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;
