import { GetServerSideProps } from 'next';
import Cookies from 'cookies';

export default function Logout() {
    return <span></span>;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const cookies = Cookies(req, res);

    cookies.set('snapshots.tf');

    return {
        redirect: {
            destination: '/',
            permanent: true,
        },
    };
};
