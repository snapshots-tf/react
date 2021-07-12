import { GetServerSideProps } from 'next';
import Link from 'next/link';

import SEO from '../../components/SEO';
import Sidenav from '../../components/Sidenav';

interface SnapshotOverview {
    name: string;
    sku: string;
    overview: {
        id: string;
        savedAt: number;
        listingsAmount: number;
    }[];
}

export default function Identifier({
    snapshots,
}: {
    snapshots: SnapshotOverview;
}) {
    return (
        <Sidenav>
            <SEO
                title={'Snapshots for ' + snapshots.name + ' - Snapshots.TF'}
                description="Have you ever dreamed of getting to know what backpack.tf listings looked like 1 month ago? Well here is your chance to see!"
            ></SEO>

            <div className="text-center">
                <h1 className="text-3xl font-semibold">
                    Snapshots for {snapshots.name}
                </h1>
                <p className="text-base font-medium">
                    Found {snapshots.overview.length} snapshots for this item!
                </p>

                <div>
                    {snapshots.overview.map((overview) => {
                        return (
                            <Link
                                href={'/snapshot/' + overview.id}
                                key={overview.id}
                            >
                                <a className="text-gray-50 hover:text-indigo-200">
                                    <p className="my-2">
                                        {overview.id} -{' '}
                                        {new Date(
                                            Math.round(overview.savedAt * 1000)
                                        ).toLocaleString()}
                                    </p>
                                </a>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </Sidenav>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { identifier } = context.query;

    let notFound = false;

    const res = await fetch(
        `https://api.snapshots.tf/snapshots/overview/sku/${identifier}`
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
