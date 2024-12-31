"use client"

import Common from "@/components/common-properties";
import { buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSchema, contactSchema } from "@/lib/formSchemas";


export default function Contact() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<ContactSchema>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit: SubmitHandler<ContactSchema> = async (data) => {
        try {
            console.log("Form Data:", data);
            toast("Email has been successfully sent");
            reset()
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div className="flex justify-center items-center flex-col">
            <h1 className="sm:mt-36 mt-16 text-5xl sm:text-7xl mb-16">Contact Us</h1>
            <div className="shadow rounded-2xl w-fit sm:mb-36 mb-16">
                <form onSubmit={handleSubmit(onSubmit)} method="post">
                    <Common className="p-8 gap-4 flex flex-col w-[350px] sm:w-[400px]">

                        <div className="flex flex-col">
                            <label htmlFor="firstName">First name</label>
                            <input {...register("firstName")} className="border rounded-md p-1 my-2" type="text" name="firstName" placeholder="John" />
                            {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="lastName">Last name</label>
                            <input {...register("lastName")} className="border rounded-md p-1 my-2" type="text" name="lastName" placeholder="Doe" />
                            {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email">Email</label>
                            <input {...register("email")} className="border rounded-md p-1 my-2" type="email" name="email" placeholder="email@gmail.com" />
                            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="comment">Text message</label>
                            <textarea {...register("comment")} className="border rounded-md p-1 my-2 resize-none" rows={5} name="comment" />
                            {errors.comment && <p className="text-sm text-red-500">{errors.comment.message}</p>}
                        </div>
                        <input type="submit" value={"Submit"} className={buttonVariants({
                            size: "lg",
                            className: "cursor-pointer mt-4"
                        })} />
                    </Common>
                </form>
            </div>
        </div>
    )
}