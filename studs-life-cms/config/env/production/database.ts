
import { parse } from 'pg-connection-string';
import dns from 'node:dns';

// Force IPv4 ordering to prevent ENETUNREACH errors on networks with partial IPv6 support (like Render contacting Supabase)
dns.setDefaultResultOrder('ipv4first');

export default ({ env }) => {
    const { host, port, database, user, password } = parse(env('DATABASE_URL'));

    return {
        connection: {
            client: 'postgres',
            connection: {
                host,
                port,
                database,
                user,
                password,
                ssl: { rejectUnauthorized: false },
            },
            debug: false,
        },
    };
};
