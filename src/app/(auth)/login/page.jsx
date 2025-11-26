"use client";

import { useState } from "react";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";
import PrimaryBtn from "@/components/PrimaryBtn";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const { loginUserFunc, setUser, googleSigninFunc } = useAuth();
  const [loginLoader, setLoginLoader] = useState(false);

  const router = useRouter();
  const from = "/"; 

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
      .then((res) => {
        setUser(res.user);
        toast.success("Login successful!");

        setTimeout(() => {
          router.replace(from);
        }, 300);
      })
      .catch((err) => {
        toast.error(handleSigninError(err));
        setLoginLoader(false);
      });
  };

  const handleGoogleSignin = () => {
    googleSigninFunc()
      .then((res) => {
        setUser(res.user);
        toast.success("Login successful!");

        setTimeout(() => {
          router.replace(from);
        }, 300);
      })
      .catch((err) => toast.error(handleSigninError(err)));
  };

  return (
    <div className="max-w-11/12 mx-auto">
      <div className="flex flex-col items-center justify-center h-[80vh] dark">
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

          <button
            onClick={handleGoogleSignin}
            className="btn bg-white text-black border-[#e5e5e5]"
          >
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
