import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters")
      .regex(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces"),

    email: z
      .string()
      .nonempty("Email is required")
      .regex(
        /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please enter a valid email address"
      ),

    password: z
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must have at least 8 characters, one letter, one number, and one special character"
      ),

    rePassword: z.string().nonempty("Confirm Password is required"),

    dateOfBirth: z.coerce
      .date()
      .refine(
        (date) => {
          const birthYear = date.getFullYear();
          const currentYear = new Date().getFullYear();
          const age = currentYear - birthYear;
          return age >= 18;
        },
        { message: "You must be at least 18 years old" }
      ),

    gender: z
      .string()
      .nonempty("Gender is required")
      .regex(/^(male|female)$/, "Gender must be Male or Female"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });
