"use client";

import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import PrimaryBtn from "@/components/PrimaryBtn";

const Register = () => {
  const { createUserFunc, setUser, googleSigninFunc } = useAuth();
  const [registerLoader, setRegisterLoader] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";

  const handleSignupError = (error) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "This email is already registered. Please login instead.";
      case "auth/invalid-email":
        return "The email address is not valid.";
      case "auth/weak-password":
        return "Password is too weak.";
      default:
        return "Something went wrong. Try again later.";
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setRegisterLoader(true);

    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error("Weak password.");
      setRegisterLoader(false);
      return;
    }

    createUserFunc(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);

        toast.success("Registration successful!");
        e.target.reset();

        setTimeout(() => {
          router.replace(from);
        }, 300);
      })
      .catch((error) => {
        const message = handleSignupError(error);
        toast.error(message);
        setRegisterLoader(false);
      });
  };

  const handleGoogleSignin = () => {
    googleSigninFunc()
      .then((result) => {
        const user = result.user;
        setUser(user);

        toast.success("Login successful!");

        setTimeout(() => {
          router.replace(from);
        }, 300);
      })
      .catch(() => {
        toast.error("Google signin failed.");
      });
  };

  return (
    <div className="max-w-11/12 mx-auto">
      <div className="flex flex-col items-center justify-center h-[80dvh] dark">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-200 mb-4 text-center">
            Register for Model Stack
          </h2>

          <form onSubmit={handleRegister} className="flex flex-col">
            <input className="form-input" type="text" name="name" placeholder="Name" />
            <input className="form-input" type="email" name="email" placeholder="Email" required />
            <input className="form-input" type="text" name="photo" placeholder="Photo URL" />
            <input className="form-input" type="password" name="password" placeholder="Password" required />

            <PrimaryBtn submit loader={registerLoader}>Register</PrimaryBtn>

            <p className="text-white mt-4">
              Already have an account?
              <Link href="/login" className="text-sm text-blue-500 hover:underline ml-1">
                Login
              </Link>
            </p>
          </form>

          <div className="divider divider-info text-white">OR</div>

          <button onClick={handleGoogleSignin} className="btn bg-white text-black border-[#e5e5e5]">
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
