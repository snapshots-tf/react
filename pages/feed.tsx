import { useEffect, useState } from 'react';
// @ts-ignore
import io from 'socket.io-client';

import { WifiIcon, ExclamationCircleIcon } from '@heroicons/react/outline';

import Sidenav from '../components/Sidenav';
import SEO from '../components/SEO';
import Alert from '../components/Alert';
import SnapshotPreview, { Snapshot } from '../components/SnapshotPreview';

export default function Home() {
    let [connected, changeConnected] = useState<Boolean>(false);
    let [snapshots, changeSnapshots] = useState<Snapshot[]>([]);

    useEffect(() => {
        let snapshotGroup: Snapshot[] = [];

        const addManySnapshots = (snapshotsArray: Snapshot[]) => {
            const copy = [...snapshots];
            for (let i = 0; i < snapshotsArray.length; i++) {
                copy.unshift({
                    ...snapshotsArray[i],
                    quality: parseInt(snapshotsArray[i].sku.split(';')[1]),
                });
            }
            changeSnapshots((snapshots) => [...snapshots, ...copy]);
        };

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
            snapshotGroup.push(data);
        });

        setInterval(() => {
            if (snapshotGroup.length !== 0) {
                addManySnapshots(snapshotGroup);
                snapshotGroup = [];
            }
        }, 1000);
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
}
