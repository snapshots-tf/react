import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CSSProperties } from 'react';

import SEO from '../../components/SEO';
import Sidenav from '../../components/Sidenav';

import SnapshotListing from '../../components/SnapshotListing';
import { timeSince } from '../../lib/time';

const fetcher = (url: any) => fetch(url).then((r) => r.json());

export default function Identifier({
    snapshot,
    item,
    listings,
}: {
    snapshot: {
        savedAt: number;
        sku: string;
        id: string;
    };
    listings: {
        buy: any[];
        sell: any[];
    };
    item: {
        name: string;
        image: {
            small: string;
            large: string;
            effect: string;
        };
        sku: string;
    };
}) {
    return (
        <Sidenav>
            <SEO
                title={'Snapshots for ' + item.name + ' - Snapshots.TF'}
                description={`Have you ever dreamed of getting to know what backpack.tf listings looked like for ${
                    item.name
                }'s ${timeSince(
                    snapshot.savedAt
                )} ago? Well here is your chance to see!`}
                image={item.image.large}
            ></SEO>

            <div className="head-back-button font-medium text-sm text-gray-50 hover:text-white hidden lg:block">
                <Link href={'/snapshots/' + snapshot.sku}>
                    <a>Show All Snapshots</a>
                </Link>
            </div>
            <div className="text-center">
                <SnapshotHeader
                    name={item.name}
                    image={item.image}
                    savedAt={snapshot.savedAt}
                ></SnapshotHeader>
            </div>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <div>
                    <p className="text-center text-lg font-medium">
                        Sell Listings
                    </p>
                    {listings.sell.map((sellListing) => {
                        return (
                            <SnapshotListing
                                key={sellListing.id}
                                listing={sellListing}
                                selling={true}
                                savedAt={snapshot.savedAt}
                            ></SnapshotListing>
                        );
                    })}
                </div>
                <div>
                    <p className="text-center text-lg font-medium">
                        Buy Listings
                    </p>
                    {listings.buy.map((buyListing) => {
                        return (
                            <SnapshotListing
                                key={buyListing.id}
                                listing={buyListing}
                                selling={false}
                                savedAt={snapshot.savedAt}
                            ></SnapshotListing>
                        );
                    })}
                </div>
            </div>
        </Sidenav>
    );
}

function SnapshotHeader({
    name,
    image,
    savedAt,
}: {
    name: string;
    image: { effect?: string; large: string; small: string };
    savedAt: number;
}) {
    const ImageStyles: CSSProperties = {
        backgroundImage: 'url("' + image.effect + '")',
    };

    const EmptyStyle: CSSProperties = {};

    return (
        <div className="flex flex-wrap justify-center gap-2">
            <div className="flex-center">
                <div>
                    <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl word-break">
                        {name}
                    </h2>
                    <p>
                        This snapshot was taken{' '}
                        {new Date(Math.round(savedAt * 1000)).toLocaleString()}{' '}
                        or approximately {timeSince(savedAt)} ago!
                    </p>
                </div>
            </div>
            <div
                style={image.effect ? ImageStyles : EmptyStyle}
                className="rounded-full h-20 w-20 bg-gray-900 shadow-sm p-1 item-image flex-center"
            >
                <Image
                    src={image.large}
                    width="64"
                    height="64"
                    alt="Item Image"
                />
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { identifier } = context.query;

    const snapshot = await fetch(
        `https://api.snapshots.tf/snapshot/id/${identifier}`
    ).then((res) => res.json());

    if (snapshot.error) return { notFound: true };

    const item = await fetch(
        `https://api.snapshots.tf/item-info/${snapshot.sku}`
    ).then((res) => res.json());

    const users = await fetch(
        `https://api.snapshots.tf/users/snapshot/${snapshot.id}`
    )
        .then((res) => res.json())
        .then((res) => res.users);

    const mapFunction = (listing: any) => {
        for (let i = 0; i < users.length; i++) {
            if (users[i]?.steamID64 === listing.steamID64) {
                listing.user = {
                    name: users[i].name,
                    avatar: users[i].avatar,
                };
                break;
            }
        }
        return listing;
    };

    // Pass data to the page via props
    return {
        props: {
            snapshot,
            item,
            listings: {
                buy: snapshot.listings
                    .filter((listing: { buying: boolean }) => listing.buying)
                    .map(mapFunction),
                sell: snapshot.listings
                    .filter((listing: { buying: boolean }) => !listing.buying)
                    .map(mapFunction),
            },
        },
    };
};
