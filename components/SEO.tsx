import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOProps {
    title: string;
    image?: string;
    description: string;
}

export default function SEO({ title, image, description }: SEOProps) {
    return (
        <Head>
            <title>{title}</title>

            <link
                data-n-head="ssr"
                rel="icon"
                type="image/x-icon"
                href="/favicon.ico"
            />

            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <meta
                data-n-head="ssr"
                data-hid="theme-color"
                property="theme-color"
                content="#282b33"
            />
            <meta charSet="utf-8" />
            <meta name="description" content={description} />

            <meta
                property="og:url"
                content="https://app.snapshots.tf/"
                key="ogurl"
            />
            {image ? (
                <meta property="og:image" content={image} key="ogimage" />
            ) : (
                ''
            )}

            <meta
                property="og:site_name"
                content="Snapshots.TF"
                key="ogsitename"
            />
            <meta property="og:title" content={title} key="ogtitle" />
            <meta
                property="og:description"
                content={description}
                key="ogdesc"
            />
        </Head>
    );
}
