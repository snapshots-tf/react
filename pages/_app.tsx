import '../styles/globals.css';
import 'tailwindcss/tailwind.css';

import nookies from 'nookies';
import App, { AppContext } from 'next/app';
import type { AppProps } from 'next/app';

import NextNprogress from 'nextjs-progressbar';
import Sidenav from '../components/Sidenav';

import { Confirm } from 'notiflix';
import React, { useEffect } from 'react';

import * as gtag from '../lib/gtag';
import { useRouter } from 'next/router';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import Alert from '../components/Alert';

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

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            gtag.pageview(url);
        };
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    return (
        <div>
            <NextNprogress
                color="#0000ff"
                startPosition={0}
                stopDelayMs={200}
                height={5}
                showOnShallow={true}
            />
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
