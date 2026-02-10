import Link from "next/link";

// 🔹 ADDED: DB query + 404 helper
import { getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";

export default async function BlogPost({ params, searchParams }) {

    const { slug } = await params;
    const { author, likes } = await searchParams;

    // 🔹 ADDED: query the "DB" using slug
    const post = await getPostBySlug(slug);

    // 🔹 ADDED: handle missing post properly
    if (!post) {
        notFound();
    }

    return (
        <div className="bg-[#020617] h-screen p-10 text-[#e5e7eb]">
            <h1 className="flex items-center text-4xl text-[#38bdf8] font-semibold">
                Dynamic Blog Post Page
            </h1>

            {/* 🔹 ADDED: DB-backed content */}
            <div className="mt-5 p-4 bg-[#020617] border border-[#1e293b] rounded">
                <h2 className="text-[#facc15] text-lg"><b>{post.title}</b></h2>

                <p className="mt-2.5">
                    {post.content}
                </p>

                <p className="mt-2.5 text-[#94a3b8]">
                    Tags: {post.tags.join(", ")}
                </p>

                <p className="mt-1.5 text-[#64748b] text-sm">
                    Created at: {post.createdAt}
                </p>
            </div>

            {/* Route Param */}
            <div className="mt-6 p-4 bg-[#0f172a] border border-[#1e293b] rounded-lg text-[#facc15] w-fit">
                Route Param (from URL path): <strong>{slug}</strong>
            </div>

            {/* Search Params */}
            <div className="mt-6 p-4 bg-[#1f2933] border border-[#1e293b] rounded-lg w-fit">
                <p className="text-[#4ade80]">
                    Search Params (from query string):
                </p>

                <p>Author: <strong>{author || "not provided"}</strong></p>
                <p>Likes: <strong>{likes || "not provided"}</strong></p>
            </div>

            {/* Navigation Tests */}
            <div className="mt-8 p-4 bg-[#022c22] border-[#1e293b] rounded-lg w-fit">
                <p className="text-[#86efac]">Navigation Tests:</p>

                <p>
                    <Link className="text-blue-200 hover:text-blue-400 hover:underline" href="/blog/nextjs"> Go to another blog (changes slug <span> [current &rarr; nextjs</span>])</Link>
                </p>

                <p>
                    <Link className="text-blue-200 hover:text-blue-400 hover:underline" href={`/blog/${slug}?author=yash&likes=2500`}> Add search params (author,likes in current slug)</Link>
                </p>
            </div>

            <div className="mt-5 text-lg">
                <Link className="text-white font-semibold hover:underline" href="/">Home Page </Link>
                <span className="text-white opacity-70">&rarr; takes you back to the index page</span>
            </div>
        </div>
    );
}
