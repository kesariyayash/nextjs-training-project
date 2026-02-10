import Link from "next/link";
import NavLink from "@/components/Navlink";

import { getAllPosts } from "@/lib/posts";

export async function generateMetadata() {
    return {
        title: "Blog",
    };
}

export default async function BlogPage() {
    // 🔹 ADDED: server-side data fetch
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await res.json();

    const postsfromDB = await getAllPosts();

    return (
        <div className="p-7.5 bg-[#301010] text-white min-h-screen">
            <h1 className="text-3xl text-[#38bdf8] font-bold">
                Blog Page (follows root layout)
            </h1>

            {/* 🔹 ADDED: fetched data rendering */}
            <h2 className="mt-7.5 text-xl font-bold text-[#facc15]">
                Fetched Posts using fetch() api (Server Component)
            </h2>

            <ul className="mt-2.5">
                {posts.slice(0, 5).map((post) => (
                    <li key={post.id}>{post.id}. {post.title}</li>
                ))}
            </ul>

            <p className="text-md text-slate-500 mt-4">the above set of posts are fetched from an external resource using fetch api, fetch()</p>


            {/* 🔹 ADDED: DB-backed content */}
            <h2 className="mt-7.5 text-xl font-bold text-[#facc15]">
                Posts from File-based DB
            </h2>

            <ul style={{ marginTop: "10px" }}>
                {postsfromDB.map((post) => (
                    <li key={post._id}>
                        {post.id}. {post.title} - <strong>{post.content}</strong>
                    </li>
                ))}
            </ul>

            <p className="text-md text-slate-500 mt-4">the above set of posts are fetched from a file based DB that mimics MONGO DB using a devloper-defined query function for the DB.</p>

            {/* Existing navigation */}
            <div className="text-white">
                <ul className="mt-5">
                    <li>
                        <Link href="/blog/react">
                            <NavLink className="text-red-300 hover:underline hover:text-slate-500">React Blog</NavLink>
                        </Link>
                        <span className="text-md text-white ml-2"> &rarr; more about react</span>
                    </li>

                    <li>
                        <Link href="/blog/nextjs">
                            <NavLink className="text-red-300 hover:underline hover:text-slate-500">Next.js Blog</NavLink>
                        </Link>
                        <span className="text-md text-white ml-2"> &rarr; more about nextjs</span>
                    </li>

                    <li>
                        <Link href="/blog/yash">
                            <NavLink className="text-red-300 hover:underline hover:text-slate-500">Yash&apos;s Blog</NavLink>
                        </Link>
                        <span className="text-md text-white ml-2"> &rarr; more about the developer</span>
                    </li>
                </ul>
            </div>

            <p className="text-md text-slate-500 mt-4">the above set of links take you to a dynamic blog post page fetched from a file based DB that mimics MONGO DB using a devloper-defined query function for the same.</p>

            <div className="mt-5">
                <Link className="text-white font-semibold hover:underline" href="/">Home Page </Link>
                <span className="text-white opacity-70">&rarr; takes you back to the index page</span>
            </div>
        </div>
    );
}
