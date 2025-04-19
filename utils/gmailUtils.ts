import { defaultEmailCategories } from '~/constants/EmailCategories';
import { getAccessToken } from './authUtils';
import { Buffer } from 'buffer';
import { useStore } from '~/store/store';

const GMAIL_API_URL = 'https://www.googleapis.com/gmail/v1/users/me/messages';

export const fetchEmails = async () => {
    try {
        let token = await getAccessToken();

        if (!token) {
            console.error('No access token found');
            return [];
        }

        const response = await fetch(`${GMAIL_API_URL}?labelIds=INBOX`, {
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
            .slice(0, 20)
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

// // 🔹 Categorization function
// export const categorizeEmail = (email: any) => {
//     const senderHeader = email.payload.headers.find(
//         (h: any) => h.name === 'From'
//     );
//     const senderEmail = senderHeader?.value || '';
//     const subject =
//         email.payload.headers.find((h: any) => h.name === 'Subject')?.value ||
//         '';
//     const body = extractEmailBody(email);
//     const labels = email.labelIds || [];

//     // 🔹 Normalize text for matching
//     const text = `${senderEmail} ${subject} ${body}`.toLowerCase();

//     // 🔹 Access dynamic categories from Zustand store
//     const categories = useStore.getState().categories;

//     // 🔹 Dynamically check against category definitions
//     let bestMatch = { category: 'OTHERS', score: 0 };

//     for (const category of categories) {
//         let score = 0;
//         if (category.keywords.some((kw) => text.includes(kw))) score += 2;
//         if (category.labelMatch?.some((lbl) => labels.includes(lbl)))
//             score += 1;
//         if (category.senderMatch?.some((sm) => senderEmail.includes(sm)))
//             score += 1;

//         if (score > bestMatch.score) {
//             bestMatch = { category: category.name, score };
//         }
//     }

//     return bestMatch.category;
// };

// 🔹 Categorization function

export const categorizeEmail = (email: any): string[] => {
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

    // 🔹 Access dynamic categories from Zustand store
    const categories = useStore.getState().categories;

    // 🔹 Track scores for each category
    const scoredCategories: { name: string; score: number }[] = [];

    for (const category of categories) {
        let score = 0;

        // 1. Sender matches (HIGHEST PRIORITY)
        if (category.senderMatch?.some((sm) => senderEmail.includes(sm))) {
            score += 5; // Heavy weight for sender match
        }

        // 2. Label matches (moderate priority)
        if (category.labelMatch?.some((lbl) => labels.includes(lbl))) {
            score += 3; // Strong bonus for label match
        }

        // 3. Keyword matches (lowest priority, but still useful)
        const keywordMatches = category.keywords.filter((kw) =>
            text.includes(kw)
        ).length;
        score += keywordMatches * 1; // +1 per keyword (cumulative)

        if (score > 0) {
            scoredCategories.push({ name: category.name, score });
        }
    }

    // Sort by score (highest first) and take top 2
    const topCategories = scoredCategories
        .sort((a, b) => b.score - a.score)
        .slice(0, 2)
        .map((item) => item.name);

    // Return top categories, or ['OTHERS'] if none matched
    return topCategories.length > 0 ? topCategories : ['OTHERS'];
};

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
