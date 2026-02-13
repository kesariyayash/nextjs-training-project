export default function UserListSkeleton() {
    return (
        <div className="border border-[#ecc411] rounded-md p-4 space-y-3 mt-4">
            {[1, 2, 3].map((item) => (
                <div key={item} className="animate-pulse flex items-center gap-2">

                    <div className="h-4 bg-gray-600 rounded w-12"></div>

                    <span className="text-gray-500">—</span>
                    <div className="h-4 bg-gray-600 rounded w-20"></div>

                    <span className="text-gray-500">—</span>
                    <div className="h-4 bg-gray-600 rounded w-24"></div>

                </div>
            ))}
        </div>
    );
}