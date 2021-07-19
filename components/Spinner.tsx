import { FunctionComponent } from 'react';
import { classNames } from '../lib/helpers';

const Spinner: FunctionComponent<{
    borderClass?: string;
    heightClass?: string;
    widthClass?: string;
}> = ({ borderClass, heightClass, widthClass }) => {
    return (
        <div
            className={classNames(
                'rounded-full h-4 w-4 transparent border-b-transparent border-2 animate-spin',
                borderClass || 'border-blue-500',
                heightClass || 'h-4',
                widthClass || 'w-4'
            )}
        ></div>
    );
};

export default Spinner;
