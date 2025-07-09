import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { PEOPLES_IMAGES } from "../../avatars";
import Cookies from "universal-cookie";
import { StreamVideoClient, User } from "@stream-io/video-react-sdk";
import { useUser } from "../../user-context";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useState } from "react";

interface FormValues {
  username: string;
  name: string;
}

export const SignIn = () => {
  const cookies = new Cookies();

  const { setClient, setUser } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .matches(
        /^[a-zA-Z0-9_.@$]+$/,
        "Username can only contain letters and numbers"
      ),
    name: yup.string().required("Name is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormValues> = async (data, event) => {
    event?.preventDefault();
    const { username, name } = data;
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        name,
        image:
          PEOPLES_IMAGES[Math.floor(Math.random() * PEOPLES_IMAGES.length)],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      setError(errorData.message || "An unknown error occurred.");
      return;
    }

    const responseData = await response.json();
    console.log(responseData);

    const user: User = {
      id: username,
      name,
    };

    const myClient = new StreamVideoClient({
      apiKey: "hyfhuskn2cs3",
      user,
      token: responseData.token,
    });

    setClient(myClient);
    setUser({ username, name });

    const expires = new Date();
    expires.setDate(expires.getDate() + 1);
    cookies.set("token", responseData.token, {
      expires,
    });
    cookies.set("name", responseData.name, {
      expires,
    });
    cookies.set("username", responseData.username, {
      expires,
    });

    navigate("/");
  };

  return (
    <div className="sign-in-container p-4">
      <div className="sign-in-content">
        {/* Logo Section */}
        <div className="logo-section animate-fade-in">
          <div className="relative mb-10">
            <img
              src="/logo-color.svg"
              alt="DudeSpaces Logo"
              className="w-28 h-28 mx-auto animate-glow"
            />
            <div className="absolute inset-0 bg-[#92FF58]/10 blur-3xl rounded-full -z-10 animate-pulse"></div>
          </div>
          <h1 className="app-title font-burtons mb-3">DudeSpaces</h1>
          <p className="app-tagline mb-10">Where conversations happen</p>
        </div>

        {/* Sign-In Form */}
        <Card className="glass animate-slide-up overflow-hidden">
          <CardHeader className="px-8 py-6 border-b border-[#92FF58]/10">
            <CardTitle className="text-2xl text-center font-acorn font-light">Join the Space</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-white/80">Username</label>
                <Input
                  id="username"
                  {...register("username")}
                  placeholder="Enter your username"
                  className="input"
                />
                {errors.username && <p className="text-red-400 text-sm font-medium pl-1 mt-1">{errors.username.message}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-white/80">Full Name</label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Enter your full name"
                  className="input"
                />
                {errors.name && <p className="text-red-400 text-sm font-medium pl-1 mt-1">{errors.name.message}</p>}
              </div>
              {error && <p className="text-red-400 text-sm font-medium text-center">{error}</p>}
              <Button type="submit" className="w-full btn py-6 text-base">
                <span className="mr-2">Sign In</span>
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
