/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { BiHome } from "react-icons/bi";
import { FaManatSign } from "react-icons/fa6";
import { MdOutlineAddBusiness } from "react-icons/md";
import { GrAppsRounded } from "react-icons/gr";
import Logo from "@/components/home/Logo";
import useAuth from "@/hooks/useAuth"; 

const Navbar = () => {
    const { user, logOutFunc } = useAuth();

    const handleLogout = async () => {
        try {
            await logOutFunc();
        } catch (err) {
            console.error(err.message);
        }
    };

    const nav = (
        <>
            <li>
                <Link href="/" className="text-gray-500 font-semibold">
                    <BiHome size={18} /> Home
                </Link>
            </li>

            <li>
                <Link href="/apps" className="text-gray-500 font-semibold">
                    <GrAppsRounded size={20} /> All Apps
                </Link>
            </li>

            <li>
                <Link href="/add-app" className="text-gray-500 font-semibold">
                    <MdOutlineAddBusiness size={20} /> Add App
                </Link>
            </li>

            <li>
                <Link href="/manage-apps" className="text-gray-500 font-semibold">
                    <FaManatSign size={20} /> Manage Apps
                </Link>
            </li>
        </>
    );

    return (
        <div className="shadow bg-white py-1">
            <div className="navbar md:w-11/12 mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>

                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white rounded-box z-1 mt-3 w-52 p-2 shadow gap-3">
                            {nav}
                        </ul>
                    </div>

                    <Link href={"/"}>
                        <Logo />
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-5">{nav}</ul>
                </div>

                <div className="navbar-end">
                    {!user ? (
                        <Link href="/login" className="btn btn-secondary">
                            Login
                        </Link>
                    ) : (
                        <div className="flex items-center gap-3">
                            <img
                                    src={user.photoURL || "https://static.vecteezy.com/system/resources/previews/005/005/788/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg"}
                                alt="user"
                                className="w-10 h-10 rounded-full border"
                            />
                            <button
                                onClick={handleLogout}
                                className="btn bg-red-500 text-white hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
