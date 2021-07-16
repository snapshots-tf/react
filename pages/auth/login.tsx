import { GetServerSideProps } from 'next';

export default function Login() {
    return <span></span>;
}

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        redirect: {
            destination:
                (process.env.NEXT_PUBLIC_API_URL ||
                    'https://api.snapshots.tf') + '/auth/steam',
            permanent: false,
        },
    };
};
