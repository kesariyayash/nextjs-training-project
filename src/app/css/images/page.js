import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import ImageSkeleton from "@/components/ImageSkeletonLoader";

export const metadata = {
    title: "Images/Fonts",
};

// export function generateMetadata() {
//     return {
//         title: "Images/Fonts",
//     };
// }

export default function ImagesPage() {
    return (
        <div className="p-8 bg-red-300 min-h-screen text-gray-600">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-3xl font-semibold">Images And Fonts</h1>
                <p className="text-sm mt-3 text-center"> (Google Font Inter Implemented via Nested Layout)</p>
            </div>

            <div className="flex gap-6 mt-20 flex flex-row justify-evenly">
                <div>
                    <div className="flex flex-col justify-center items-center bg-white border-3 border-gray-500 rounded-md mb-5 p-3">
                        <h2 className="font-semibold">Local Image</h2>
                        <p className="text-sm">(exists inside the project in public)</p>
                    </div>
                    <Image
                        src="/profile_photo.jpg"
                        alt="Demo image"
                        width={4000}
                        height={4000}
                        className="border-3 border-gray-500 object-cover w-[400px] h-[400px] rounded-full hover:opacity-80 transition-opacity"
                    />
                </div>

                <Suspense fallback={<ImageSkeleton />}>
                    <div>
                        <div className="flex flex-col justify-center items-center bg-white border-3 border-gray-500 rounded-md mb-5 p-3">
                            <h2 className="font-semibold">Remote Image</h2>
                            <p className="text-sm">(exists on unsplash - add hostname in next.config.mjs) </p>
                        </div>
                        <Image
                            src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d"
                            alt="Remote example"
                            width={400}
                            height={300}
                            className="border-3 border-gray-500 object-cover w-[400px] h-[400px] rounded-full hover:opacity-80 transition-opacity"
                        />
                    </div>
                </Suspense>
            </div>

            <div className="mt-5 flex flex-col justify-center items-center">
                <Link className="text-white font-semibold hover:underline hover:text-blue-500 opacity-90" href="/">Home Page </Link>
                <span className="text-sm opacity-70">takes you back to the index page</span>
            </div>
        </div>
    );
}