import { KeyIcon, TrashIcon } from '@heroicons/react/outline';
import nookies from 'nookies';
import {
    AnnotationIcon,
    RefreshIcon,
    UploadIcon,
} from '@heroicons/react/solid';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Confirm, Notify } from 'notiflix';
import { FunctionComponent, useEffect, useState } from 'react';

import Alert from '../components/Alert';

import { fetcher } from '../lib/fetcher';
import SEO from '../components/SEO';

const Profile: FunctionComponent<{
    user: { avatar: string; name: string; steamID64: string };
    apiKey: string;
}> = ({ user, apiKey }) => {
    const [showAPIKey, changeShowAPIKey] = useState(false);
    const [testDefindex, changeTestDefindex] = useState<string>('');
    const [isTesting, changeIsTesting] = useState(false);

    const router = useRouter();

    async function testAPIKey(): Promise<void> {
        if (testDefindex === '') return;

        changeIsTesting(true);

        const [data, error] = await fetcher(
            '/request/' + testDefindex,
            'POST',
            true,
            null,
            apiKey
        );

        changeIsTesting(false);
        if (error) {
            Notify.failure(
                'Failed to request that item to be snapshotted, the web server might be down!',
                {
                    timeout: 3000,
                }
            );
        } else {
            if (data.statusCode) {
                Notify.failure(
                    'Failed to request that item to be snapshotted: ' +
                        data.message,
                    { timeout: 3000 }
                );
            } else
                Notify.success(
                    'Successfully requested that item to be snapshotted!',
                    { timeout: 3000 }
                );
        }
    }

    async function requestAPIKey(): Promise<void> {
        console.log('Requesting');

        const [data, error] = await fetcher(`/me/api-key/create`, 'POST', true);

        if (error) {
            Notify.failure(
                'Failed to create API Key, the web server might be down!',
                { timeout: 3000 }
            );
        } else router.reload();
    }

    function revokeAPIKey(): void {
        Confirm.show(
            'Revoke API Key?',
            'Are you sure you want to revoke your API key? You can still create one later.',
            'Yes',
            'No',
            async () => {
                const [data, error] = await fetcher(
                    `/me/api-key/revoke`,
                    'POST',
                    true
                );

                if (error) {
                    Notify.failure(
                        'Failed to revoke API Key, the web server might be down!',
                        { timeout: 3000 }
                    );
                } else router.reload();
            }
        );
    }

    return (
        <div>
            <SEO title="Profile - Snapshots.TF" description="Your profile!" />
            <div className="flex w-full bg-gray-900 rounded-lg p-2 mb-1">
                <Image
                    src={user.avatar}
                    width="150"
                    height="150"
                    className="rounded-full"
                    alt=""
                />
                <div className="flex-center ml-1">
                    <h2 className="text-2xl font-semibold">{user.name}</h2>
                </div>
            </div>

            <div className="w-full bg-gray-900 rounded-lg p-2 my-1">
                <div className="flex">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        DEV
                    </span>
                    <div className="flex-center pb-1">
                        <h5 className="text-xl ml-1">API Key</h5>
                    </div>
                </div>

                <p className="leading-1 text-base text-gray-100 pl-1">
                    API Keys are only used for requesting an item to get a
                    snapshot. You request snapshots via defindexes!
                </p>

                {apiKey ? (
                    <div>
                        <div className="mt-1">
                            <input
                                type={showAPIKey ? 'text' : 'password'}
                                className="shadow-sm text-gray-50 bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-900 px-4 rounded-md"
                                readOnly={true}
                                value={apiKey}
                                onClick={() => {}}
                            />

                            <div className="mt-2 flex gap-1">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={() =>
                                        changeShowAPIKey(!showAPIKey)
                                    }
                                >
                                    <KeyIcon
                                        className="-ml-1 mr-3 h-5 w-5"
                                        aria-hidden="true"
                                    />
                                    {showAPIKey
                                        ? 'Hide API Key'
                                        : 'Show API Key'}
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    onClick={revokeAPIKey}
                                >
                                    <TrashIcon
                                        className="-ml-1 mr-3 h-5 w-5"
                                        aria-hidden="true"
                                    />
                                    Revoke API Key
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="mt-2">
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={requestAPIKey}
                        >
                            <KeyIcon
                                className="-ml-1 mr-3 h-5 w-5"
                                aria-hidden="true"
                            />
                            Request an API Key
                        </button>
                    </div>
                )}
            </div>
            {apiKey ? (
                <div className="w-full bg-gray-900 rounded-lg p-2 my-1">
                    <div>
                        <h5 className="text-xl ml-1">Test Your API Key</h5>

                        <input
                            type="text"
                            className="shadow-sm text-gray-50 bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-900 px-4 rounded-md"
                            value={testDefindex}
                            onChange={(el) =>
                                changeTestDefindex(el.target.value)
                            }
                            placeholder="Item Defindex"
                        />

                        <div className="mt-1">
                            <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={testAPIKey}
                            >
                                {isTesting ? (
                                    <RefreshIcon
                                        className="-ml-1 mr-3 h-5 w-5 animate-spin"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <UploadIcon
                                        className="-ml-1 mr-3 h-5 w-5"
                                        aria-hidden="true"
                                    />
                                )}
                                Test
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { req, res } = ctx;

    if (!req.cookies)
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };

    const cookies = nookies.get(ctx);

    if (!cookies) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    const [data, userError] = await fetcher(
        '/me',
        'GET',
        false,
        cookies['snapshots.tf']
    );

    if (userError || data.statusCode === 401) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    const [{ key, statusCode }, apiKeyError] = await fetcher(
        `/me/api-key`,
        'GET',
        false,
        cookies['snapshots.tf']
    );

    if (apiKeyError || (statusCode && statusCode === 401)) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {
            user: data,
            apiKey: key,
        },
    };
};

export default Profile;
