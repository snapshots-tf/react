import Link from 'next/link';
import { FunctionComponent, useState } from 'react';

import { InformationCircleIcon, RefreshIcon } from '@heroicons/react/outline';
import { ExclamationCircleIcon } from '@heroicons/react/solid';

import Sidenav from '../components/Sidenav';
import Alert from '../components/Alert';
import SnapshotStatistics from '../components/SnapshotStatistics';
import SEO from '../components/SEO';
import Input from '../components/Input';
import ItemComponent from '../components/Item';

import { fetcher } from '../lib/fetcher';
import { useRouter } from 'next/router';
import { Notify } from 'notiflix';

export default function Home() {
    return (
        <div>
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
        </div>
    );
}

const SearchComponent: FunctionComponent = () => {
    const [searchResult, changeSearchResult] = useState<
        { name: string; sku: string; image: any; quality: number }[]
    >([]);
    const [failed, changeFailed] = useState<boolean>(false);

    const [hasSearched, changeHasSearched] = useState<boolean>(false);

    const handleSearchChange = async (change: string) => {
        if (change.length < 2) return;

        const [data, error] = await fetcher('/search/' + change);

        if (data) {
            changeSearchResult(
                data.results.map((item: any) => {
                    return Object.assign(item, {
                        quality: item.sku.split(';')[1],
                    });
                })
            );
            changeHasSearched(true);
        } else if (error) {
            changeHasSearched(false);
            changeFailed(true);
        }
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
                        An error occurred whilst trying to search the item.
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
                    {searchResult
                        .sort((a, b) => b.name.length - a.name.length)
                        .map((result, index) => {
                            return (
                                <SearchItemComponent
                                    key={index}
                                    quality={result.quality}
                                    sku={result.sku}
                                    name={result.name}
                                    image={result.image}
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

const SearchItemComponent: FunctionComponent<{
    sku: string;
    name: string;
    quality: number;
    image: { large: string; effect?: string };
}> = ({ sku, name, image, quality }) => {
    const [fetching, setFetching] = useState(false);
    const router = useRouter();

    async function getLatestSnapshot() {
        setFetching(true);

        const [data, error] = await fetcher(`/snapshots/overview/sku/${sku}`);

        if (error) {
            setFetching(false);
            Notify.failure(
                'Failed to fetch snapshots, the web server might be down!',
                { timeout: 3000 }
            );
        }

        router.push('/snapshot/' + data.overview[0].id);
    }

    return (
        <div className="bg-gray-900 shadow-sm rounded-md p-2 text-gray-50 w-64">
            <div className="flex justify-center pt-2">
                <ItemComponent image={image} quality={quality} />
            </div>

            <div className="pt-2">
                <h3 className="text-base sm:text-md lg:text-lg  text-white break-all text-center">
                    {name}
                </h3>
            </div>

            <div>
                <p className="text-center text-base font-light">Snapshots</p>
            </div>
            <div className="pt-2 flex divide-x divide-gray-800">
                <div className="w-0 flex-1 flex">
                    <a
                        className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-300 font-medium border border-transparent rounded-bl-lg hover:text-white cursor-pointer"
                        onClick={getLatestSnapshot}
                    >
                        {fetching ? (
                            <RefreshIcon className="w-4 h-4 animate-spin" />
                        ) : (
                            ''
                        )}
                        <span className="ml-3">Latest</span>
                    </a>
                </div>
                <div className="-ml-px w-0 flex-1 flex">
                    <Link href={'/snapshots/' + sku}>
                        <a className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-300 font-medium border border-transparent rounded-br-lg hover:text-white cursor-pointer">
                            <span className="ml-3">All</span>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
};
