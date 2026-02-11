export default function ImageSkeleton() {
    return (
        <div className="flex flex-col items-center">
            {/* Text box skeleton */}
            <div className="bg-white border-2 border-gray-700 rounded-md p-3 mb-6 animate-pulse">
                <div className="h-5 bg-gray-300 rounded w-32 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-48"></div>
            </div>

            {/* Circular image skeleton */}
            <div className="w-[400px] h-[400px] bg-gray-300 rounded-full animate-pulse"></div>
        </div>
    );
}