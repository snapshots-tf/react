import Link from 'next/link';
import Image from 'next/image';
import { LightningBoltIcon } from '@heroicons/react/solid';

function stringify(currencies: { metal: number; keys: number }): string {
    const metal = currencies.metal + ' ref';
    // You are ugly.
    return currencies.keys === 0
        ? metal
        : currencies.keys === 1
        ? `${
              currencies.keys +
              (currencies.metal !== 0 ? ' key, ' + metal : ' key')
          }`
        : `${
              currencies.keys +
              (currencies.metal !== 0 ? ' keys, ' + metal : ' keys')
          }`;
}

export default function SnapshotListing({
    listing,
    selling,
    savedAt,
}: {
    listing: any;
    selling: boolean;
    savedAt: number;
}) {
    return (
        <div>
            <Link href={'/user/' + listing.steamID64}>
                <a>
                    <div className="flex flex-wrap rounded-lg  p-2 cursor-pointer text-left fast-transition hover:bg-gray-900">
                        <Image
                            src={
                                listing.user?.avatar ||
                                'https://steamuserimages-a.akamaihd.net/ugc/885384897182110030/F095539864AC9E94AE5236E04C8CA7C2725BCEFF/'
                            }
                            height="64"
                            width="64"
                            className="rounded-lg"
                            alt="User's Avatar"
                        />

                        <div className="m-2 text-sm md:text-base">
                            <div>
                                <span className="font-semibold">
                                    {listing.user?.name || 'Unknown-User?'}
                                </span>{' '}
                                {selling ? 'selling' : 'buying'} for{' '}
                                {stringify(listing.currencies)}
                            </div>
                            <div>
                                {listing.paint === ''
                                    ? ''
                                    : `${!selling ? 'Paint: ' : 'Painted:'} ` +
                                      listing.paint}
                                {listing.paint !== '' &&
                                listing.spells.length !== 0
                                    ? ' - '
                                    : ''}
                                {listing.spells.length === 0
                                    ? ''
                                    : `${!selling ? 'Spells: ' : 'Spelled:'} ` +
                                      listing.spells.join(', ')}
                            </div>
                        </div>
                        <div className="ml-auto">
                            {listing.automatic ? (
                                <LightningBoltIcon className="w-4 h-4 text-yellow-500"></LightningBoltIcon>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                </a>
            </Link>
        </div>
    );
}
