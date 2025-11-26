"use client";

import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PrimaryBtn from "@/components/PrimaryBtn";

const Register = () => {
  const { createUserFunc, setUser, googleSigninFunc } = useAuth();
  const [registerLoader, setRegisterLoader] = useState(false);
  const router = useRouter();
  const redirectTo = "/";

  const handleSignupError = (error) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "This email is already registered.";
      case "auth/invalid-email":
        return "Invalid email format.";
      case "auth/weak-password":
        return "Password must be at least 6 characters long.";
      default:
        return "Something went wrong. Try again.";
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
      toast.error("Password must include uppercase, lowercase, and a number.");
      setRegisterLoader(false);
      return;
    }

    createUserFunc(email, password)
      .then((res) => {
        setUser(res.user);
        toast.success("Registration successful!");
        e.target.reset();
        setTimeout(() => router.replace(redirectTo), 300);
      })
      .catch((err) => {
        toast.error(handleSignupError(err));
        setRegisterLoader(false);
      });
  };

  const handleGoogleSignin = () => {
    googleSigninFunc()
      .then((res) => {
        setUser(res.user);
        toast.success("Login successful!");
        setTimeout(() => router.replace(redirectTo), 300);
      })
      .catch(() => toast.error("Google sign-in failed!"));
  };

  return (
    <div className="max-w-11/12 mx-auto">
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-200 mb-4 text-center">
            Register for Model Stack
          </h2>

          <form onSubmit={handleRegister} className="flex flex-col gap-3">
            <input className="form-input" type="text" name="name" placeholder="Name" required />
            <input className="form-input" type="email" name="email" placeholder="Email" required />
            <input className="form-input" type="text" name="photo" placeholder="Photo URL" />
            <input className="form-input" type="password" name="password" placeholder="Password" required />

            <PrimaryBtn submit loader={registerLoader}>Register</PrimaryBtn>

            <p className="text-white mt-4 text-center">
              Already have an account?
              <Link href="/login" className="text-sm text-blue-400 hover:underline ml-1">
                Login
              </Link>
            </p>
          </form>

          <div className="divider text-white">OR</div>

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

export default Register;
