"use client";

import { useActionState } from "react";
import { saveUserDetails } from "./actions";
import clsx from "clsx";

const initialState = {
    success: false,
    message: "",
};


export default function SetupForm() {

    const [state, formAction, isPending] = useActionState(saveUserDetails, initialState);
    return (
        <form action={formAction} className="mt-4 mb-10 border-2 border-black p-5 rounded-md w-fit">
            <div className="mb-3 text-black">
                <label>
                    <strong>Username:</strong>
                    <br />
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        required
                        className="bg-white p-1.5 mt-1 border-2 border-black rounded-md placeholder-black"
                    />
                </label>
            </div>

            <div style={{ marginBottom: "12px", color: "black" }}>
                <label>
                    <strong>Email:</strong>
                    <br />
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        required
                        className="bg-white p-1.5 mt-1 border-2 border-black rounded-md placeholder-black"
                    />
                </label>
            </div>

            <div style={{ marginTop: "16px" }}>

                <ul className="space-y-4">
                    <li>
                        <button type="submit"
                            disabled={isPending}
                            name="intent"
                            value="stay"
                            className="mr-1.5 px-3.5 py-2 cursor-pointer bg-black text-white font-semibold rounded-md hover:bg-gray-800">
                            {isPending ? "Saving.." : "Save (stay here)"}
                        </button>

                        <span> &rarr; stay here button is used to submit the form <b>(no refresh(), no redirect())</b>.</span>
                    </li>

                    <li>
                        <button type="submit"
                            disabled={isPending}
                            name="intent"
                            value="redirect"
                            className="mr-1.5 px-3.5 py-2 cursor-pointer bg-black text-white font-semibold rounded-md hover:bg-gray-800">
                            {isPending ? "Redirecting.." : "Save & Go to Profile"}
                        </button>
                        <span> &rarr; go to profile button is used to submit the form wired with <b>redirect()</b>.</span>
                    </li>
                </ul>
            </div>

            {state.message && (
                <p className={clsx("mt-3 bg-white", state.success ? "text-green-500" : "text-red-500")}>
                    {state.message}
                </p>
            )}

        </form>
    );
}
