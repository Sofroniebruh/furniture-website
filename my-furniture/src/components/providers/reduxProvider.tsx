"use client"

import { storage } from "../../lib/redux/storage";
import { Provider } from "react-redux";

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={storage}>{children}</Provider>
    )
}