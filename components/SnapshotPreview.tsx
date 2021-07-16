import { CSSProperties } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getImageStyles } from '../lib/helpers';

export interface Snapshot {
    image: {
        effect: string;
        large: string;
    };
    name: string;
    sku: string;
    id: string;
    listings: {
        buy: number;
        sell: number;
    };
}

export default function SnapshotPreview({ snapshot }: { snapshot: Snapshot }) {
    return (
        <Link href={'/snapshot/' + snapshot.id}>
            <a className="p-2 cursor-pointer flex flex-wrap rounded-md shadow-sm hover:bg-gray-900 fast-transition">
                <div
                    className="item-image"
                    style={getImageStyles(snapshot.image.effect)}
                >
                    <Image
                        src={snapshot.image.large}
                        alt="Item Image"
                        height="64"
                        width="64"
                    />
                </div>
                <div>
                    <p className="item-name text-left sm:text-center">
                        {snapshot.name}
                    </p>
                    <div className="flex flex-wrap gap-1 flex-shrink-1 font-light">
                        <p>{snapshot.listings.sell} Sell Listing(s)</p>
                        <p>-</p>
                        <p>{snapshot.listings.buy} Buy Listing(s)</p>
                    </div>
                </div>
            </a>
        </Link>
    );
}
