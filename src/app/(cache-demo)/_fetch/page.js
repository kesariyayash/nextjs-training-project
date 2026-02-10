
import { Suspense } from "react";
import Link from "next/link";

export async function generateMetadata() {
    return {
        title: "Fetch",
    };
}

async function NoStoreSection({ baseUrl }) {
    //fetch() with cache no-store
    const noStoreRes = await fetch(`${baseUrl}/api/time`, {
        cache: "no-store",
    });
    const noStoreData = await noStoreRes.json();

    return (
        <h3>
            <span className="font-bold">no-store:</span> <span>{noStoreData.time}</span>
        </h3>
    );

}

async function DefaultFetchSection({ baseUrl }) {
    //default fetch()
    const defaultRes = await fetch(`${baseUrl}/api/time`, {
        cache: "default",
    });
    const defaultData = await defaultRes.json();

    return (
        <h3>
            <span className="font-bold">default fetch:</span> <span>{defaultData.time}</span>
        </h3>
    );
}

export default async function FetchCacheDemoPage() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    //fetch() with cache forced
    const cachedRes = await fetch(`${baseUrl}/api/time`, {
        cache: "force-cache",
    });
    const cachedData = await cachedRes.json();


    return (
        <div className="p-10 bg-[#a10cdb] h-screen text-white" >
            <h1 className="underline text-3xl font-bold">Fetch() caching demo</h1>

            <div className="mt-5 bg-white text-black border border-gray-300 rounded-lg p-6 w-fit">
                <ul className="space-y-3">
                    <li>
                        <Suspense fallback={<div>Loading default fetch...</div>}>
                            <DefaultFetchSection baseUrl={baseUrl} />
                        </Suspense>
                    </li>
                    <li>
                        <h3>
                            <span className="font-bold">force-cache:</span> <span>{cachedData.time}</span> &rarr; the data freezes here to the first fetched value.
                        </h3>
                    </li>
                    <li>
                        <Suspense fallback={<div>Loading uncached data...</div>}>
                            <NoStoreSection baseUrl={baseUrl} />
                        </Suspense>
                    </li>
                </ul>
            </div>

            <h5 style={{ marginTop: "16px", color: "white" }}>
                Refresh the page and observe which values change.
            </h5>

            <div className="mt-5">
                <Link className="underline text-white font-semibold hover:underline hover:text-blue-500" href="/">Home Page </Link>
                <span className="text-sm opacity-70">&rarr; takes you back to the index page</span>
            </div>

        </div>
    );
}
