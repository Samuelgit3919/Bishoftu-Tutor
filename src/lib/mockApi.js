const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const initialJobs = [
    {
        id: 'job-1',
        title: 'High School Mathematics Tutor Needed',
        subject: 'Mathematics',
        level: 'High School (Grade 10-12)',
        description: 'Looking for an experienced math tutor to help my son prepare for the national exams. Focus on Calculus and Geometry.',
        schedule: 'Weekends, 4 hours total',
        budget: '500-700 ETB / hour',
        location: 'Addis Ababa (Bole area) or Online',
        preferred_language: 'am',
        status: 'open',
        created_date: new Date(Date.now() - 2 * 86400000).toISOString(),
    },
    {
        id: 'job-2',
        title: 'English Language Practice',
        subject: 'English',
        level: 'Adult / Beginner',
        description: 'Need a patient tutor for conversational English practice. I want to improve my speaking confidence for work.',
        schedule: 'Tuesday and Thursday evenings',
        budget: 'Negotiable',
        location: 'Online',
        preferred_language: 'en',
        status: 'open',
        created_date: new Date(Date.now() - 1 * 86400000).toISOString(),
    },
    {
        id: 'job-3',
        title: 'Physics & Chemistry Tutor',
        subject: 'Science',
        level: 'Middle School',
        description: 'Seeking a tutor who can explain scientific concepts simply and clearly to a 7th grader.',
        schedule: 'Any weekday afternoon',
        budget: '400 ETB / hour',
        location: 'Bishoftu',
        preferred_language: 'or',
        status: 'open',
        created_date: new Date().toISOString(),
    },
    {
        id: 'job-4',
        title: 'Programming Basics (Python)',
        subject: 'Computer Science',
        level: 'University Freshman',
        description: 'Need help understanding programming concepts and completing introductory college assignments.',
        schedule: 'Flexible',
        budget: '600 ETB / hour',
        location: 'Online',
        preferred_language: 'en',
        status: 'filled',
        created_date: new Date(Date.now() - 10 * 86400000).toISOString(),
    }
];

// Seed local storage if empty
if (!localStorage.getItem('mastenat_PostedJob')) {
    localStorage.setItem('mastenat_PostedJob', JSON.stringify(initialJobs));
}
if (!localStorage.getItem('mastenat_TutorRequest')) {
    localStorage.setItem('mastenat_TutorRequest', JSON.stringify([]));
}
if (!localStorage.getItem('mastenat_TutorApplication')) {
    localStorage.setItem('mastenat_TutorApplication', JSON.stringify([]));
}
if (!localStorage.getItem('mastenat_Tutor')) {
    localStorage.setItem('mastenat_Tutor', JSON.stringify([]));
}

const getStorage = (key) => JSON.parse(localStorage.getItem(`mastenat_${key}`) || '[]');
const setStorage = (key, data) => localStorage.setItem(`mastenat_${key}`, JSON.stringify(data));

const createMockEntity = (entityName) => ({
    list: async (sortBy = '-created_date', limit = 100) => {
        await delay(400);
        const data = getStorage(entityName);
        return data.sort((a, b) => new Date(b.created_date) - new Date(a.created_date)).slice(0, limit);
    },
    create: async (data) => {
        await delay(500);
        const items = getStorage(entityName);
        const newItem = {
            id: `${entityName.toLowerCase()}-${Date.now()}`,
            status: 'pending', // Default status for requests/applications
            ...data,
            created_date: new Date().toISOString()
        };
        setStorage(entityName, [...items, newItem]);
        return newItem;
    },
    update: async (id, updateData) => {
        await delay(400);
        const items = getStorage(entityName);
        const index = items.findIndex(j => j.id === id);
        if (index > -1) {
            items[index] = { ...items[index], ...updateData };
            setStorage(entityName, items);
            return items[index];
        }
        throw new Error('Not found');
    },
    delete: async (id) => {
        await delay(400);
        const items = getStorage(entityName).filter(j => j.id !== id);
        setStorage(entityName, items);
        return true;
    }
});

export const mockDatabase = {
    entities: {
        PostedJob: createMockEntity('PostedJob'),
        TutorRequest: createMockEntity('TutorRequest'),
        TutorApplication: createMockEntity('TutorApplication'),
        Tutor: createMockEntity('Tutor'),
    }
};

export const mockAuth = {
    me: async () => {
        await delay(300);
        const token = localStorage.getItem('mastenat_auth_token');
        if (token === 'admin-mock-token') {
            return {
                id: 'admin_1',
                email: 'admin@tutorhub.com',
                full_name: 'System Admin',
                role: 'administrator'
            };
        }
        throw new Error('Unauthorized');
    },
    login: async (email, password) => {
        await delay(800);
        if (email.includes('admin') && password === 'admin123') {
            localStorage.setItem('mastenat_auth_token', 'admin-mock-token');
            return true;
        }
        throw new Error('Invalid email or password. Use admin / admin123 to log in.');
    },
    logout: async () => {
        await delay(200);
        localStorage.removeItem('mastenat_auth_token');
        if (window.location.pathname.startsWith('/admin')) {
             window.location.href = '/login';
        } else {
             window.location.reload();
        }
    }
};
