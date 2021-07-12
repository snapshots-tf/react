import { ShieldExclamationIcon } from '@heroicons/react/outline';
import Alert from '../components/Alert';

import Sidenav from '../components/Sidenav';

export default function Donate() {
    return (
        <Sidenav>
            <Alert alert={{ type: 'info', icon: ShieldExclamationIcon }}>
                This page is currently in the works 😭
            </Alert>
        </Sidenav>
    );
}
