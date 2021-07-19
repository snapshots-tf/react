import '../styles/globals.css';
import 'tailwindcss/tailwind.css';

import App, { AppContext } from 'next/app';
import type { AppProps } from 'next/app';

import NextNprogress from 'nextjs-progressbar';
import Sidenav from '../components/Sidenav';

import { Confirm } from 'notiflix';
import { useEffect } from 'react';

function MyApp({
    Component,
    pageProps,
    hasCookies,
}: AppProps & { hasCookies: boolean }) {
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

    return (
        <div>
            <NextNprogress
                color="#0000ff"
                startPosition={0}
                stopDelayMs={200}
                height={5}
                showOnShallow={true}
            />
            <Sidenav hasCookies={hasCookies}>
                <Component {...pageProps} hasCookies={hasCookies} />
            </Sidenav>
        </div>
    );
}

MyApp.getInitialProps = async (context: AppContext) => {
    const appProps = await App.getInitialProps(context);

    // @ts-ignore
    const hasCookies = true;

    return {
        ...appProps,
        hasCookies,
    };
};

export default MyApp;
