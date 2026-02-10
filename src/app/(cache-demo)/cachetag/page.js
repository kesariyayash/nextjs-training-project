import { cacheTag, updateTag, revalidatePath } from "next/cache";

import RevalidateButton from "./revalidateButton";

import Link from "next/link";

export async function generateMetadata() {
    return {
        title: "caching and revalidating",
    };
}

async function revalidateThisPage() {
    "use server";
    revalidatePath("/cachetag");
}

async function updateTimeTag() {
    "use server";
    updateTag("time-data");
}

export default async function CacheTagPage() {
    // Attach a tag to everything cached during this render - 'use cache' is necessary to enable caching
    "use cache";
    cacheTag("time-data");

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const res = await fetch(`${baseUrl}/api/time`, {
        cache: "force-cache",
        next: { tags: ["time-data"] }
    });

    const data = await res.json();

    return (
        <div className="p-10 bg-black min-h-screen text-white">
            <h1 className="text-3xl font-bold mb-5">Caching and Revalidating Page</h1>


            <div className="p-3 bg-white text-black border-3 border-blue-500 rounded-md w-fit">
                <p>Cached time (tagged with <code>time-data</code>):</p>
                <p className="font-bold">{data.time}</p>
            </div>

            <RevalidateButton />

            <p className="mt-4 opacity-70">
                Refresh the page — the time should stay the same.<br />
                Click the Revalidate via API button to delete the tagged cache data.<br />
                After revalidation, the page will not automatically refresh the UI, that happens after on a fresh fetch request is made while a new render.
            </p>

            <form action={updateTimeTag}>
                <button
                    type="submit"
                    className="mt-6 px-3 py-1.5 cursor-pointer bg-white text-black border border-black rounded-lg hover:opacity-70"
                >
                    Update tag via Server Action
                </button>
            </form>

            <p className="mt-4 opacity-70">
                Click the Update tag via Server Action button to delete the tagged cache data and imeediately refresh the UI within no time.<br />
                After the button gets clicked, the updateTag with immediate effect marks the cached data as expired and then fresh data is fetched with immediate effect.
            </p>

            <form action={revalidateThisPage}>
                <button
                    type="submit"
                    className="mt-6 px-3 py-1.5 cursor-pointer bg-white text-black border border-black rounded-lg hover:opacity-70"
                >
                    Revalidate path (/cachetag)
                </button>
            </form>

            <p className="mt-4 opacity-70">
                Click the Revalidate path via Server Action button to invalidate all the cache that is on that path passed in the tag and the page is re-rendered, with a new fetch.
            </p>

            <hr className="text-white mt-7" />

            <div className="mt-5">
                <Link className="underline text-white font-semibold hover:underline hover:text-blue-500" href="/">Home Page </Link>
                <span className="text-sm opacity-70">&rarr; takes you back to the index page</span>
            </div>
        </div>
    );
}
