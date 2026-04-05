// utils/mailer.ts
import nodemailer from 'nodemailer';
// Pull from env variables, with fallbacks just in case
const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);

// Dictionary mapping DB event names to WhatsApp links
const WHATSAPP_LINKS: Record<string, string> = {
    "Zero to One": "https://chat.whatsapp.com/DinkXK92QpF8aVE5tA5POR",
    "Cric Auction": "https://chat.whatsapp.com/J4Nkyk6pBiTEIYvQjnFYe7",
    "Wolf of Wall Street": "https://chat.whatsapp.com/EBJRET9l7IQAo0gPwgWGiV",
    "Speaker Session": "https://chat.whatsapp.com/KTx5KIi07lvE3bMI5z9M3K",
    "Chai Pe Charcha!": "https://chat.whatsapp.com/HKhnPsL8Th1BIABXreFZq9", // Note: Included the exclamation mark based on your React catalog
    "Chai Pe Charcha": "https://chat.whatsapp.com/HKhnPsL8Th1BIABXreFZq9", // Fallback just in case
    "Shark Tank": "https://chat.whatsapp.com/KndAHzAC40I1j96ZWPnwrE",
    "Game of Brands": "https://chat.whatsapp.com/K7jVMoZgUjUGrmj3g6CMvy"
};

// Configure the email transporter
const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: false, // Automatically true if port is 465 (SSL), false if 587 (TLS)
    requireTLS: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendVerificationEmail = async (userEmail: string, firstName: string, eventsApplied: string[]) => {
    // 1. Generate the WhatsApp links HTML
    let linksHtml = '<ul>';
    eventsApplied.forEach(eventName => {
        const link = WHATSAPP_LINKS[eventName];
        if (link) {
            linksHtml += `<li><strong>${eventName}:</strong> <a href="${link}">Join WhatsApp Group</a></li>`;
        } else {
            // Just in case an event doesn't have a mapped link
            linksHtml += `<li><strong>${eventName}</strong></li>`;
        }
    });
    linksHtml += '</ul>';

    // 2. Construct the Email HTML Content
    // You can customize this content entirely based on your needs
    const emailHtml = `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <h2>Registration Confirmed! 🎉</h2>
            <p>Hi ${firstName},</p>
            <p>Great news! Your payment has been verified and your registration for <strong>VENTURERS 2026</strong> is officially confirmed.</p>
            
            <p>Please join the WhatsApp groups for your selected events below to stay updated with schedules, rules, and announcements:</p>
            
            ${linksHtml}
            
            <p>If you have any questions, feel free to reply to this email.</p>
            <p>See you at the event!<br><strong>The VENTURERS Team</strong></p>
        </div>
    `;

    // 3. Send the email
    await transporter.sendMail({
        from: `"VENTURERS 2026" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: "🎉 Your Registration is Verified - VENTURERS 2026",
        html: emailHtml
    });
};