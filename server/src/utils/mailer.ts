import { google } from 'googleapis';

// ── WhatsApp group links per event ──────────────────────────────────────
const EVENT_WHATSAPP_LINKS: Record<string, string> = {
    'Zero to One': 'https://chat.whatsapp.com/DinkXK92QpF8aVE5tA5POR',
    'Cric Auction': 'https://chat.whatsapp.com/J4Nkyk6pBiTEIYvQjnFYe7',
    'Wolf of Wall Street': 'https://chat.whatsapp.com/EBJRET9l7IQAo0gPwgWGiV',
    'Speaker Session': 'https://chat.whatsapp.com/KTx5KIi07lvE3bMI5z9M3K',
    'Chai Pe Charcha!': 'https://chat.whatsapp.com/HKhnPsL8Th1BIABXreFZq9',
    'Shark Tank': 'https://chat.whatsapp.com/KndAHzAC40I1j96ZWPnwrE',
    'Game of Brands': 'https://chat.whatsapp.com/K7jVMoZgUjUGrmj3g6CMvy',
};

// ── Case-insensitive event lookup ───────────────────────────────────────
function getWhatsAppLink(eventName: string): string | null {
    const trimmed = eventName.trim().toLowerCase();
    for (const [key, link] of Object.entries(EVENT_WHATSAPP_LINKS)) {
        if (key.toLowerCase() === trimmed) return link;
    }
    console.warn(`⚠️  No WhatsApp link found for event: "${eventName}"`);
    return null;
}

// ── Build HTML email body ───────────────────────────────────────────────
function buildEmailHtml(firstName: string, events: string[]): string {
    const eventRows = events
        .map((event) => {
            const link = getWhatsAppLink(event);
            if (link) {
                return `
                <tr>
                    <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb;">
                        <span style="font-weight: 600; color: #1f2937;">📌 ${event}</span>
                    </td>
                    <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb;">
                        <a href="${link}" 
                           style="display: inline-block; background-color: #25D366; color: #ffffff; 
                                  padding: 8px 16px; border-radius: 6px; text-decoration: none; 
                                  font-weight: 600; font-size: 14px;">
                            Join WhatsApp Group
                        </a>
                    </td>
                </tr>`;
            }
            return `
                <tr>
                    <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb;" colspan="2">
                        <span style="font-weight: 600; color: #1f2937;">📌 ${event}</span>
                        <span style="color: #6b7280; font-size: 13px;"> — Group link coming soon</span>
                    </td>
                </tr>`;
        })
        .join('');

    return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1e3a5f 0%, #0f2744 100%); padding: 32px 24px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">
                🎉 Registration Confirmed!
            </h1>
            <p style="color: #93c5fd; margin: 8px 0 0; font-size: 14px;">
                Venturers 2026 — EDC PVG's COET
            </p>
        </div>

        <!-- Body -->
        <div style="padding: 32px 24px; background-color: #f9fafb;">
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 8px;">
                Hey <strong>${firstName}</strong>,
            </p>
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                Your payment has been received and you are <strong style="color: #059669;">successfully registered</strong> for the following event${events.length > 1 ? 's' : ''}:
            </p>

            <!-- Events Table -->
            <table style="width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <thead>
                    <tr style="background-color: #f3f4f6;">
                        <th style="padding: 12px 16px; text-align: left; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase;">Event</th>
                        <th style="padding: 12px 16px; text-align: left; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase;">WhatsApp Group</th>
                    </tr>
                </thead>
                <tbody>
                    ${eventRows}
                </tbody>
            </table>

            <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 24px 0 0;">
                Please join the WhatsApp group${events.length > 1 ? 's' : ''} above to stay updated with all event-related announcements.
            </p>
        </div>

        <!-- Footer -->
        <div style="padding: 20px 24px; background-color: #1e3a5f; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="color: #93c5fd; font-size: 13px; margin: 0;">
                Entrepreneurship Development Cell — PVG's COET
            </p>
            <p style="color: #64748b; font-size: 12px; margin: 4px 0 0;">
                This is an automated email. Please do not reply.
            </p>
        </div>
    </div>`;
}

// ── Gmail API OAuth2 setup ──────────────────────────────────────────────
function getGmailClient() {
    const oAuth2Client = new google.auth.OAuth2(
        process.env.GMAIL_CLIENT_ID,
        process.env.GMAIL_CLIENT_SECRET,
        'https://developers.google.com/oauthplayground'
    );

    oAuth2Client.setCredentials({
        refresh_token: process.env.GMAIL_REFRESH_TOKEN ?? null,
    });

    return google.gmail({ version: 'v1', auth: oAuth2Client });
}

// ── RFC 2047 encode subject for non-ASCII characters ────────────────────
function mimeEncodeSubject(subject: string): string {
    const encoded = Buffer.from(subject, 'utf-8').toString('base64');
    return `=?UTF-8?B?${encoded}?=`;
}

// ── Encode email to base64url (RFC 2822 format) ─────────────────────────
function encodeEmail(to: string, subject: string, htmlBody: string): string {
    const messageParts = [
        `From: Venturers 2026 <pvgedc@gmail.com>`,
        `To: ${to}`,
        `Subject: ${mimeEncodeSubject(subject)}`,
        `MIME-Version: 1.0`,
        `Content-Type: text/html; charset=utf-8`,
        ``,
        htmlBody,
    ];
    const message = messageParts.join('\r\n');

    // Base64url encode
    return Buffer.from(message)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

// ── Public: Send verification email ─────────────────────────────────────
export async function sendVerificationEmail(
    email: string,
    firstName: string,
    eventsApplied: string[]
): Promise<void> {
    const gmail = getGmailClient();
    const subject = 'Registration Confirmed - Venturers 2026';
    console.log(`📧 Sending email to ${email} for events:`, eventsApplied);
    const html = buildEmailHtml(firstName, eventsApplied);
    const raw = encodeEmail(email, subject, html);

    await gmail.users.messages.send({
        userId: 'me',
        requestBody: { raw },
    });

    console.log(`✅ Verification email sent to ${email}`);
}
