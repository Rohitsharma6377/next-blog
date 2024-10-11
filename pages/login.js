import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Login, Register, verifyAuth } from "@/pages/api/auth/loginApi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { useForm } from "react-hook-form";
import { FaEye as Eye, FaEyeSlash as EyeOff } from 'react-icons/fa';
import { Spinner } from "@nextui-org/spinner";
import {Input} from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { fetchDataFromDB } from "@/utils/helper";


const LoginPage = () => {
  const router = useRouter();
  const cookies = new Cookies();
  const [loading, setLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [formLoading, setFormLoading] = useState(false); // Add state for form loading
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const checkUser = async () => {
    const store = cookies.get("User");
    if (store) {
      const response = await verifyAuth(store);
      if (response.status === 200) {
        router.push("/");
      } else if (response.response.status === 401) {
        cookies.remove("User");
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const onLogin = async (data) => {
    setFormLoading(true); // Start spinner
    try {
      const response = await Login(data);

      if (response.status === 200) {
        toast.success("Successfully Logged In!");
        cookies.set("User", response.data.token);
        reset();
        router.push("/");
      } else if (response.response.status === 404) {
        toast.error("Invalid Email or Password!");
      }
    } catch (error) {
      console.error("Failed to Login", error);
    }
    setFormLoading(false); // Stop spinner
  };

  const onRegister = async (data) => {
    setFormLoading(true); // Start spinner
    try {
      const response = await Register(data);

      if (response.status === 200) {
        toast.success("Successfully Registered!");
        cookies.set("User", response.data.token);
        reset();
        router.push("/");
      } else if (response.response.status === 400) {
        toast.error("Email Already Registered!");
      }
    } catch (error) {
      console.error("Failed to Register", error);
    }
    setFormLoading(false); // Stop spinner
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  return (
    <div className="overflow-x-hidden">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="py-5 px-8 mt-32 mb-28 flex flex-col items-center justify-center">
          <Image src="/images/logo.svg" alt="Logo" width={100} height={50} className="h-10 mb-6"/>

          <form onSubmit={handleSubmit(isRegistering ? onRegister : onLogin)} className="w-[300px]">
            <div className="mb-4">
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                fullWidth
                color={errors.email ? "error" : "default"} // Show red outline if error
                status={errors.email ? "error" : "default"}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: emailRegex,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
            </div>

            <div className="mb-4 relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"} // Toggle password visibility
                placeholder="Enter your password"
                fullWidth
                color={errors.password ? "error" : "default"} // Show red outline if error
                status={errors.password ? "error" : "default"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} className="text-gray-500" /> : <Eye size={20} className="text-gray-500" />}
              </button>
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
              )}
            </div>

            <div className="mb-4">
              <Button
                type="submit"
                color="primary"
                className="w-full"
                isLoading={formLoading} // Use loading spinner when form is submitting
              >
                {isRegistering ? "Register" : "Login"}
              </Button>
            </div>
          </form>

          <div className="mb-4">
            <button
              type="button"
              className="text-primary hover:text-primary text-sm"
              onClick={handleForgotPassword}
            >
              Forgot your password?
            </button>
          </div>

          <div className="mb-4">
            <button
              type="button"
              className="text-primary hover:text-primary text-sm"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? "Already have an account? Login" : "New User? Register"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;


export async function getServerSideProps(context) {
  const { req } = await context;
  const pageUrl = `${req.url}`;
  
  let page;
  try {
    page = await fetchDataFromDB({url: `/api/user/page?url=${pageUrl}`});
  }
  catch (err) {
    console.error("Error fetching data:", err);
  }
  
  return { props: { page: page || [] } };
}