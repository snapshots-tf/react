import '../styles/globals.css';
import 'tailwindcss/tailwind.css';

import nookies from 'nookies';
import App, { AppContext } from 'next/app';
import type { AppProps } from 'next/app';

import Sidenav from '../components/Sidenav';

import { Confirm } from 'notiflix';
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import Alert from '../components/Alert';
import FullpageLoader from '../components/FullpageLoader';

function MyApp({
    Component,
    pageProps,
    userData,
}: AppProps & { userData: any }) {
    useEffect(() => {
        Confirm.init({
            titleColor: '#000000',
            titleFontSize: '20px',
            fontFamily: 'Quicksand',
            cancelButtonBackground: '#ff0e0e',
            cancelButtonColor: '#ffffff',
            okButtonColor: '#ffffff',
        });
    }, []);

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleStart = (url: string) =>
            url !== router.asPath && setLoading(true);
        const handleComplete = (url: string) =>
            url === router.asPath && setLoading(false);

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', () => {
            setLoading(false);
        });
        router.events.on('routeChangeError', handleComplete);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        };
    });

    return (
        <div>
            {!loading && <FullpageLoader />}
            <Sidenav userData={userData}>
                <Alert alert={{ type: 'warn', icon: ExclamationCircleIcon }}>
                    Snapshots.tf will be closing down due to lack of funding.
                    Would you like to help keep the project alive? Please
                    contact aethez#6403 to support the project!
                </Alert>

                <Component {...pageProps} userData={userData} />
            </Sidenav>
        </div>
    );
}

MyApp.getInitialProps = async (context: AppContext) => {
    const appProps = await App.getInitialProps(context);

    let userData;
    try {
        const user = JSON.parse(nookies.get(context.ctx)['snptf_user']);

        if (user) userData = user;
    } catch (err) {
        try {
            const parseCookie = (str: string) =>
                str
                    .split(';')
                    .map((v: string) => v.split('='))
                    .reduce((acc, v) => {
                        // @ts-ignore
                        acc[decodeURIComponent(v[0].trim())] =
                            decodeURIComponent(v[1].trim());
                        return acc;
                    }, {});

            const cookie = parseCookie(document.cookie) as {
                snptf_user: string | undefined;
            };

            if (cookie['snptf_user']) {
                userData = JSON.parse(decodeURIComponent(cookie['snptf_user']));
            }
        } catch (err) {}
    }

    return {
        ...appProps,
        userData,
    };
};

export default MyApp;
