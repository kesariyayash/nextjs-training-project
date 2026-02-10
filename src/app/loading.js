// app/loading.js
import { ClipLoader } from 'react-spinners';

export default function Loading() {
    return (
        <div className="flex bg-white items-center justify-center min-h-screen">
            <ClipLoader color="black" size={60} />
        </div>
    );
}