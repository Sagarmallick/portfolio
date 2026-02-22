import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { ContactEmail } from "@/emails/ContactEmail";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false, // STARTTLS
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function POST(req: NextRequest) {
    try {
        const { name, email, message } = await req.json();

        // Validate
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email, and message are required." },
                { status: 400 }
            );
        }

        // Verify SMTP connection first
        try {
            await transporter.verify();
            console.log("✅ SMTP connection verified");
        } catch (verifyErr) {
            console.error("❌ SMTP verification failed:", verifyErr);
            return NextResponse.json(
                { error: "SMTP connection failed. Check your credentials." },
                { status: 500 }
            );
        }

        // Render the email template to HTML
        const html = await render(ContactEmail({ name, email, message }));

        // Send via SMTP
        const info = await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.SMTP_FROM_EMAIL}>`,
            to: process.env.CONTACT_TO_EMAIL,
            replyTo: email,
            subject: `New message from ${name}`,
            html,
        });

        console.log("✅ Email sent:", {
            messageId: info.messageId,
            accepted: info.accepted,
            rejected: info.rejected,
            response: info.response,
        });

        return NextResponse.json({ success: true, messageId: info.messageId });
    } catch (error) {
        console.error("❌ Contact form error:", error);
        return NextResponse.json(
            { error: "Failed to send message. Please try again later." },
            { status: 500 }
        );
    }
}
