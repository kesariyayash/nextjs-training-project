"use client";

export default function MaintenanceToggleButton({ action }) {
    return (
        <button
            onClick={() => action()}
            className="px-2.5 py-1 cursor-pointer bg-black text-white rounded-lg hover:bg-gray-800 hover:opacity-90"
        >
            Toggle Maintenance Mode
        </button>
    );
}
