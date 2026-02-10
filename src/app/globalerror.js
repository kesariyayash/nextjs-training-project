"use client";

export default function GlobalError({ error, reset }) {
    return (
        <html>
            <body style={{ padding: "40px" }}>
                <h1>Something went seriously wrong</h1>

                <p>{error.message}</p>

                <button
                    onClick={() => reset()}
                    style={{ marginTop: "12px", padding: "6px 12px" }}
                >
                    Try again
                </button>
            </body>
        </html>
    );
}
