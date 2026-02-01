import { Input, Button, Select, SelectItem, Card, CardBody } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { useForm } from "react-hook-form";
import { registerSchema } from "../../../Schemas/registerSchema";
import { registerApi } from "../../../services/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import {  Link, useNavigate } from "react-router-dom";
export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");
  const {handleSubmit , register ,formState:{errors} , reset} = useForm({
    defaultValues:{
      name:'Mohamed',
      email:'mohamed4490@gmail.com',
      password:'Mohamed0099@123',
      rePassword:'Mohamed0099@123',
      dateOfBirth: new Date(),
      gender:'',
    },
    resolver: zodResolver(registerSchema) ,
    mode:'onBlur',
  });
  async function handleRegister(formDeta) {
    setErrMsg('')
    setSuccMsg('')
    setIsLoading(true)
    const data = await registerApi(formDeta)
    // console.log("🚀 ~ handleRegister ~ data:", data)
    if(data.message == 'success'){
      setSuccMsg(data.message)
      setErrMsg('')
      reset()
      setTimeout(() => {
      navigate('/login');
    }, 1000);
    }
    else{
      setSuccMsg('')
      setErrMsg(data)
      toast.error(data)
    }
    setIsLoading(false)
}
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-400 via-fuchsia-500 to-sky-900 p-4 sm:p-6">
      
        <Card className="relative w-full max-w-md sm:max-w-lg md:max-w-xl shadow-2xl rounded-2xl bg-white/15 backdrop-blur-lg border border-white/30 px-4 py-8 sm:p-10">
        
        {/* User Icon*/}
        <div className="absolute top-6 right-6 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-pink-400 to-sky-600 flex items-center justify-center shadow-lg animate-bounce">
          <User size={24} className="text-white" />
        </div>

        <CardBody className="p-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8">
            Register...
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit(handleRegister)} className="flex flex-col gap-4 sm:gap-5">

            {/* Full Name */}
            <Input isInvalid={Boolean(errors.name?.message)} errorMessage={errors?.name?.message} {...register('name')} label="Full Name" type="text" variant="bordered" className="text-white" />

            {/* Email Address */}
            <Input isInvalid={Boolean(errors.email?.message)} errorMessage={errors?.email?.message} {...register('email')} label="Email Address" type="email"  variant="bordered" className="text-white" />

            {/* Password */}
            <Input isInvalid={Boolean(errors.password?.message)} errorMessage={errors?.password?.message} {...register('password')} label="Password" type="password"  variant="bordered" className="text-white" />

            {/* Confirm Password */}
            <Input isInvalid={Boolean(errors.rePassword?.message)} errorMessage={errors?.rePassword?.message} {...register('rePassword')} label="Confirm Password" type="password"  variant="bordered" className="text-white" />


            <div className="flex flex-col sm:flex-row gap-4">
              {/* date Of Birth*/}
              <Input isInvalid={Boolean(errors.dateOfBirth?.message)} errorMessage={errors?.dateOfBirth?.message} {...register('dateOfBirth')} label="Date of Birth" type="date" variant="bordered" className="flex-1 text-white" />

              {/* Gender */}
              <Select isInvalid={Boolean(errors.gender?.message)} errorMessage={errors?.gender?.message} {...register('gender')} variant="bordered" label="Gender" placeholder="Select Gender" className="flex-1 text-white">
                <SelectItem key="male">Male</SelectItem>
                <SelectItem key="female">Female</SelectItem>
              </Select>
            </div>

            {/*Register Button*/}
            <Button
            isLoading={isLoading}
              type="submit"
              color="primary"
              className="mt-4 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-sky-500 text-white font-semibold py-3 rounded-lg shadow-md hover:opacity-90 transition-all"
            >
              Sign Up
            </Button>

            {/* Messages */}
            {errMsg && <p className=" p-2 bg-red-900 text-small text-center capitalize rounded">{errMsg}</p>}
            {succMsg && <p className=" p-2 bg-green-500 text-small text-center capitalize rounded">{succMsg}</p>}

            {/* Login Link */}
            <p className="text-center text-white/80 text-sm mt-6">
            Already have an account?{" "}
            <Link
            to="/login"
            className="text-blue-300 font-semibold hover:underline hover:text-white transition-colors">
            Login here
            </Link>
            </p>

          </form>
        </CardBody>
      </Card>
    </div>
  );
}
