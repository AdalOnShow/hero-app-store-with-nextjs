"use client";

import { useState } from "react";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";
import PrimaryBtn from "@/components/PrimaryBtn";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const Login = () => {
  const { loginUserFunc, setUser, googleSigninFunc } = useAuth();
  const [loginLoader, setLoginLoader] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";

  const handleSigninError = (error) => {
    switch (error.code) {
      case "auth/invalid-email":
        return "Invalid email format";
      case "auth/invalid-credential":
        return "Invalid credentials. Please try again.";
      case "auth/user-disabled":
        return "User has been disabled";
      case "auth/user-not-found":
        return "No user found with this email";
      case "auth/wrong-password":
        return "Incorrect password";
      case "auth/too-many-requests":
        return "Too many login attempts. Try again later.";
      case "auth/network-request-failed":
        return "Network error. Check your connection.";
      default:
        return "Something went wrong. Try again later.";
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginLoader(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    loginUserFunc(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Login successful!");

        setTimeout(() => {
          router.replace(from);
        }, 300);
      })
      .catch((error) => {
        toast.error(handleSigninError(error));
        setLoginLoader(false);
      });
  };

  const handleGoogleSignin = () => {
    googleSigninFunc()
      .then((result) => {
        setUser(result.user);
        toast.success("Login successful!");

        setTimeout(() => {
          router.replace(from);
        }, 300);
      })
      .catch((error) => {
        toast.error(handleSigninError(error));
      });
  };

  return (
    <div className="max-w-11/12 mx-auto">
      <div className="flex flex-col items-center justify-center h-[80dvh] dark">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-200 mb-4 text-center">
            Login Model Stack
          </h2>

          <form onSubmit={handleLogin} className="flex flex-col">
            <input
              placeholder="Email"
              className="form-input"
              type="email"
              name="email"
              required
            />
            <input
              placeholder="Password"
              className="form-input"
              type="password"
              name="password"
              required
            />

            <PrimaryBtn submit loader={loginLoader}>
              Login
            </PrimaryBtn>

            <p className="text-white mt-4">
              Don&apos;t have an account?
              <Link
                href="/signup"
                className="text-sm text-blue-500 hover:underline ml-1"
              >
                Register
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

export default Login;
