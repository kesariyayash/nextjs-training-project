
import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/lib/auth";

export default async function AuthLayout({ children }) {
    const user = await getAuthenticatedUser();

    if (user) {
        redirect("/");
    }
    return (
        <div className="border-4 border-blue-500 ">
            {children}
        </div>
    );
}


