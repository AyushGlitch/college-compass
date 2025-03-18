import { emailCategories } from '~/constants/EmailCategories';
import { getAccessToken } from './authUtils';
import { Buffer } from 'buffer';

const GMAIL_API_URL = 'https://www.googleapis.com/gmail/v1/users/me/messages';

export const fetchEmails = async () => {
    try {
        let token = await getAccessToken();

        if (!token) {
            console.error('No access token found');
            return [];
        }

        const response = await fetch(GMAIL_API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();

        if (!data.messages) {
            console.error('No emails found');
            return [];
        }

        // Fetch details of each email (Gmail API only returns message IDs initially)
        const emailPromises = data.messages
            .slice(0, 10)
            .map(async (msg: any) => {
                const emailResponse = await fetch(
                    `${GMAIL_API_URL}/${msg.id}?format=full`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                return emailResponse.json();
            });

        const emails = await Promise.all(emailPromises);
        return emails;
    } catch (error) {
        console.error('Error fetching emails:', error);
        return [];
    }
};

// 🔹 Categorization function
export const categorizeEmail = (email: any) => {
    const senderHeader = email.payload.headers.find(
        (h: any) => h.name === 'From'
    );
    const senderEmail = senderHeader?.value || '';
    const subject =
        email.payload.headers.find((h: any) => h.name === 'Subject')?.value ||
        '';
    const body = extractEmailBody(email);
    const labels = email.labelIds || [];

    // 🔹 Normalize text for matching
    const text = `${senderEmail} ${subject} ${body}`.toLowerCase();

    // 🔹 Dynamically check against category definitions
    for (const category of emailCategories) {
        if (
            category.keywords.some((kw) => text.includes(kw)) ||
            (category.labelMatch &&
                category.labelMatch.some((lbl) => labels.includes(lbl))) ||
            (category.senderMatch &&
                category.senderMatch.some((sm) => senderEmail.includes(sm)))
        ) {
            return category.name;
        }
    }

    return 'OTHERS'; // Default category
};

// export const extractEmailBody = (
//     emailData: any,
//     logPayload: boolean = false
// ) => {
//     try {
//         const payload = emailData.payload;

//         if (logPayload) {
//             console.log('Payload: ', JSON.stringify(payload, null, 2));
//         }

//         if (!payload) return 'No email content';

//         let encodedBody = '';

//         // If the email body is directly in payload.body
//         if (payload.body?.data) {
//             encodedBody = payload.body.data;
//         }

//         // If the email has multiple parts, check for HTML first
//         if (payload.parts) {
//             const htmlPart = payload.parts.find(
//                 (part: any) => part.mimeType === 'text/html'
//             );
//             const textPart = payload.parts.find(
//                 (part: any) => part.mimeType === 'text/plain'
//             );

//             if (htmlPart?.body?.data) {
//                 encodedBody = htmlPart.body.data; // Prefer HTML content
//             } else if (textPart?.body?.data) {
//                 encodedBody = textPart.body.data; // Fallback to plain text
//             }
//         }

//         if (!encodedBody) return 'No body found';

//         // Decode Base64 string
//         return decodeBase64(encodedBody);
//     } catch (error) {
//         console.error('Error extracting email body:', error);
//         return 'Error loading email body';
//     }
// };

const findHtmlBody = (parts: any) => {
    for (const part of parts) {
        if (part.mimeType === 'text/html' && part.body?.data) {
            return decodeBase64(part.body.data);
        }
        if (part.parts) {
            const nestedHtml: any = findHtmlBody(part.parts);
            if (nestedHtml) return nestedHtml;
        }
    }
    return null;
};

const findPlainTextBody = (parts: any) => {
    for (const part of parts) {
        if (part.mimeType === 'text/plain' && part.body?.data) {
            return decodeBase64(part.body.data);
        }
        if (part.parts) {
            const nestedText: any = findPlainTextBody(part.parts);
            if (nestedText) return nestedText;
        }
    }
    return null;
};

export const extractEmailBody = (emailData: any) => {
    try {
        const payload = emailData.payload;

        if (payload.body?.data) {
            return decodeBase64(payload.body.data);
        }

        if (payload.parts) {
            const htmlBody = findHtmlBody(payload.parts);
            if (htmlBody) return htmlBody;

            const plainTextBody = findPlainTextBody(payload.parts);
            if (plainTextBody) return plainTextBody;
        }

        return 'No body found';
    } catch (error) {
        console.error('Error extracting email body:', error);
        return 'Error loading email body';
    }
};

export const decodeBase64 = (encodedString: string) => {
    try {
        return Buffer.from(encodedString, 'base64').toString('utf-8');
    } catch (error) {
        console.error('Base64 decoding error:', error);
        return 'Error decoding email content';
    }
};
