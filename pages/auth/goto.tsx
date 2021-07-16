import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { swrFetcher } from '../../lib/fetcher';

export default function Home(
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
    const { data, error } = useSWR(
        `${process.env.NEXT_PUBLIC_API_URL || 'https://api.snapshots.tf'}/me`,
        swrFetcher
    );

    if (error) {
        console.log('failed');
        return <p>failed</p>;
    }
    if (!data) {
        console.log('loading');
        return <p>loading...</p>;
    }

    console.log('Set user');
    localStorage.setItem('user', JSON.stringify(data));

    const router = useRouter();

    router.push('/');

    return <span>Redirecting</span>;
}

export const getServerSideProps: GetServerSideProps = async ({
    req,
    query,
}) => {
    // @ts-ignore
    req.cookies = query.cookie.toString();

    console.log('Set cookies', req.cookies);

    return {
        props: {},
    };
};
