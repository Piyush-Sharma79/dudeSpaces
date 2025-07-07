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
    const response = await fetch("http://localhost:300/auth/createUser", {
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
    <div className="sign-in-container flex flex-col items-center justify-center min-h-screen p-4 bg-transparent">
      <div className="sign-in-content w-full max-w-md">
        {/* Logo Section */}
        <div className="logo-section flex flex-col items-center justify-center mb-8 animate-slide-up">
          <img 
            src="/logo-color.svg" 
            alt="DudeSpaces Logo" 
            className="w-24 h-24 mb-4 animate-glow"
          />
          <h1 className="text-4xl font-bold gradient-text" style={{ fontFamily: 'Summer Outfit'}}>DudeSpaces</h1>
          <p className="text-lg text-gray-300">Where Legends Connect</p>
        </div>

        {/* Sign-In Form */}
        <Card className="w-full glass animate-fade-in">
          <CardHeader>
            <CardTitle className="title text-center">Join the Space</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Input {...register("username")} placeholder="Username" className="input" />
                {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
              </div>
              <div className="space-y-2">
                <Input {...register("name")} placeholder="Your Name" className="input" />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <Button type="submit" className="w-full btn">Sign In</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
