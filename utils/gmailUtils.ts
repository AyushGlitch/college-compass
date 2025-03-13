import { getAccessToken } from './authUtils';

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
                    `${GMAIL_API_URL}/${msg.id}`,
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

export const categorizeEmail = (email: any) => {
    // Extract Sender Information
    const senderHeader = email.payload.headers.find(
        (h: any) => h.name === 'From'
    );
    const senderEmail = senderHeader?.value || '';
    const subject =
        email.payload.headers.find((h: any) => h.name === 'Subject')?.value ||
        '';
    const body = email.payload.parts?.[0]?.body?.data || ''; // Extract text from email body
    const labels = email.labelIds || [];

    // Normalize text for better matching
    const text = `${senderEmail} ${subject} ${body}`.toLowerCase();

    // Prioritized Categorization Rules
    if (
        /urgent|deadline|exam|important|result|grades|submission|placement/.test(
            text
        ) ||
        labels.includes('IMPORTANT') ||
        senderEmail.includes('academics')
    ) {
        return 'IMPORTANT';
    }
    if (
        /club|meeting|event|workshop|hackathon|seminar|competition/.test(
            text
        ) ||
        senderEmail.includes('club')
    ) {
        return 'CLUBS';
    }
    if (
        /mess|menu|lunch|dinner|breakfast|food/.test(text) ||
        senderEmail.includes('mess')
    ) {
        return 'MESS';
    }
    if (
        /sports|match|tournament|cricket|football|badminton/.test(text) ||
        senderEmail.includes('sports')
    ) {
        return 'SPORTS';
    }

    return 'OTHERS'; // Default category if no match
};
