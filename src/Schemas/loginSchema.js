import * as zod from "zod";

export const loginSchema = zod
  .object({
    email: zod
      .string()
      .nonempty("Email is required")
      .regex(
        /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Invalid email format"
      ),

    password: zod
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
      ),
  });
