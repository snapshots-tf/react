import {
    Fragment,
    FunctionComponent,
    ReactNode,
    useEffect,
    useState,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import {
    ChartBarIcon,
    HomeIcon,
    MenuIcon,
    XIcon,
    HeartIcon,
    ChatIcon,
    CodeIcon,
    RssIcon,
    DatabaseIcon,
} from '@heroicons/react/outline';

import SnapshotsLogo from '../public/logo.webp';
import { useRouter } from 'next/dist/client/router';
import { classNames } from '../lib/helpers';

export default function Sidenav({
    children,
    hasCookies,
}: {
    children: ReactNode;
    hasCookies: boolean;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState<{
        avatar: string;
        steamID64: string;
        name: string;
    } | null>(null);

    useEffect(() => {
        if (localStorage.getItem('user') && !user && hasCookies)
            setUser(JSON.parse(localStorage.getItem('user') || '{}'));
    }, [user, setUser, hasCookies]);

    function GetActivePath(): string {
        const router = useRouter();

        return router.pathname;
    }

    const navigation = [
        {
            name: 'Dashboard',
            href: '/',
            icon: HomeIcon,
            current: GetActivePath() === '/',
        },
        {
            name: 'Feed',
            href: '/feed',
            icon: RssIcon,
            current: GetActivePath() === '/feed',
        },
        {
            name: 'Donate',
            href: '/donate',
            icon: HeartIcon,
            current: GetActivePath() === '/donate',
        },
        {
            name: 'Discord',
            href: 'https://discord.gg/gDbPDmh7zW',
            icon: ChatIcon,
            current: false,
            split: 'Community',
        },
        {
            name: 'API',
            href: 'https://api.snapshots.tf/docs',
            icon: CodeIcon,
            split: 'Dev',
            current: false,
        },
        {
            name: 'Users',
            href: '/users',
            icon: ChartBarIcon,
            current: GetActivePath() === '/users',
        },
        {
            name: 'Overview',
            href: '/overview',
            icon: DatabaseIcon,
            current: GetActivePath() === '/overview',
        },
    ].sort((a, b) => {
        return (a.split ? 1 : 0) - (b.split ? 1 : 0);
    });

    return (
        <div className="h-screen flex overflow-hidden bg-gray-100">
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog
                    as="div"
                    static
                    className="fixed inset-0 flex z-40 md:hidden"
                    open={sidebarOpen}
                    onClose={setSidebarOpen}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="absolute top-0 right-0 -mr-12 pt-2">
                                    <button
                                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <span className="sr-only">
                                            Close sidebar
                                        </span>
                                        <XIcon
                                            className="h-6 w-6 text-white"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                            </Transition.Child>
                            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                                <Link href="/">
                                    <a>
                                        <div className="flex-shrink-0 flex items-center px-4">
                                            <Image
                                                src={SnapshotsLogo}
                                                alt="Snapshots Logo"
                                                width="44"
                                                height="44"
                                            />
                                            <h3 className="text-2xl pb-1 pr-2 text-gray-50 font-bold tracking-tight">
                                                Snapshots.TF
                                            </h3>
                                        </div>
                                    </a>
                                </Link>
                                <nav className="mt-5 px-2 space-y-1">
                                    {navigation.map((item, index) => (
                                        <div key={index}>
                                            {item.split ? (
                                                <div className="space-y-1">
                                                    <h3
                                                        className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider"
                                                        id="projects-headline"
                                                    >
                                                        {item.split}
                                                    </h3>
                                                </div>
                                            ) : (
                                                ''
                                            )}

                                            <Link href={item.href}>
                                                <a
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-gray-900 text-white'
                                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                                    )}
                                                >
                                                    <item.icon
                                                        className={classNames(
                                                            item.current
                                                                ? 'text-gray-300'
                                                                : 'text-gray-400 group-hover:text-gray-300',
                                                            'mr-4 flex-shrink-0 h-6 w-6'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}
                                                </a>
                                            </Link>
                                        </div>
                                    ))}
                                </nav>
                            </div>
                            <div className="space-y-1 pb-4">
                                <h3
                                    className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider"
                                    id="projects-headline"
                                >
                                    Made by{' '}
                                    <Link href="https://viggo.cc">
                                        <a>aethez</a>
                                    </Link>
                                    <br />
                                    Powered by{' '}
                                    <Link href="https://backpack.tf/">
                                        <a>Backpack.TF</a>
                                    </Link>
                                </h3>
                            </div>
                            <UserAvatarBar user={user} />
                        </div>
                    </Transition.Child>
                    <div className="flex-shrink-0 w-14">
                        {/* Force sidebar to shrink to fit close icon */}
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden md:flex md:flex-shrink-0">
                <div className="flex flex-col w-64">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex flex-col h-0 flex-1 bg-gray-800">
                        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                            <Link href="/">
                                <a>
                                    <div className="flex items-center flex-shrink-0 px-4">
                                        <Image
                                            src={SnapshotsLogo}
                                            alt="Snapshots Logo"
                                            width="44"
                                            height="44"
                                        />
                                        <h3 className="text-2xl pb-1 pr-2 text-gray-50 font-bold tracking-tight">
                                            Snapshots.TF
                                        </h3>
                                    </div>
                                </a>
                            </Link>
                            <nav className="mt-5 flex-1 px-2 bg-gray-800 space-y-1">
                                {navigation.map((item, index) => (
                                    <div key={index}>
                                        {item.split ? (
                                            <div className="space-y-1">
                                                <h3
                                                    className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider"
                                                    id="projects-headline"
                                                >
                                                    {item.split}
                                                </h3>
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                        <Link href={item.href}>
                                            <a
                                                className={classNames(
                                                    item.current
                                                        ? 'bg-gray-900 text-white'
                                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                                )}
                                            >
                                                <item.icon
                                                    className={classNames(
                                                        item.current
                                                            ? 'text-gray-300'
                                                            : 'text-gray-400 group-hover:text-gray-300',
                                                        'mr-3 flex-shrink-0 h-6 w-6'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </a>
                                        </Link>
                                    </div>
                                ))}
                            </nav>
                            <div className="space-y-1">
                                <h3
                                    className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider"
                                    id="projects-headline"
                                >
                                    Made by{' '}
                                    <Link href="https://viggo.cc">
                                        <a>aethez</a>
                                    </Link>
                                    <br />
                                    Powered by{' '}
                                    <Link href="https://backpack.tf/">
                                        <a>Backpack.TF</a>
                                    </Link>
                                </h3>
                            </div>
                        </div>
                        <UserAvatarBar user={user} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-0 flex-1 overflow-hidden overflow-y-auto">
                <div className="bg-gray-800 w-full">
                    <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-">
                        <button
                            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-50 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <MenuIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                </div>
                <main className="flex-1 relative z-0 m-2 focus:outline-none">
                    <div className="w-full bg-gray-800 rounded-md content-height text-gray-50">
                        <div className="p-2">{children}</div>
                    </div>
                </main>
            </div>
        </div>
    );
}

const UserAvatarBar: FunctionComponent<{
    user: { avatar: string; name: string } | null;
}> = ({ user }) => {
    function logOut() {
        localStorage.removeItem('user');

        window.location.href = '/auth/logout';
    }

    if (!user)
        return (
            <div className="flex-shrink-0 flex bg-gray-700 p-4">
                <div className="flex-shrink-0 w-full group block">
                    <div className="flex items-center text-white">
                        <Link href="/auth/login">
                            <a>Sign In</a>
                        </Link>
                    </div>
                </div>
            </div>
        );

    return (
        <div className="flex-shrink-0 flex bg-gray-700 p-4">
            <div className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                    <div>
                        <Image
                            className="inline-block rounded-full"
                            src={user.avatar}
                            height="36"
                            width="36"
                            alt="User Avatar"
                        />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-white">
                            {user?.name}
                        </p>
                        <div className="flex text-xs font-medium text-gray-300 group-hover:text-white gap-1">
                            <a onClick={logOut}>Sign Out</a>-
                            <Link href="/profile">
                                <a>My Profile</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
