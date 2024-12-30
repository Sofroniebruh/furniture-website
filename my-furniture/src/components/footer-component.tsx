import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { small } from "framer-motion/client";
import Common from "./common-properties";

export default function Footer() {
    return (
        <Common>
            <footer className="rounded-2xl bg-gray-100/75 p-4 px-8 flex justify-around items-center flex-col sm:flex-row">
                <ul className="flex flex-col items-center sm:items-start">
                    <li className="my-2"><Link href="#" className="font-medium text-sm">Privacy policy</Link></li>
                    <li className="my-2"><Link href="#" className="font-medium text-sm">Terms and conditions</Link></li>
                </ul>
                <h2 className="font-medium my-4 sm:m-0">&copy; 2024 All rights reserved.</h2>
                <div>
                    <ul className="flex gap-2 my-4 sm:m-0">
                        <li><Link href={"#"}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-facebook">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                            </svg>
                        </Link></li>
                        <li><Link href={"#"}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-instagram">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                            </svg>
                        </Link></li>
                        <li><Link href={"#"}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-twitter">
                                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                            </svg>
                        </Link></li>
                    </ul>
                </div>
            </footer>
        </Common>
    )
}