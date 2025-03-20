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
    <header className="w-full flex justify-between items-center h-20 bg-white shadow-md px-8">
      <div className="flex items-center gap-2">
        <Rocket className="w-8 h-8 text-blue-600" />
        <span className="text-xl font-bold text-gray-800">Sonu Don</span>
      </div>
      <div className="flex items-center gap-6">
        <Link href="/dashboard">
          {" "}
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <LayoutDashboard className="w-6 h-6 text-gray-600" />
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
            <UserCircle className="w-8 h-8 text-gray-600" />
          )}
          <div className="flex items-center gap-1">
            <span className="text-gray-700 font-medium">
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
