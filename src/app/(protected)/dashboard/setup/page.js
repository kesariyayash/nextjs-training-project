import Link from "next/link";
import SetupForm from "./SetupForm";
import SavedUserInfo from "./SavedUserInfo";
import { cookies } from "next/headers";
import { Suspense } from "react";
import MarkSetupCompleteButton from "@/components/MarkSetupCompleteButton";

export async function generateMetadata() {
    return {
        title: "Dash User Setup",
    };
}

export default async function SetupPage() {

    const cookieStore = await cookies();
    const isCompleted = cookieStore.get("setup_completed")?.value === "true";

    return (
        <div className="p-7 bg-[#12d8df] min-h-screen">
            <h1 className="text-4xl text-red-500 font-bold">
                Dashboard User Setup
            </h1>

            <p className="mt-2 text-black text-lg font-semibold">
                Save your basic profile details.
            </p>

            <p className="mt-2 text-black font-normal">
                The form below reperesents a client component wired with <b>useActionState()</b> hook to manage form submission state.
            </p>

            <SetupForm />

            <hr className="border border-black w-full" />

            <p className="mt-5 text-lg font-semibold text-black mb-5">
                Setup status:{" "}
                {isCompleted ? "✅ Completed" : "❌ Not completed"}
            </p>

            <MarkSetupCompleteButton />

            <hr className="border border-black w-full mt-5" />

            <p className="text-black mt-5 text-xl font-semibold">Saved Data from the above form </p> <p className="">It was stored in cookies using <b>cookies().set()</b> and fetched from cookies using <b>cookies().get()</b>
            </p>
            <Suspense fallback={<p>Loading saved data...</p>}>
                <SavedUserInfo />
            </Suspense>


            <hr className="border border-black w-full my-5" />

            <div className="mb-5">
                <Link className="text-black font-semibold hover:underline hover:text-blue-500" href="/">Home Page </Link>
                <p>&rarr; takes you back to the index page.</p>
            </div>

            <div>
                <Link className="text-black font-semibold hover:underline hover:text-blue-500" href="/dashboard/profile">Profile Page </Link>
                <p>&rarr; takes you to profile page, where the details stored from the above form in the cookies are fetched and displayed.</p>
            </div>
        </div>
    );
}
