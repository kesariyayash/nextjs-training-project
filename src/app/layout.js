import Providers from "./providers";
import "./globals.css";

export async function generateViewport() {
    return {
        width: "device-width",
        initialScale: 1,
        themeColor: "#020617",
    };
}


export async function generateMetadata() {
    return {
        title: {
            default: "Nextjs Learning Project",
            template: "%s | Nextjs",
        },
        description: "Learning Next.js App Router concepts",
        applicationName: "Next.js Learning Project",
        authors: [{ name: "Yash" }],
        openGraph: {
            title: "Next.js App Router Project",
            description: "Learning Next.js App Router concepts alinged with the docs available on Next.js official website.",
        },
    };
}


export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
            </head>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
