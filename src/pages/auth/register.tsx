import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateUserInputType,
  createUserSchema,
} from "../../schemas/user-schema";

function RegisterPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserInputType>({
    resolver: zodResolver(createUserSchema),
  });

  const submitHandler = (value: CreateUserInputType) => {
    console.log(value);
  };
  return (
    <>
      <form
        autoComplete="off"
        className="h-screen w-ful flex flex-col gap-4 justify-center items-center"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h2 className=" text-xl">Register</h2>
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
          <label className="pl-3">Name:</label>
          <input
            id="name"
            className="w-[300px] outline-purple-400 border border-slate-400 rounded-md px-3 py-2"
            type="text"
            {...register("name")}
          />

          {errors?.name && (
            <p className="text-red-500 text-sm pl-3">{errors.name?.message}</p>
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

        <div className="flex flex-col gap-1">
          <label className="pl-3">Confirm password:</label>
          <input
            id="passwordConfirmation"
            className="w-[300px] outline-purple-400 border border-slate-400 rounded-md px-3 py-2"
            type="password"
            {...register("passwordConfirmation")}
          />

          {errors?.passwordConfirmation && (
            <p className="text-red-500 text-sm pl-3">
              {errors.passwordConfirmation?.message}
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

export default RegisterPage;
