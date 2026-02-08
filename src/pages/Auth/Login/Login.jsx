import { Input, Button, Card, CardBody, Spinner } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { useForm } from "react-hook-form";
import { loginApi } from "../../../services/auth";
import { useContext, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom"; 
import toast from "react-hot-toast";
import { loginSchema } from "../../../Schemas/loginSchema";
import { AuthContext } from "../../../context/AuthContext";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  
    const { setIsLoggedIn} = useContext(AuthContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "mohamed4490@gmail.com",
      password: "Mohamed0099@123",
    },
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  async function handleLogin(formData) {
    setErrMsg("");
    setIsLoading(true);
  try {
    const data = await loginApi(formData);

    if (data?.message === "success") {
      if (data.token) localStorage.setItem("token", data.token);
        // localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        toast.success("Login successful!");
        navigate('/')

      const redirectPath = location.state?.from?.pathname || "/";
      navigate(redirectPath);
    } else {
      // const msg = typeof data === "string" ? data : data?.message || "Login failed";
        setErrMsg(data)
        toast.error(data);
    }
  } catch {
    setErrMsg("Network error");
    toast.error("Network error");
  } finally {
    setIsLoading(false);
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-400 via-fuchsia-500 to-sky-900 p-4 sm:p-6">
      <Card className="relative w-full max-w-md sm:max-w-lg md:max-w-xl shadow-2xl rounded-2xl bg-white/15 backdrop-blur-lg border border-white/30 px-4 py-8 sm:p-10">
        {/* User Icon */}
        <div className="absolute top-6 right-6 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-pink-400 to-sky-600 flex items-center justify-center shadow-lg animate-bounce">
          <User size={24} className="text-white" />
        </div>

        <CardBody className="p-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8">
            Login...
          </h1>

          {/* Form */}
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="flex flex-col gap-4 sm:gap-5"
          >
            {/* Email */}
            <Input
              isInvalid={Boolean(errors.email?.message)}
              errorMessage={errors?.email?.message}
              {...register("email")}
              label="Email Address"
              type="email"
              variant="bordered"
              className="text-white"
            />

            {/* Password */}
            <Input
              isInvalid={Boolean(errors.password?.message)}
              errorMessage={errors?.password?.message}
              {...register("password")}
              label="Password"
              type="password"
              variant="bordered"
              className="text-white"
            />

           {/* Login Button */}
            <Button
            type="submit"
            color="primary"
            className="mt-4 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-sky-500 text-white font-semibold py-3 rounded-lg shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2"
            isDisabled={isLoading}>
          {isLoading ? (
        <>
          <Spinner color="white" size="sm" />
          <span className="text-sm font-semibold tracking-wide">Signing in...</span>
        </>
        ) : (
        "Sign In"
        )}
          </Button>


            {/* Messages */}
            {errMsg && (
              <p className="p-2 bg-red-900 text-small text-center capitalize rounded">
                {errMsg}
              </p>
            )}
          </form>

          {/* Register Link */}
          <p className="text-center text-white/80 text-sm mt-6">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-primary-600 font-semibold"
            >
              Sign up here
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
