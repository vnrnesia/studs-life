import {
    Building2,
    Users,
    Briefcase,
    BookOpen,
    LayoutGrid,
    Globe,
    GraduationCap
} from 'lucide-react';

export const companyLinks = [
    {
        icon: Building2,
        titleKey: 'about',
        descKey: 'aboutDesc',
        href: '/about'
    },
    {
        icon: Users,
        titleKey: 'team',
        descKey: 'teamDesc',
        href: '/teams'
    },
    {
        icon: Briefcase,
        titleKey: 'careers',
        descKey: 'careersDesc',
        href: '/#contact'
    },
    {
        icon: LayoutGrid,
        titleKey: 'services',
        descKey: 'servicesDesc',
        href: '/services'
    },
    {
        icon: BookOpen,
        titleKey: 'blog',
        descKey: 'blogDesc',
        href: '/blog'
    }
];

export const trustBadges = [
    { name: 'Clutch', rating: '4.9' },
    { name: 'Gartner', rating: '4.8' }
];

export const ceoProfile = {
    name: "ogrenci",
    roleKey: "ceoRole",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    quoteKey: "ceoQuote"
};
