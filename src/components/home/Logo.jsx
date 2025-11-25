import Image from "next/image";
import logo from "@/public/logo.png"

const Logo = () => {
    return (
        <div className="flex items-center gap-2">
            <Image src={logo} alt="" className="w-12" />
            <h2 className="text-xl hidden md:block text-secondary uppercase font-semibold ">
                HERO
                <span className="">.IO</span>
            </h2>
        </div>
    );
};

export default Logo;
