import Link from "next/link";
import { BiHome } from "react-icons/bi";
import { FaManatSign } from "react-icons/fa6";
import { MdOutlineAddBusiness } from "react-icons/md";
import Logo from "@/components/home/Logo";
import { GrAppsRounded } from "react-icons/gr";

const Navbar = () => {
    const nav = (
        <>
            <li>
                <Link href="/" className="text-gray-500 font-semibold">
                    <BiHome size={18} className="" /> Home
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
            <div className="navbar md:w-11/12  mx-auto  ">
                <div className="navbar-start">
                    <div className="dropdown ">
                        <div tabIndex="0" role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {" "}
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                                {" "}
                            </svg>
                        </div>
                        <ul
                            tabIndex="0"
                            className="menu menu-sm dropdown-content bg-white rounded-box z-1 mt-3 w-52 p-2 shadow gap-3 "
                        >
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
                    <Link href="/login" className="btn btn-secondary bg-linear-to-r from-violate-500 to-blue-500">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default Navbar;