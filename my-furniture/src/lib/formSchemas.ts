import { z } from "zod";

const MAX_IMAGE_SIZE = 50000000000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/avif"];

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

export const newFileSchema = z.object({
  itemName: z.string().min(1, { message: "Item name is required" }),
  itemDescription: z.string().min(1, { message: "Item description is required" }),
  itemImages: z
    .array(z.instanceof(File))
    .max(5, "Maximum of 5 images are allowed")
    .refine(
      (files) => files.every((file) => file.size <= MAX_IMAGE_SIZE),
      "Each file size should be less than 5 MB",
    )
    .refine(
      (files) => files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Only these types are allowed .jpg, .jpeg, .png and .webp",
    ),
  itemPrice: z.coerce.number().gte(1, { message: "Item price is required" }).lte(9999999),
  stock: z.coerce.number().gte(1, { message: "Item stock is required" }).lte(9999999),
});

export type NewFileSchema = z.infer<typeof newFileSchema>;
