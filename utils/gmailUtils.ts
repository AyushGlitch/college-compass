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
    const senderHeader = email.payload.headers.find((h: any) => h.name === 'From');
    const senderEmail = senderHeader?.value.match(/<(.*)>/)?.[1] || senderHeader?.value || '';
    const subject = email.payload.headers.find((h: any) => h.name === 'Subject')?.value || '';
    const body = email.payload.headers.find((h: any) => h.name === 'Body')?.value || '';
  
    // Define keyword-based categorization rules
    if (senderEmail.includes("academics") || subject.includes("Urgent") || body.includes("important")) {
      return "IMPORTANT";
    }
    if (senderEmail.includes("club") || subject.includes("meeting") || body.includes("event")) {
      return "CLUBS";
    }
    if (senderEmail.includes("mess") || subject.includes("menu") || body.includes("lunch")) {
      return "MESS";
    }
  
    return "OTHERS";
  };
  