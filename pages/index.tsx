import { ExclamationCircleIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Notify } from 'notiflix';
import { FunctionComponent, useState } from 'react';
import Alert from '../components/Alert';
import Input from '../components/Input';
import ItemComponent from '../components/Item';
import SEO from '../components/SEO';
import SnapshotStatistics from '../components/SnapshotStatistics';
import Spinner from '../components/Spinner';
import { fetcher } from '../lib/fetcher';

export default function Home() {
    const router = useRouter();

    if (router.query.profile && typeof window !== 'undefined') {
        window.location.href = '/';
    }

    return (
        <div>
            <SEO
                title="Backpack.tf Information Collection - Snapshots.TF"
                description="Backpack.tf listing snapshots with an intuitive api and website."
            ></SEO>

            <div className="mt-2">
                <div className="bg-gray-900 shadow-sm rounded-lg overflow-hidden py-4 px-3">
                    <h1 className="text-4xl font-bold">
                        Welcome to Snapshots.TF!
                    </h1>
                    <p className="text-md font-semibold px-1">
                        Snapshots.tf is your one-stop shop for searching,
                        requesting, and viewing backpack.tf listing images. We
                        boast over 20 million snapshot data points and are
                        adding more every minute!
                    </p>
                </div>
            </div>

            <div className="mt-2">
                <SnapshotStatistics />
            </div>

            <div className="mt-2">
                <SearchItemsComponent />
            </div>

            <div className="mt-2">
                <SearchUsersComponent />
            </div>
        </div>
    );
}

const SearchComponent: FunctionComponent<{
    item: {
        component: FunctionComponent<{ result: any }>;
    };
    endpoint: string;
    title: string;
    resultObject: 'users' | 'results';
    input: {
        placeholder: string;
        label: string;
    };
    mapFunction?: Function;
}> = ({ endpoint, item, title, resultObject, input, mapFunction }) => {
    const [result, changeResult] = useState<any[]>([]);
    const [failed, changeFailed] = useState<boolean>(false);

    const [hasSearched, changeHasSearched] = useState<boolean>(false);

    const [isSearching, changeIsSearching] = useState<boolean>(false);

    const handleSearchChange = async (change: string) => {
        if (change.length < 2) return;

        changeIsSearching(true);

        const [data, error] = await fetcher(endpoint + change);

        if (data) {
            changeResult(
                data[resultObject].map(mapFunction || ((res: any) => res))
            );
            changeHasSearched(true);
            changeIsSearching(false);
        } else if (error) {
            changeHasSearched(false);
            changeFailed(true);
        }
    };

    return (
        <div>
            <h1 className="text-xl leading-6 text-white font-semibold px-1">
                {title}
            </h1>

            <Input
                label={input.label}
                placeholder={input.placeholder}
                onChange={handleSearchChange}
                useTimeout={true}
                timeoutMS={600}
                showSpinner={isSearching}
            ></Input>

            <div className="mt-3">
                {failed === true ? (
                    <Alert
                        alert={{
                            type: 'error',
                            icon: ExclamationCircleIcon,
                        }}
                    >
                        An error occurred whilst trying to search the item.
                    </Alert>
                ) : (
                    <span></span>
                )}

                {hasSearched && result.length === 0 ? (
                    <p>No results found 😭</p>
                ) : (
                    ''
                )}

                <div className="flex flex-wrap gap-1">
                    {result.map((result, index) => {
                        return <item.component key={index} result={result} />;
                    })}
                </div>
            </div>
        </div>
    );
};

const UserResult: FunctionComponent<{
    result: {
        donations: { time: number; amount: number }[];
        avatar: string;
        lastSeen: number;
        savedAt: number;
        id: string;
        name: string;
        steamID64: string;
    };
}> = ({ result }) => {
    return (
        <div className="bg-gray-900 shadow-sm rounded-md p-2 text-gray-50 w-64">
            <div className="flex justify-center pt-2">
                <Image
                    src={result.avatar}
                    width="85"
                    height="85"
                    className="rounded-md"
                />
            </div>

            <div className="pt-2">
                <h3 className="text-base sm:text-md lg:text-lg  text-white break-all text-center">
                    {result.name}
                </h3>
            </div>

            <div>
                <p className="text-center text-base font-light">Profiles</p>
            </div>
            <div className="pt-2 flex divide-x divide-gray-800">
                <div className="w-0 flex-1 flex">
                    <Link href={'/user/' + result.steamID64}>
                        <a className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-300 font-medium border border-transparent rounded-bl-lg hover:text-white cursor-pointer">
                            <span className="ml-3">Snapshots</span>
                        </a>
                    </Link>
                </div>
                <div className="-ml-px w-0 flex-1 flex">
                    <Link
                        href={
                            'https://backpack.tf/profiles/' + result.steamID64
                        }
                    >
                        <a className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-300 font-medium border border-transparent rounded-br-lg hover:text-white cursor-pointer">
                            <span className="ml-3">BPTF</span>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

const SearchUsersComponent: FunctionComponent = () => {
    return (
        <SearchComponent
            item={{
                component: UserResult,
            }}
            title="Users"
            endpoint="/users/search/"
            resultObject="users"
            input={{
                label: 'Search Users',
                placeholder: 'joekiller',
            }}
        />
    );
};

const SearchItemsComponent: FunctionComponent = () => {
    return (
        <SearchComponent
            item={{
                component: ItemResult,
            }}
            title="Items"
            endpoint="/search/"
            resultObject="results"
            input={{
                label: 'Search Items',
                placeholder: 'Mann Co. Supply Crate Key',
            }}
            mapFunction={(res: { sku: string }) => {
                return {
                    ...res,
                    quality: res.sku.split(';')[1],
                };
            }}
        />
    );
};

const ItemResult: FunctionComponent<{
    result: {
        sku: string;
        name: string;
        quality: number;
        image: { large: string; effect?: string };
    };
}> = ({ result }) => {
    const [fetching, setFetching] = useState(false);
    const router = useRouter();

    async function getLatestSnapshot() {
        setFetching(true);

        const [data, error] = await fetcher(
            `/snapshots/overview/sku/${result.sku}`
        );

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
                <ItemComponent image={result.image} quality={result.quality} />
            </div>

            <div className="pt-2">
                <h3 className="text-base sm:text-md lg:text-lg  text-white break-all text-center">
                    {result.name}
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
                            <Spinner borderClass="border-gray-50" />
                        ) : (
                            ''
                        )}
                        <span className="ml-3">Latest</span>
                    </a>
                </div>
                <div className="-ml-px w-0 flex-1 flex">
                    <Link href={'/snapshots/' + result.sku}>
                        <a className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-300 font-medium border border-transparent rounded-br-lg hover:text-white cursor-pointer">
                            <span className="ml-3">All</span>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
};
