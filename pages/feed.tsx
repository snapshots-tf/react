import { ExclamationCircleIcon, WifiIcon } from '@heroicons/react/outline';
import { FunctionComponent, useEffect, useState } from 'react';
// @ts-ignore
import io from 'socket.io-client';
import Alert from '../components/Alert';
import SEO from '../components/SEO';
import SnapshotPreview, { Snapshot } from '../components/SnapshotPreview';

const Feed: FunctionComponent = ({}) => {
    let [connected, changeConnected] = useState<Boolean>(false);
    let [snapshots, changeSnapshots] = useState<Snapshot[]>([]);

    useEffect(() => {
        const socket = io('https://api.snapshots.tf/');

        socket.on('connect', () => {
            console.log('Connected!');

            changeConnected(true);
        });

        socket.on('disconnect', () => {
            changeConnected(false);
        });

        socket.on('snapshot', (data: Snapshot) => {
            console.log('new snapshot');
            data.quality = parseInt(data.sku.split(';')[1]);
            changeSnapshots((snapshots) => [data, ...snapshots]);
        });
    }, []);

    return (
        <div>
            <SEO
                title="Feed - Snapshots.TF"
                description="Get a feed of the snapshotting work we do, right in your browser!"
            ></SEO>

            <Alert
                alert={{
                    icon: connected ? WifiIcon : ExclamationCircleIcon,
                    type: connected ? 'success' : 'error',
                }}
            >
                {connected
                    ? 'You are connected to the socket server, expect to receive a feed.'
                    : 'You are NOT connected to the socket server!'}
            </Alert>

            <div className="pt-2">
                {snapshots.map((snapshot) => {
                    return (
                        <SnapshotPreview
                            snapshot={snapshot}
                            key={snapshot.id}
                        ></SnapshotPreview>
                    );
                })}
            </div>
        </div>
    );
};

export default Feed;
