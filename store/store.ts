import { desc, eq } from 'drizzle-orm';
import { create } from 'zustand';
import { defaultEmailCategories } from '~/constants/EmailCategories';
import { db } from '~/db/drizzle';
import { emailCategories, EmailCategoriesType, emails } from '~/db/schema';

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

type TEmailCategory = {
    name: string;
    keywords: string[];
    senderMatch?: string[];
    labelMatch?: string[];
};

type EmailCategoryStore = {
    categories: TEmailCategory[];
    setCategories: (cats: TEmailCategory[]) => void;
    addCategory: (cat: TEmailCategory) => void;
    removeCategory: (name: string) => void;
};

export const useStore = create<EmailState & EmailCategoryStore>((set, get) => ({
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

    // -------------------------------------------

    categories: [],

    setCategories: async (cats) => {
        set({ categories: cats });

        // for (const cat of cats) {
        //     await db.insert(emailCategories).values({
        //         name: cat.name,
        //         keywords: JSON.stringify(cat.keywords),
        //         senderMatch: JSON.stringify(cat.senderMatch),
        //         labelMatch: JSON.stringify(cat.labelMatch || []),
        //     });
        // }
    },

    addCategory: async (cat) => {
        set((prev) => ({ categories: [...prev.categories, cat] }));

        await db
            .insert(emailCategories)
            .values({
                name: cat.name,
                keywords: JSON.stringify(cat.keywords),
                senderMatch: JSON.stringify(cat.senderMatch),
                labelMatch: JSON.stringify(cat.labelMatch),
            })
            .onConflictDoNothing();
    },

    removeCategory: async (name) => {
        set((prev) => ({
            categories: prev.categories.filter((c) => c.name !== name),
        }));

        await db.delete(emailCategories).where(eq(emailCategories.name, name));
    },
}));
