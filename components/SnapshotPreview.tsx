import { motion } from 'framer-motion';
import Link from 'next/link';
import Item from './Item';

const easing = [0.6, -0.05, 0.01, 0.99];

const fadeInUp = {
    hidden: {
        y: -40,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.3,
        },
    },
};

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
        <motion.div variants={fadeInUp} initial="hidden" animate="animate">
            <Link href={'/snapshot/' + snapshot.id}>
                <a className="p-2 cursor-pointer flex flex-wrap rounded-md hover:bg-gray-900 fast-transition gap-2">
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
        </motion.div>
    );
}
