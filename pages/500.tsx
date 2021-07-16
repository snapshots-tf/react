import { ExclamationCircleIcon } from '@heroicons/react/solid';

import Alert from '../components/Alert';
import SEO from '../components/SEO';

export default function Home() {
    return (
        <div>
            <SEO
                title="500 Page Error - Snapshots.TF"
                description="We encountered an error!"
            ></SEO>

            <Alert alert={{ icon: ExclamationCircleIcon, type: 'error' }}>
                Error 500, something went wrong!
            </Alert>
        </div>
    );
}
