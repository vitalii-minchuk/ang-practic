import { object, string, TypeOf } from "zod";

export const createUserSessionSchema = object({
  password: string().min(6, "Too short - 6 chars min"),
  email: string().min(1, "Field is required").email(),
});

export type CreateUserSessionInputType = TypeOf<typeof createUserSessionSchema>;
