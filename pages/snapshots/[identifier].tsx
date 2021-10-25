import { GetServerSideProps } from 'next';
import { Switch } from '@headlessui/react';
import Link from 'next/link';
import { FC, useState, useEffect } from 'react';
import SEO from '../../components/SEO';
import { classNames } from '../../lib/helpers';
import { ViewGridIcon, ViewListIcon } from '@heroicons/react/solid';

interface SnapshotOverview {
    name: string;
    sku: string;
    overview: {
        id: string;
        savedAt: number;
        listingsAmount: number;
    }[];
}

const ViewSwitch: FC<{ onChange: (enabled: boolean) => void }> = ({
    onChange,
}) => {
    const [enabled, setEnabled] = useState(false);
    const [skipFirst, setSkipFirst] = useState(false);

    useEffect(() => {
        setEnabled(localStorage.getItem('enabledNewView') === 'true');
        onChange(localStorage.getItem('enabledNewView') === 'true');
    }, []);

    useEffect(() => {
        if (skipFirst === false) {
            setSkipFirst(true);
            return;
        }
        localStorage.setItem('enabledNewView', enabled ? 'true' : 'false');
        onChange(enabled);
    }, [enabled]);

    return (
        <Switch
            checked={enabled}
            onChange={setEnabled}
            className={classNames(
                enabled ? 'bg-indigo-600' : 'bg-gray-200',
                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            )}
        >
            <span className="sr-only">Use setting</span>
            <span
                className={classNames(
                    enabled ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                )}
            >
                <span
                    className={classNames(
                        enabled
                            ? 'opacity-0 ease-out duration-100'
                            : 'opacity-100 ease-in duration-200',
                        'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
                    )}
                    aria-hidden="true"
                >
                    <ViewListIcon className="h-3 w-3 text-gray-900" />
                </span>
                <span
                    className={classNames(
                        enabled
                            ? 'opacity-100 ease-in duration-200'
                            : 'opacity-0 ease-out duration-100',
                        'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
                    )}
                    aria-hidden="true"
                >
                    <ViewGridIcon className="h-3 w-3 text-gray-900" />
                </span>
            </span>
        </Switch>
    );
};

const Identifier: FC<{ snapshots: SnapshotOverview }> = ({ snapshots }) => {
    const [newViewEnabled, setNewViewEnabled] = useState(false);

    return (
        <div>
            <SEO
                title={'Snapshots for ' + snapshots.name + ' - Snapshots.TF'}
                description="Have you ever dreamed of getting to know what backpack.tf listings looked like 1 month ago? Well here is your chance to see!"
            ></SEO>

            <div className="text-center">
                <div className="static lg:absolute font-medium text-sm text-gray-50 hover:text-white">
                    <p>{newViewEnabled ? 'Use table view' : 'Use grid view'}</p>
                    <div className="flex lg:justify-start justify-center">
                        <ViewSwitch
                            onChange={(enabled) => {
                                setNewViewEnabled(enabled);
                            }}
                        />
                    </div>
                </div>

                <h1 className="text-3xl font-semibold">
                    Snapshots for {snapshots.name}
                </h1>
                <p className="text-base font-medium">
                    Found {snapshots.overview.length} snapshots for this item!
                </p>

                <div
                    className={
                        newViewEnabled ? 'flex justify-center flex-wrap' : ''
                    }
                >
                    {snapshots.overview.map((overview, index) => {
                        if (!newViewEnabled)
                            return (
                                <Link
                                    href={'/snapshot/' + overview.id}
                                    key={overview.id}
                                >
                                    <a className="text-gray-50 hover:text-indigo-200">
                                        <p className="my-2">
                                            {overview.id} -{' '}
                                            {new Date(
                                                Math.round(
                                                    overview.savedAt * 1000
                                                )
                                            ).toLocaleString()}
                                        </p>
                                    </a>
                                </Link>
                            );
                        else
                            return (
                                <Link
                                    href={'/snapshot/' + overview.id}
                                    key={overview.id}
                                >
                                    <div className="cursor-pointer bg-gray-850 hover:bg-gray-900 border-2 border-transparent hover:border-gray-500 fast-transition rounded-md h-24 w-72 m-2 p-2 text-left">
                                        <h3 className="text-2xl text-gray-50 font-medium snapshot-num">
                                            #{snapshots.overview.length - index}
                                        </h3>
                                        <p className="text-base">
                                            {overview.listingsAmount} Listing(s)
                                        </p>
                                        <span className="text-sm text-gray-300">
                                            {new Date(
                                                Math.round(
                                                    overview.savedAt * 1000
                                                )
                                            ).toLocaleString()}
                                        </span>
                                    </div>
                                </Link>
                            );
                    })}
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { identifier } = context.query;

    let notFound = false;

    const res = await fetch(
        `${
            process.env.NEXT_PUBLIC_API_URL || 'https://api.snapshots.tf'
        }/snapshots/overview/sku/${identifier}`
    ).then((res) => {
        if (res.status > 300) {
            notFound = true;
        }
        return res;
    });

    if (notFound) return { notFound };

    const data = await res.json();

    // Pass data to the page via props
    return { props: { snapshots: data } };
};

export default Identifier;
