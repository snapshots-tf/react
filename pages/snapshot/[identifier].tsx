import { ArrowCircleDownIcon, ArrowCircleUpIcon } from '@heroicons/react/solid';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { FC, FunctionComponent } from "react";
import Item from '../../components/Item';
import SEO from '../../components/SEO';
import SnapshotListing from '../../components/SnapshotListing';
import { getImageStyles } from '../../lib/helpers';
import { timeSince } from '../../lib/time';

const Identifier: FC<{
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
        quality: number;
    };
}> = ({ snapshot, item, listings }) => {
    return (
        <div>
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
                    quality={item.quality}
                ></SnapshotHeader>
            </div>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <div>
                    <div className="flex justify-center gap-1">
                        <ArrowCircleDownIcon className="h-8 w-8" />
                        <div className="flex-center pb-1">
                            <p className="text-center text-lg lg:text-xl font-semibold">
                                Sell Listings
                            </p>
                        </div>
                    </div>
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
                    <div className="flex justify-center gap-1">
                        <ArrowCircleUpIcon className="h-8 w-8" />
                        <div className="flex-center pb-1">
                            <p className="text-center text-lg lg:text-xl font-semibold">
                                Buy Listings
                            </p>
                        </div>
                    </div>
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
        </div>
    );
}

const SnapshotHeader: FunctionComponent<{
    name: string;
    image: { effect?: string; large: string; small: string };
    savedAt: number;
    quality: number;
}> = ({ name, image, savedAt, quality }) => {
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
            <div style={getImageStyles(image.effect)} className="flex-center">
                <Item quality={quality} image={image} />
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { identifier } = context.query;

    const snapshot = await fetch(
        `${
        process.env.NEXT_PUBLIC_API_URL || 'https://api.snapshots.tf'
        }/snapshot/id/${identifier}`
    ).then((res) => res.json());

    if (snapshot.error) return { notFound: true };

    const item = await fetch(
        `${
        process.env.NEXT_PUBLIC_API_URL || 'https://api.snapshots.tf'
        }/item-info/${snapshot.sku}`
    ).then((res) => res.json());

    const users = await fetch(
        `${
        process.env.NEXT_PUBLIC_API_URL || 'https://api.snapshots.tf'
        }/users/snapshot/${snapshot.id}`
    )
        .then((res) => res.json())
        .then((res) => res.users);

    const mapFunction = (listing: any) => {
        for (let i = 0; i < users.length; i++) {
            if (users[i] ?.steamID64 === listing.steamID64) {
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
            item: Object.assign(item, { quality: item.sku.split(';')[1] }),
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

export default Identifier;