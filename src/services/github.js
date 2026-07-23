// src/services/github.js

// 1. Paste it at the top
const processLanguageData = (rawLanguages) => {
    const totalBytes = Object.values(rawLanguages).reduce((a, b) => a + b, 0);
    if (totalBytes === 0) return [];
    return Object.entries(rawLanguages)
        .map(([name, bytes]) => ({
            name,
            percentage: Math.round((bytes / totalBytes) * 100),
        }))
        .sort((a, b) => b.percentage - a.percentage);
};

// 2. Use it inside your export function
export const fetchUserLanguages = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await response.json();

    // ... logic to grab language bytes ...
    const rawLanguages = { JavaScript: 50000, HTML: 20000 };

    // Format before returning it to the component!
    return processLanguageData(rawLanguages);
};