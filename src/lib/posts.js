import fs from "fs";
import path from "path";

// Absolute path to the JSON "collection"
const postsFilePath = path.join(
    process.cwd(),
    "src",
    "data",
    "blogPosts.json"
);

// 🔹 Simulates: db.collection("posts").find()
export async function getAllPosts() {
    const fileData = fs.readFileSync(postsFilePath, "utf-8");
    const posts = JSON.parse(fileData);

    return posts;
}

// 🔹 Simulates: db.collection("posts").findOne({ slug })
export async function getPostBySlug(slug) {
    const fileData = fs.readFileSync(postsFilePath, "utf-8");
    const posts = JSON.parse(fileData);

    return posts.find((post) => post.slug === slug);
}
