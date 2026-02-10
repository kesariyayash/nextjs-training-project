"use server";

export async function logDashboardVisit() {
    console.log("📊 Dashboard visited at:", new Date().toISOString());
}