import { HeartIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import Link from 'next/link';

import Sidenav from '../components/Sidenav';
import SEO from '../components/SEO';

export default function Donate() {
    const donators: {
        name: string;
        steamID64: string;
        donated: string;
    }[] = [
        {
            name: 'Joekiller',
            steamID64: '76561197966563795',
            donated: '$100',
        },
        {
            name: 'Sunjar',
            steamID64: '76561198139171368',
            donated: '15 keys',
        },
        {
            name: 'Idinium',
            steamID64: '76561198013127982',
            donated: '10 keys',
        },
        {
            name: 'Purple Barber',
            steamID64: '76561198104945873',
            donated: '10 keys',
        },
        {
            name: 'aj',
            steamID64: '76561198253093948',
            donated: '10 keys',
        },
        {
            name: 'Preport',
            steamID64: '76561198085810371',
            donated: '$6',
        },
    ];

    return (
        <div>
            <SEO
                title="Donate - Snapshots.TF"
                description="Wish to support Snapshots.TF and it&lsquo;s development and operations? Please send steam donations"
            ></SEO>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="mt-1 text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                        Wish to donate?
                    </p>
                    <p className="max-w-xl mt-5 mx-auto text-xl text-gray-100">
                        Wish to support Snapshots.TF and it&lsquo;s development and operations?
                        Well here is your chance! We are currently accepting Steam
                        donations.
                    </p>

                    <div className="pt-4 flex flex-wrap justify-center gap-1">
                        <a
                            href="https://steamcommunity.com/tradeoffer/new/?partner=442990671&token=dKtwabFW"
                            target="_blank"
                            rel="noreferrer"
                            className="bg-gray-900 rounded-lg inline-flex py-2 px-4 donate-button text-sm font-semibold"
                        >
                            <div className="flex-center">
                                <HeartIcon className="w-4 h-4 flex-center"></HeartIcon>
                            </div>
                            Steam Donation
                        </a>
                    </div>

                    <p className="mt-2 text-3xl sm:text-4xl sm:tracking-tight lg:text-5xl text-white font-extrabold">
                        Donation Legends
                    </p>
                    <p className="max-w-xl mt-5 mx-auto text-xl text-gray-100">
                        The Donation Legends are those who donated to the original Snapshots.tf. Thank you everyone.
                    </p>
                    <ul className="text-lg">
                        {donators.map((donator, index) => {
                            return (
                                <li
                                    key={index}
                                    className="flex flex-wrap justify-center gap-1"
                                >
                                    <Link
                                        href={
                                            'https://steamcommunity.com/profiles/' +
                                            donator.steamID64
                                        }
                                    >
                                        <a>{donator.name}</a>
                                    </Link>
                                    - {donator.donated}{' '}
                                    <div className="flex-center pl-2">
                                        <HeartIcon className="w-4 h-4 text-red-500" />
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}
