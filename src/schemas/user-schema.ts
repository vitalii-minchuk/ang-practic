import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  password: string().min(6, "Too short - 6 chars min"),
  passwordConfirmation: string().min(1, "Field is required"),
  name: string().min(1, "Field is required"),
  email: string().min(1, "Field is required").email(),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Password does not match",
  path: ["passwordConfirmation"],
});

export type CreateUserInputType = TypeOf<typeof createUserSchema>;
