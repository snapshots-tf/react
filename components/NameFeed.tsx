import { PencilAltIcon } from '@heroicons/react/solid';
import { classNames } from '../lib/helpers';
import { timeSince } from '../lib/time';
import { APIUser } from '../pages/user/[identifier]';

export default function NameFeed({
    user,
    width,
}: {
    user: APIUser;
    width: number;
}) {
    const timeline = user.names.map((name) => {
        return {
            content: 'Changed name to',
            target: name.name,
            date: timeSince(name.time) + ' ago',
            icon: PencilAltIcon,
        };
    });

    return (
        <div className="bg-gray-900 rounded-md shadow-sm p-2" style={{ width }}>
            <div className="text-center">
                <h3 className="text-3xl font-semibold">User Name History</h3>
            </div>

            <div className="mx-auto flow-root p-4">
                <ul className="-mb-8">
                    {timeline.map((event, eventIdx) => (
                        <li key={eventIdx}>
                            <div className="relative pb-8">
                                {eventIdx !== timeline.length - 1 ? (
                                    <span
                                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-white"
                                        aria-hidden="true"
                                    />
                                ) : null}
                                <div className="relative flex space-x-3 bg-gray-900">
                                    <div>
                                        <span
                                            className={classNames(
                                                'bg-gray-400',
                                                'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-gray-800'
                                            )}
                                        >
                                            <event.icon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        </span>
                                    </div>
                                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                        <div>
                                            <p className="text-sm text-gray-50">
                                                {event.content}{' '}
                                                <a className="font-semibold text-white">
                                                    {event.target}
                                                </a>
                                            </p>
                                        </div>
                                        <div className="text-right text-sm whitespace-nowrap text-gray-50">
                                            <time>{event.date}</time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
