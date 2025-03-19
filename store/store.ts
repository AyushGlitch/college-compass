import { desc } from 'drizzle-orm';
import { create } from 'zustand';
import { db } from '~/db/drizzle';
import { emails } from '~/db/schema';

export interface Email {
    id: string;
    data: any;
    timestamp: string;
}

interface EmailState {
    emails: Email[];
    lastFetched: number | null;
    setEmails: (emails: any[]) => Promise<void>;
    loadEmailsFromDB: () => Promise<void>;
}

export const useStore = create<EmailState>((set, get) => ({
    emails: [],
    lastFetched: null,

    setEmails: async (newEmails) => {
        set({ emails: newEmails, lastFetched: Date.now() });

        const formattedEmailsforDB = newEmails.map((email) => ({
            id: email.id,
            data: JSON.stringify(email),
            timestamp: email.internalDate,
        }));

        await db
            .insert(emails)
            .values(formattedEmailsforDB)
            .onConflictDoNothing();
    },

    loadEmailsFromDB: async () => {
        const storedEmails = await db
            .select()
            .from(emails)
            .orderBy(desc(emails.timestamp));

        const parsedEmails = storedEmails.map((email) =>
            JSON.parse(email.data)
        );

        set({ emails: parsedEmails });
    },
}));
