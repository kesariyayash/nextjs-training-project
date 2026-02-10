import { cookies } from "next/headers";
import { use } from "react";

export default function SavedUserInfo() {

    const cookieHouse = cookies();
    const cookieStore = use(cookieHouse);

    const savedUsername = cookieStore.get("setup_username")?.value;
    const savedEmail = cookieStore.get("setup_email")?.value;

    return (
        <div className="mt-3 p-3 bg-black rounded-md text-white w-fit">
            <p>
                Saved Username:
                <strong>{" "}{savedUsername || "Not set"}</strong>
            </p>
            <p>
                Saved Email:
                <strong>{" "}{savedEmail || "Not set"}</strong>
            </p>
        </div>
    );
}
