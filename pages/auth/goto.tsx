import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import nookies, { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher, swrFetcher } from '../../lib/fetcher';

export default function Home(
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
    const cookies = parseCookies();

    const router = useRouter();

    fetcher('/me', 'GET', true, cookies['snapshots.tf']).then(
        ([data, error]) => {
            if (error) {
                console.log('failed');
                return <p>failed</p>;
            }
            if (!data) {
                console.log('loading');
                return <p>loading...</p>;
            }
            try {
                localStorage.setItem('user', JSON.stringify(data));

                console.log('Set user: ' + JSON.stringify(data));
            } catch (err) {}

            router.push('/?profile=true');

            return <span>Redirecting</span>;
        }
    );

    return <span>Fetching</span>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    if (!ctx.query.cookie) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    nookies.set(ctx, 'snapshots.tf', ctx.query.cookie.toString(), {
        path: '/',
        maxAge: 1209600000,
    });

    return {
        props: {},
    };
};
