import { GetServerSideProps } from 'next';
import nookies from 'nookies';

export default function Home() {
    return <div>Please wait</div>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const me = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'https://api.snapshots.tf'}/me`,
        {
            headers: {
                Cookie: 'snapshots.tf=' + ctx.req.cookies['snapshots.tf'],
            },
        }
    ).then((res) => res.json());

    nookies.set(ctx, 'snptf_user', JSON.stringify(me), {
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
    });

    return {
        redirect: {
            permanent: true,
            destination: '/',
        },
    };
};
