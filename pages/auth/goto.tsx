import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Cookies from 'cookies';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher, swrFetcher } from '../../lib/fetcher';

export default function Home(
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
    const { data, error } = useSWR(
        `${process.env.NEXT_PUBLIC_API_URL || 'https://api.snapshots.tf'}/me`,
        swrFetcher
    );

    const router = useRouter();

    if (error) {
        console.log('failed');
        return <p>failed</p>;
    }
    if (!data) {
        console.log('loading');
        return <p>loading...</p>;
    }

    console.log('', { data, error });

    console.log('Set user');
    localStorage.setItem('user', JSON.stringify(data));

    router.push('/');

    return <span>Redirecting</span>;
}

export const getServerSideProps: GetServerSideProps = async ({
    req,
    res,
    query,
}) => {
    // @ts-ignore
    req.cookies = query.cookie.toString();

    return {
        props: {},
    };
};
