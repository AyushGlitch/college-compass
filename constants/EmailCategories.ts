export const defaultEmailCategories = [
    {
        name: 'IMPORTANT',
        keywords: [
            'urgent',
            'deadline',
            'exam',
            'important',
            'result',
            'grades',
            'placement',
            'interview',
            'scholarship',
            'fee payment',
            'registration',
            'verification',
            'document',
            'certificate',
            'final',
            'warning',
            'notice',
            'last date',
            'due date',
            'compulsory',
            'mandatory',
        ],
        labelMatch: ['IMPORTANT', 'PRIORITY'],
        senderMatch: [
            'academics',
            'registrar',
            'dean',
            'examination',
            'placement',
        ],
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
            'audition',
            'tryout',
            'session',
            'guest lecture',
            'webinar',
            'conference',
            'symposium',
            'cultural',
            'fest',
            'technical',
            'recruitment',
            'volunteer',
            'team',
            'chapter',
            'community',
            'photography',
            'film',
        ],
        senderMatch: [
            'club',
            'society',
            'chapter',
            'community',
            'clairvoyance',
        ],
    },
    {
        name: 'MESS',
        keywords: [
            'mess',
            'menu',
            'lunch',
            'dinner',
            'breakfast',
            'food',
            'meal',
            'catering',
            'diet',
            'dues',
            'nutrition',
            'vegetarian',
            'non-veg',
            'special meal',
            'holiday schedule',
            'timing change',
            'payment',
        ],
        senderMatch: ['mess', 'cafeteria', 'dining'],
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
            'basketball',
            'volleyball',
            'athletics',
            'gym',
            'yoga',
            'training',
            'selection',
            'trial',
            'fixture',
            'schedule',
            'coach',
            'fitness',
            'intramural',
            'varsity',
            'championship',
            'league',
        ],
        senderMatch: ['sports', 'athletics', 'gym'],
    },
    {
        name: 'ACADEMICS',
        keywords: [
            'lecture',
            'tutorial',
            'lab',
            'assignment',
            'project',
            'thesis',
            'research',
            'paper',
            'publication',
            'journal',
            'reference',
            'curriculum',
            'syllabus',
            'course',
            'elective',
            'credit',
            'attendance',
            'faculty',
            'advisor',
            'supervisor',
            'extension',
            'revision',
            'review',
        ],
        senderMatch: ['academics', 'department', 'faculty', 'professor', 'hod'],
    },
    {
        name: 'ADMINISTRATIVE',
        keywords: [
            'fee',
            'payment',
            'receipt',
            'hostel',
            'transport',
            'bus',
            'id card',
            'library',
            'fine',
            'dues',
            'clearance',
            'form',
            'application',
            'request',
            'approval',
            'permission',
            'leave',
            'complaint',
            'grievance',
            'facility',
            'maintenance',
            'repair',
        ],
        senderMatch: ['admin', 'accounts', 'hostel', 'transport', 'library'],
    },

    {
        name: 'CAREER',
        keywords: [
            'job',
            'internship',
            'opportunity',
            'recruitment',
            'drive',
            'opening',
            'vacancy',
            'referral',
            'alumni',
            'network',
            'resume',
            'cv',
            'linkedin',
            'profile',
            'training',
            'skill',
            'workshop',
            'preparation',
            'mock',
            'interview',
            'offer',
            'package',
        ],
        senderMatch: ['placement', 'career', 'tpo', 'alumni'],
    },
    {
        name: 'COMPLAINTS',
        keywords: [
            'complaint',
            'issue',
            'problem',
            'grievance',
            'concern',
            'dissatisfaction',
            'report',
            'feedback',
            'redressal',
            'wrong',
            'mistake',
            'error',
            'fault',
            'bug',
            'glitch',
            'not working',
            'broken',
            'failed',
            'unsatisfactory',
            'poor quality',
            'bad service',
            'delay',
            'late',
            'missing',
            'not received',
            'incorrect',
            'inappropriate',
            'harassment',
            'discrimination',
            'unfair',
            'unacceptable',
            'resolve',
            'fix',
            'rectify',
            'compensate',
            'refund',
        ],
        senderMatch: [
            'complaint',
            'grievance',
            'feedback',
            'support',
            'helpdesk',
            'admin',
            'authority',
            'committee',
        ],
        labelMatch: ['COMPLAINT', 'REPORT', 'ISSUE'],
    },
    {
        name: 'EVENTS',
        keywords: [
            'invitation',
            'ceremony',
            'convocation',
            'graduation',
            'farewell',
            'welcome',
            'orientation',
            'inauguration',
            'annual day',
            'reunion',
            'celebration',
            'holiday',
            'diwali',
            'holi',
            'christmas',
            'republic day',
            'independence day',
            'cultural night',
            'concert',
            'performance',
        ],
        senderMatch: ['events', 'cultural'],
    },
    {
        name: 'LIBRARY',
        keywords: [
            'book',
            'issue',
            'return',
            'renew',
            'due',
            'fine',
            'resource',
            'journal',
            'access',
            'database',
            'catalog',
            'reservation',
            'reference',
            'study',
            'material',
            'proquest',
            'ieee',
            'springer',
            'research',
            'paper',
        ],
        senderMatch: ['library'],
    },
    {
        name: 'HOSTEL',
        keywords: [
            'hostel',
            'room',
            'allotment',
            'vacate',
            'maintenance',
            'laundry',
            'visitor',
            'curfew',
            'rules',
            'ra',
            'warden',
            'inspection',
            'electricity',
            'water',
            'complaint',
            'leave',
            'outing',
            'parent',
            'guardian',
            'permission',
        ],
        senderMatch: ['hostel', 'warden'],
    },
];
