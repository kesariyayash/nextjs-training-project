import Link from "next/link";

export async function generateMetadata() {
    return {
        title: "About-Errors",
    };
}

async function submitAboutForm(formData) {
    "use server";

    const message = formData.get("message");

    // Simulate a failure 50% of the time
    if (Math.random() < 0.5) {
        throw new Error("Something went wrong while saving your message.");
    }

    // Simulate success
    return {
        success: true,
        message,
    };
}

export default async function AboutPage() {

    return (
        <div className="p-10 bg-[#facc15] h-screen">
            <h1 className="text-4xl font-semibold mb-3">About Page</h1>

            <p className="text-lg mb-3">
                This page demonstrates <strong>Next.js error handling</strong>.
            </p>
            <p className="mb-3">
                Submitting the form may fail.<br />
                It is meant to fail if you submit it multiple times, thus error.js is triggered, which contains a reset button to try again that is implemented using reset().
            </p>

            <form action={submitAboutForm}>
                <label>
                    <span className="font-semibold">Your message:</span>
                    <br />
                    <input
                        type="text"
                        name="message"
                        required
                        placeholder="enter message"
                        className="mt-2 p-5 border border-black-600 rounded-md bg-gray-300"
                    />
                </label>

                <br />

                <button type="submit" className="mt-3 px-4 py-1 cursor-pointer bg-black hover:bg-slate-400 hover:text-black rounded-md text-white font-semibold">
                    Submit
                </button>
                <span className="ml-10">
                    <Link className="text-black font-semibold hover:underline" href="/">Home Page</Link>
                </span>
            </form>


        </div>
    );
}
