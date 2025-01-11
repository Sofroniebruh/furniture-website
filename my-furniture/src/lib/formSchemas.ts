import { z } from "zod";

const MAX_FILE_SIZE = 50000000000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

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
  itemImage: z
    // .custom<File>((val) => val instanceof File, "Image is required")
    .any()
    .refine((file) => {
      console.log(file, "validating");
      return file?.size <= MAX_FILE_SIZE;
    }, "Each file size should be less than 5 MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only these types are allowed .jpg, .jpeg, .png and .webp",
    ),
  itemPrice: z.coerce.number().gte(1, { message: "Item price is required" }).lte(9999999),
});

export type NewFileSchema = z.infer<typeof newFileSchema>;
