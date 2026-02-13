export default async function CommentPage({ params }) {
    const { slug, commentId } = await params;

    return (
        <div className="bg-[#022c22] h-screen p-10 text-[#ecfeff]">
            <h1 className="text-3xl text-[#2dd4bf] font-semibold">
                Nested Dynamic Route <span className="text-sm text-gray-400">/blog/[slug]/comments/[commentId]</span>
            </h1>

            <div className="mt-6 p-4 bg-[#064e3b] rounded-lg w-fit">
                <p >
                    Blog Slug: <strong className="text-[#facc15]">{slug}</strong>
                </p>
                <p>
                    Comment ID: <strong className="text-[#fb7185]">{commentId}</strong>
                </p>
            </div>
        </div>
    );
}
