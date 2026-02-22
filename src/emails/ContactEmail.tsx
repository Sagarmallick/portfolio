import * as React from "react";

interface ContactEmailProps {
    name: string;
    email: string;
    message: string;
}

export function ContactEmail({ name, email, message }: ContactEmailProps) {
    return (
        <html>
            <head>
                <meta charSet="utf-8" />
            </head>
            <body
                style={{
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    backgroundColor: "#f4f4f5",
                    margin: 0,
                    padding: "40px 0",
                }}
            >
                <table
                    width="100%"
                    cellPadding={0}
                    cellSpacing={0}
                    style={{ maxWidth: "560px", margin: "0 auto" }}
                >
                    <tbody>
                        <tr>
                            <td
                                style={{
                                    backgroundColor: "#18181b",
                                    padding: "24px 32px",
                                    borderRadius: "12px 12px 0 0",
                                }}
                            >
                                <h1
                                    style={{
                                        color: "#ffffff",
                                        fontSize: "20px",
                                        margin: 0,
                                        fontWeight: 700,
                                    }}
                                >
                                    📬 New Contact Form Message
                                </h1>
                            </td>
                        </tr>
                        <tr>
                            <td
                                style={{
                                    backgroundColor: "#ffffff",
                                    padding: "32px",
                                    borderRadius: "0 0 12px 12px",
                                    border: "1px solid #e4e4e7",
                                    borderTop: "none",
                                }}
                            >
                                <table width="100%" cellPadding={0} cellSpacing={0}>
                                    <tbody>
                                        <tr>
                                            <td style={{ paddingBottom: "16px" }}>
                                                <p
                                                    style={{
                                                        color: "#71717a",
                                                        fontSize: "12px",
                                                        textTransform: "uppercase" as const,
                                                        letterSpacing: "0.05em",
                                                        margin: "0 0 4px 0",
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    Name
                                                </p>
                                                <p
                                                    style={{
                                                        color: "#18181b",
                                                        fontSize: "16px",
                                                        margin: 0,
                                                    }}
                                                >
                                                    {name}
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ paddingBottom: "16px" }}>
                                                <p
                                                    style={{
                                                        color: "#71717a",
                                                        fontSize: "12px",
                                                        textTransform: "uppercase" as const,
                                                        letterSpacing: "0.05em",
                                                        margin: "0 0 4px 0",
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    Email
                                                </p>
                                                <a
                                                    href={`mailto:${email}`}
                                                    style={{
                                                        color: "#2563eb",
                                                        fontSize: "16px",
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    {email}
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p
                                                    style={{
                                                        color: "#71717a",
                                                        fontSize: "12px",
                                                        textTransform: "uppercase" as const,
                                                        letterSpacing: "0.05em",
                                                        margin: "0 0 8px 0",
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    Message
                                                </p>
                                                <div
                                                    style={{
                                                        backgroundColor: "#f4f4f5",
                                                        padding: "16px",
                                                        borderRadius: "8px",
                                                        color: "#18181b",
                                                        fontSize: "15px",
                                                        lineHeight: "1.6",
                                                        whiteSpace: "pre-wrap" as const,
                                                    }}
                                                >
                                                    {message}
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td
                                style={{
                                    padding: "16px 0",
                                    textAlign: "center" as const,
                                }}
                            >
                                <p
                                    style={{
                                        color: "#a1a1aa",
                                        fontSize: "12px",
                                        margin: 0,
                                    }}
                                >
                                    Sent from your portfolio contact form
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </body>
        </html>
    );
}
