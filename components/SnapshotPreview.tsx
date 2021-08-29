import { CSSProperties } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getImageStyles } from '../lib/helpers';
import Item from './Item';

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
    quality?: number;
}

export default function SnapshotPreview({ snapshot }: { snapshot: Snapshot }) {
    return (
        <Link href={'/snapshot/' + snapshot.id}>
            <a className="p-2 cursor-pointer flex flex-wrap rounded-md shadow-sm hover:bg-gray-900 fast-transition gap-2">
                <Item quality={snapshot.quality} image={snapshot.image} />
                <div>
                    <p className="item-name font-medium text-left sm:text-center">
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
