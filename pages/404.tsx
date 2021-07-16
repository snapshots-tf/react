import { ExclamationCircleIcon } from '@heroicons/react/solid';

import Alert from '../components/Alert';
import SEO from '../components/SEO';

export default function Home() {
    return (
        <div>
            <SEO
                title="404 Page Not Found - Snapshots.TF"
                description="This page does not exist!"
            ></SEO>

            <Alert alert={{ icon: ExclamationCircleIcon, type: 'error' }}>
                This page does not exist!
            </Alert>
        </div>
    );
}
