export const emailCategories = [
    {
        name: 'IMPORTANT',
        keywords: [
            'urgent',
            'deadline',
            'exam',
            'important',
            'result',
            'grades',
            'submission',
            'placement',
        ],
        labelMatch: ['IMPORTANT'],
        senderMatch: ['academics'],
    },
    {
        name: 'CLUBS',
        keywords: [
            'club',
            'meeting',
            'event',
            'workshop',
            'hackathon',
            'seminar',
            'competition',
        ],
        senderMatch: ['club'],
    },
    {
        name: 'MESS',
        keywords: ['mess', 'menu', 'lunch', 'dinner', 'breakfast', 'food'],
        senderMatch: ['mess'],
    },
    {
        name: 'SPORTS',
        keywords: [
            'sports',
            'match',
            'tournament',
            'cricket',
            'football',
            'badminton',
        ],
        senderMatch: ['sports'],
    },
];
