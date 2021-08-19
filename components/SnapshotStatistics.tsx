import useSWR from 'swr';
import CountUp from 'react-countup';
import compactInteger from '../lib/compactInteger';

import Alert from './Alert';
import {
    AnnotationIcon,
    ExclamationCircleIcon,
    UserIcon,
} from '@heroicons/react/solid';
import { BookOpenIcon } from '@heroicons/react/outline';

const fetcher = (url: any) => fetch(url).then((r) => r.json());

function Page() {
    const { data, error } = useSWR(
        `${
            process.env.NEXT_PUBLIC_API_URL || 'https://api.snapshots.tf'
        }/stats`,
        fetcher,
        { revalidateOnFocus: false }
    );

    if (error)
        return (
            <Alert alert={{ type: 'error', icon: ExclamationCircleIcon }}>
                Failed to fetch snapshot statistics!
            </Alert>
        );
    if (!data) return <div>loading...</div>;

    const stats = [
        { name: 'Total Listings', stat: data.listings, icon: AnnotationIcon },
        { name: 'Total Snapshots', stat: data.snapshots, icon: BookOpenIcon },
        { name: 'Total Users', stat: data.users, icon: UserIcon },
    ];

    return (
        <div>
            <div>
                <h3 className="text-xl leading-6 text-white font-semibold px-1">
                    Statistics
                </h3>
                <dl className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-3">
                    {stats.map((item) => (
                        <div
                            key={item.name}
                            className="px-4 py-5 bg-gray-900 shadow-sm rounded-lg overflow-hidden sm:p-6"
                        >
                            <div className="flex">
                                <item.icon
                                    className="pr-2 h-6 w-6 text-white"
                                    aria-hidden="true"
                                ></item.icon>
                                <dt className="text-sm font-medium text-gray-50 truncate">
                                    {item.name}
                                </dt>
                            </div>
                            <dd className="mt-1 text-3xl font-semibold text-gray-100">
                                <CountUp
                                    delay={0.1}
                                    end={item.stat}
                                    duration={4}
                                    formattingFn={(num) =>
                                        compactInteger(
                                            num,
                                            num > 1000000 ? 3 : 2
                                        )
                                    }
                                />
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    );
}

export default Page;
