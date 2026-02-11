import { updateAdminUserRole } from "./actions";
import { getAllAdminUsers } from "@/lib/admin";

import MaintenanceToggleButton from "@/components/MaintenanceToggleButton";
import { getMaintenance } from "./maintenance-state";
import { toggleMaintenanceAction } from "./actions";

import clsx from "clsx";
import Link from "next/link";

export async function generateMetadata() {
    return {
        title: "Dash Settings",
    };
}

export default async function SettingsPage() {
    const users = await getAllAdminUsers();

    return (
        <div className="bg-yellow-400 min-h-screen">

            <div className="p-10">

                <h1 className="text-4xl font-bold">Dashboard Settings</h1>

                <p className="text-md mt-4">Form that takes user input to manipulate/modify data using server action</p>

                {users.map((user) => (
                    <form
                        key={user._id}
                        action={updateAdminUserRole}
                        className="mt-5 p-4 border border-black rounded-lg w-fit"
                    >
                        <p>
                            <strong>{user.name}</strong> (current role: <strong>{user.role}</strong>)
                        </p>

                        <input type="hidden" name="userId" value={user._id} />
                        <input className="bg-white border-1 border-black rounded-md placeholder:text-black p-1 mt-2" name="role" placeholder="enter updated role" />

                        <button type="submit" className="mt-4 ml-2.5 px-2.5 py-1 cursor-pointer bg-black text-white rounded-lg hover:bg-gray-800 hover:opacity-90">
                            Update Role
                        </button>
                    </form>
                ))}
            </div>

            <hr className="mt-5 border-black" />

            <section className="m-10">
                <h2 className="text-xl font-bold">Maintenance Mode</h2>
                <p className="text-lg">A Client Component (Button) triggering a Server Action passed as a prop.</p>

                <p className="my-2.5">
                    Current status:{" "}
                    <strong className={clsx("font-bold", getMaintenance() ? "text-green-500" : "text-red-500")}>
                        {getMaintenance() ? "ON" : "OFF"}
                    </strong>
                </p>

                <MaintenanceToggleButton action={toggleMaintenanceAction} />
            </section>

            <hr className="mt-5 border-black" />

            <div className="text-left p-10">
                <Link className="underline text-black text-xl font-semibold hover:underline hover:text-blue-500" href="/">Home Page </Link>
            </div>
        </div>
    );
}
