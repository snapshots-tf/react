import Link from 'next/link';
import Head from 'next/head';

import { InformationCircleIcon } from '@heroicons/react/outline';

import Sidenav from '../components/Sidenav';
import Alert from '../components/Alert';
import SnapshotStatistics from '../components/SnapshotStatistics';
import SEO from '../components/SEO';
import Input from '../components/Input';
import { useState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/solid';

const fetcher = (url: any) => fetch(url).then((r) => r.json());

export default function Home() {
    return (
        <Sidenav>
            <SEO
                title="Backpack.tf Information Collection - Snapshots.TF"
                description="Backpack.tf listing snapshots with an intuitive api and website."
            ></SEO>

            <Alert alert={{ icon: InformationCircleIcon, type: 'info' }}>
                Please report all bugs in our discord.
            </Alert>

            <div className="mt-2">
                <SnapshotStatistics></SnapshotStatistics>
            </div>

            <div className="mt-2">
                <SearchComponent></SearchComponent>
            </div>
        </Sidenav>
    );
}

function SearchComponent() {
    const [searchResult, changeSearchResult] = useState<
        { name: string; sku: string }[]
    >([]);
    const [failed, changeFailed] = useState<boolean>(false);

    const [hasSearched, changeHasSearched] = useState<boolean>(false);

    const handleSearchChange = (change: string) => {
        if (change.length < 2) return;

        fetcher('https://api.snapshots.tf/search/' + change)
            .then((data) => {
                changeSearchResult(data.results);
                changeHasSearched(true);
            })
            .catch((err) => {
                changeHasSearched(false);
                changeFailed(true);
            });
    };

    return (
        <div>
            <h1 className="text-xl leading-6 text-white font-semibold">
                Search Snapshots
            </h1>

            <Input
                label="Item Name"
                placeholder="Mann Co. Supply Crate Key"
                onChange={handleSearchChange}
                useTimeout={true}
                timeoutMS={600}
            ></Input>

            <div className="mt-3">
                {failed === true ? (
                    <Alert
                        alert={{ type: 'error', icon: ExclamationCircleIcon }}
                    >
                        An error occured whilst trying to search the item.
                    </Alert>
                ) : (
                    <span></span>
                )}

                {hasSearched && searchResult.length === 0 ? (
                    <p>No results found 😭</p>
                ) : (
                    ''
                )}

                <div className="flex flex-wrap gap-1">
                    {searchResult.map((result, index) => {
                        return (
                            <Link key={index} href={'/snapshots/' + result.sku}>
                                <a>
                                    <div className="p-2 bg-gray-900 rounded-xl text-gray-200 hover:text-white fast-transition cursor-pointer">
                                        {result.name}
                                    </div>
                                </a>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
