import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateUserInputType,
  createUserSchema,
} from "../../schemas/user-schema";
import axios from "axios";
import {
  CreateUserSessionInputType,
  createUserSessionSchema,
} from "../../schemas/session-schema";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

function LoginPage() {
  const [loginError, setLoginError] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserSessionInputType>({
    resolver: zodResolver(createUserSessionSchema),
  });
  const router = useRouter();

  const submitHandler = async (values: CreateUserSessionInputType) => {
    try {
      await axios.post(`${baseUrl}/api/sessions`, values, {
        withCredentials: true,
      });
      router.push("/");
    } catch (error: any) {
      setLoginError(error.message);
    }
  };

  return (
    <>
      {loginError && (
        <p className="w-full text-center text-red-500 text-sm pl-3">
          {loginError}
        </p>
      )}
      <form
        autoComplete="off"
        className="h-screen w-ful flex flex-col gap-4 justify-center items-center"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h2 className=" text-xl">Login</h2>

        <div className="flex flex-col gap-1">
          <label className="pl-3">Email:</label>
          <input
            id="email"
            className="w-[300px] outline-purple-400 border border-slate-400 rounded-md px-3 py-2"
            type="email"
            {...register("email")}
          />

          {errors?.email && (
            <p className="text-red-500 text-sm pl-3">{errors.email?.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="pl-3">Password:</label>
          <input
            id="password"
            className="w-[300px] outline-purple-400 border border-slate-400 rounded-md px-3 py-2"
            type="password"
            {...register("password")}
          />

          {errors?.password && (
            <p className="text-red-500 text-sm pl-3">
              {errors.password?.message}
            </p>
          )}
        </div>

        <button
          className="w-[300px] text-purple-50 tracking-widest uppercase mt-6 bg-purple-400 border border-slate-400 rounded-md px-3 py-2 hover:bg-purple-500"
          type="submit"
        >
          submit
        </button>
      </form>
    </>
  );
}

export default LoginPage;
