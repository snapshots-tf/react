import '../styles/globals.css';
import 'tailwindcss/tailwind.css';

import Cookies from 'cookies';

import App, { AppContext } from 'next/app';
import type { AppProps } from 'next/app';

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
        <Sidenav hasCookies={hasCookies}>
            <Component {...pageProps} hasCookies={hasCookies} />
        </Sidenav>
    );
}

MyApp.getInitialProps = async (context: AppContext) => {
    const appProps = await App.getInitialProps(context);

    // @ts-ignore
    const hasCookies = Cookies(context.ctx.req, context.ctx.res).get(
        'snapshots.tf'
    );

    return {
        ...appProps,
        hasCookies,
    };
};

export default MyApp;
