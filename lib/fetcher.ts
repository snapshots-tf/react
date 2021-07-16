import { NextApiRequestCookies } from 'next/dist/next-server/server/api-utils';

const swrFetcher = (url: any) =>
    fetch(url, { credentials: 'include' }).then((r) => r.json());

const fetcher = (
    endpoint: string,
    method = 'GET',
    useCredentials: boolean = true,
    cookies: NextApiRequestCookies | null = null,
    snapshotKey: string | null = null
) => {
    const url = `${
        process.env.NEXT_PUBLIC_API_URL || 'https://api.snapshots.tf'
    }${endpoint}`;

    const data: RequestInit = {
        method,
        credentials: useCredentials ? 'include' : 'omit',
        headers: {},
    };

    if (cookies) {
        // @ts-ignore
        data.headers['cookie'] = 'snapshots.tf=' + cookies['snapshots.tf'];
    }

    if (snapshotKey) {
        // @ts-ignore
        data.headers['SNAPSHOT_KEY'] = snapshotKey;
    }

    return fetch(url, data)
        .then((r) => r.json())
        .then((r) => {
            return [r, null];
        })
        .catch((err) => {
            return [null, err];
        });
};

export { swrFetcher, fetcher };