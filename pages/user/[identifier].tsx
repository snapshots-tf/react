import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    TooltipProps,
} from 'recharts';
import { useEffect, useState } from 'react';

import { ExternalLinkIcon } from '@heroicons/react/outline';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { GetServerSideProps } from 'next';
import Image from 'next/image';

import Alert from '../../components/Alert';
import SEO from '../../components/SEO';

import { timeSince } from '../../lib/time';
import { CSSProperties } from 'react';
import NameFeed from '../../components/NameFeed';
import useWindowDimensions from '../../lib/useWindowDimensions';

export interface APIUser {
    trusts: {
        time: number;
        negative: number;
        positive: number;
    }[];
    names: {
        time: number;
        name: string;
    }[];
    suggestions: {
        time: number;
        created: number;
        nonUnusualAccepted: number;
        unusualAccepted: number;
    }[];
    donations: {
        time: number;
        amount: number;
    }[];
    steamID64: string;
    name: string;
    avatar: string;
    id: string;
    lastSeen?: number;
}

export default function Identifier({
    user,
    data,
}: {
    user: APIUser;
    data: {
        trust: {
            name: string;
            positive?: number;
            negative?: number;
        }[];
        suggestions: {
            name: string;
            created: number;
            nonUnusualAccepted: number;
            unusualAccepted: number;
        }[];
        donations: {
            name: string;
            amount: number;
        }[];
    };
}) {
    const TooltipStyles: CSSProperties = {
        color: 'black',
    };

    const windowDimensions = useWindowDimensions();

    windowDimensions.width = windowDimensions.width - 30;

    console.log(windowDimensions);
    return (
        <div>
            <SEO
                title={user.name + "'s Profile - Snapshots.TF"}
                description="Check this persons profile, it may have some awesome graphs!"
                image={user.avatar}
            ></SEO>

            <Alert alert={{ type: 'info', icon: ExclamationCircleIcon }}>
                Please note that the data may not be completely up to date!
                {!user.lastSeen
                    ? ''
                    : ' User last seen ' + timeSince(user.lastSeen) + ' ago!'}
            </Alert>

            <div className="my-2 bg-gray-900 rounded-lg w-full user-banner flex">
                <Image
                    src={user.avatar}
                    width="64"
                    height="64"
                    className="rounded-l-lg"
                    alt="User Avatar"
                />
                <h3 className="flex-center text-xl font-medium pl-1">
                    {user.name}
                </h3>

                <div className="ml-auto flex-center mr-2">
                    <a
                        href={
                            'https://steamcommunity.com/profiles/' +
                            user.steamID64
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex px-4 py-2 font-medium bg-gray-800 rounded-md shadow"
                    >
                        <ExternalLinkIcon className="w-6 h-6 flex-center pr-1"></ExternalLinkIcon>
                        Steam Profile
                    </a>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <div className="bg-gray-900 rounded-md shadow-sm p-2">
                    <div className="text-center">
                        <h3 className="text-3xl font-semibold">
                            Trust History
                        </h3>
                    </div>

                    <LineChart
                        width={
                            windowDimensions.width > 600
                                ? 600
                                : windowDimensions.width
                        }
                        height={300}
                        data={data.trust}
                        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                    >
                        <Line
                            type="monotone"
                            dataKey="positive"
                            stroke="#8884d8"
                            name="Positive"
                            dot={false}
                        />
                        <Line
                            type="monotone"
                            dataKey="negative"
                            stroke="#8884d8"
                            name="Negative"
                            dot={false}
                        />
                        <XAxis dataKey="name" tick={false} />
                        <YAxis />
                        <Tooltip
                            itemStyle={TooltipStyles}
                            labelStyle={TooltipStyles}
                            formatter={(value: number, name: string) => {
                                return [value.toLocaleString('en'), name];
                            }}
                            content={tooltipContent}
                        />
                        <Legend />
                    </LineChart>
                </div>

                <div className="bg-gray-900 rounded-md shadow-sm p-2">
                    <div className="text-center">
                        <h3 className="text-3xl font-semibold">
                            Suggestion History
                        </h3>
                    </div>

                    <LineChart
                        width={
                            windowDimensions.width > 600
                                ? 600
                                : windowDimensions.width
                        }
                        height={300}
                        data={data.suggestions}
                        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                    >
                        <Line
                            type="monotone"
                            dataKey="created"
                            name="Created"
                            stroke="#ffffff"
                            dot={false}
                        />
                        <Line
                            type="monotone"
                            dataKey="nonUnusualAccepted"
                            name="Non-Unusual Accepted"
                            stroke="#6f6970"
                            dot={false}
                        />
                        <Line
                            type="monotone"
                            dataKey="unusualAccepted"
                            name="Unusual Accepted"
                            stroke="#8f5d9e"
                            dot={false}
                        />
                        <XAxis dataKey="name" tick={false} />
                        <YAxis />
                        <Tooltip
                            itemStyle={TooltipStyles}
                            labelStyle={TooltipStyles}
                            formatter={(value: number, name: string) => {
                                return [value.toLocaleString('en'), name];
                            }}
                            content={tooltipContent}
                        />
                        <Legend />
                    </LineChart>
                </div>

                <div className="bg-gray-900 rounded-md shadow-sm p-2">
                    <div className="text-center">
                        <h3 className="text-3xl font-semibold">
                            Donation History
                        </h3>
                    </div>

                    <LineChart
                        width={
                            windowDimensions.width > 600
                                ? 600
                                : windowDimensions.width
                        }
                        height={300}
                        data={data.donations}
                        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                    >
                        <Line
                            type="monotone"
                            dataKey="amount"
                            name="Donated"
                            stroke="#ffffff"
                            dot={false}
                        />
                        <XAxis dataKey="name" tick={false} />
                        <YAxis />
                        <Tooltip
                            itemStyle={TooltipStyles}
                            labelStyle={TooltipStyles}
                            formatter={(value: number, name: string) => {
                                return [value.toLocaleString('en'), name];
                            }}
                            content={tooltipContent}
                        />
                        <Legend />
                    </LineChart>
                </div>

                <NameFeed
                    user={user}
                    width={
                        windowDimensions.width > 600
                            ? 600
                            : windowDimensions.width
                    }
                ></NameFeed>
            </div>
        </div>
    );

    function tooltipContent(tooltipProps: TooltipProps<any, any>) {
        return (
            <div className="bg-gray-800 rounded-md text-gray-50 font-medium p-3">
                <h6 className="text-lg">{tooltipProps.label}</h6>
                {tooltipProps.payload?.map((payload, index) => {
                    return (
                        <div key={index}>
                            {payload.name} -{' '}
                            {payload.value.toLocaleString('en')}
                        </div>
                    );
                })}
            </div>
        );
    }
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { identifier } = context.query;

    const userResponse = await fetch(
        `${
            process.env.NEXT_PUBLIC_API_URL || 'https://api.snapshots.tf'
        }/users/${identifier}`
    ).then((res) => res.json());

    if (userResponse.error) return { notFound: true };

    const user = userResponse as APIUser;

    // Pass data to the page via props
    return {
        props: {
            user,
            data: {
                trust: user.trusts.map((trusts) => {
                    return {
                        name: new Date(
                            Math.round(trusts.time * 1000)
                        ).toLocaleString(),
                        negative: trusts.negative,
                        positive: trusts.positive,
                    };
                }),
                suggestions: user.suggestions.map((suggestions) => {
                    return {
                        name: new Date(
                            Math.round(suggestions.time * 1000)
                        ).toLocaleString(),
                        created: suggestions.created,
                        unusualAccepted: suggestions.unusualAccepted,
                        nonUnusualAccepted: suggestions.nonUnusualAccepted,
                    };
                }),
                donations: user.donations.map((donation) => {
                    return {
                        name: new Date(
                            Math.round(donation.time * 1000)
                        ).toLocaleString(),
                        amount: donation.amount,
                    };
                }),
            },
        },
    };
};
