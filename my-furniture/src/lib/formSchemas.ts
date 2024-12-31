import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  comment: z.string().min(10, { message: "Comment must be at least 10 characters long" }),
});

export type ContactSchema = z.infer<typeof contactSchema>;
