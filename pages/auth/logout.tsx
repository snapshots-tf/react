import { GetServerSideProps } from 'next';
import nookies from 'nookies';

export default function Logout() {
    return <span></span>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    nookies.destroy(ctx, 'snptf_user');
    nookies.destroy(ctx, 'snapshots.tf');

    return {
        redirect: {
            destination: '/',
            permanent: true,
        },
    };
};
