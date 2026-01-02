import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Student's Life",
        short_name: "Studs Life",
        description: "Study Abroad, Visa & Travel Services",
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#1e3a8a', // Navy blue from the project
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    };
}
