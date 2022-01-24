import { ExclamationCircleIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import Link from 'next/link';

import SadCheems from '../public/404.png';

import Alert from '../components/Alert';
import SEO from '../components/SEO';

export default function Home() {
    return (
        <div>
            <SEO
                title="404 Page Not Found - Snapshots.TF"
                description="This page does not exist!"
            ></SEO>

            <div className="pt-2">
                <div className="flex-center">
                    <Image src={SadCheems} height="128" width="200" alt="" />
                </div>
                <div className="text-center">
                    <h1 className="text-5xl font-extrabold">
                        404 - Page Not Found
                    </h1>
                    <p className="text-lg my-2">How did you end up here?</p>
                    <Link href="/">
                        <a className="bg-gray-900 rounded-md shadow-sm py-3 px-5 mt-2 text-lg font-semibold uppercase">
                            Go Home
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
}
