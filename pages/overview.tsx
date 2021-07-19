import { GetServerSideProps } from 'next';
import { FunctionComponent, useEffect, useState } from 'react';
import Link from 'next/link';

import SEO from '../components/SEO';
import Alert from '../components/Alert';
import { fetcher } from '../lib/fetcher';
import Item from '../components/Item';
import Spinner from '../components/Spinner';

interface Item {
    image: { large: string; effect?: string; small: string };
    sku: string;
    name: string;
    quality: number;
}

const Home: FunctionComponent<{
    items: Item[];
}> = (props) => {
    const [items, changeItems] = useState<Item[]>(props.items);
    const [isRequesting, changeIsRequesting] = useState<boolean>(false);

    let itemAmount = 100;

    const handleScroll = async (event: any) => {
        const bottom =
            event.target.scrollHeight - event.target.scrollTop <
            event.target.clientHeight + 800;

        if (bottom && !isRequesting) {
            changeIsRequesting(true);

            const [data, error] = await fetcher(
                '/overview/human?skip=' + itemAmount
            );

            if (error) {
                console.log('Failed to fetch!');
            } else if (data && data.items) {
                changeItems(
                    items.concat(
                        data.items.map((item: Item) => {
                            return {
                                ...item,
                                quality: item.sku.split(';')[1],
                            };
                        })
                    )
                );
                itemAmount += data.items.length;
            }

            setTimeout(() => {
                changeIsRequesting(false);
            }, 500);
        }
    };

    useEffect(() => {
        window.removeEventListener('scroll', handleScroll, true);
        window.addEventListener(
            'scroll',
            (ev) => {
                handleScroll(ev);
            },
            true
        );
    }, [handleScroll]);

    return (
        <div>
            <SEO
                title="Overview - Snapshots.TF"
                description="Overview of Snapshots.tf current work!"
            ></SEO>

            <div id="items">
                {items.map((item) => {
                    return (
                        <Link key={item.sku} href={'/snapshots/' + item.sku}>
                            <a>
                                <div className="w-full rounded-md flex flex-wrap bg-gray-800 hover:bg-gray-900 fast-transition p-1">
                                    <Item
                                        image={item.image}
                                        quality={item.quality}
                                    />
                                    <div className="flex-center pl-1 text-md xl:text-lg">
                                        <p>{item.name}</p>
                                    </div>
                                </div>
                            </a>
                        </Link>
                    );
                })}
            </div>

            {isRequesting ? (
                <div className="flex justify-center">
                    <Spinner widthClass="w-16" heightClass="h-16" />
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const [data, error] = await fetcher(`/overview/human?skip=0`);

    if (error) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {
            items: data.items.map((item: Item) => {
                return {
                    ...item,
                    quality: item.sku.split(';')[1],
                };
            }),
        },
    };
};

export default Home;
