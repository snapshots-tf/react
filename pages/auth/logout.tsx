import { GetServerSideProps } from 'next';

export default function Logout() {
    return <span></span>;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    req.headers.cookie = undefined;
    // @ts-ignore
    req.cookies = undefined;

    return {
        redirect: {
            destination: '/',
            permanent: true,
        },
    };
};
