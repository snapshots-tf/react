import { FunctionComponent } from 'react';

import Spinner from './Spinner';

const Input: FunctionComponent<{
    label: string;
    placeholder: string;
    onChange: (change: string) => void;
    useTimeout?: boolean;
    timeoutMS?: number;
    icon?: {
        position: 'right';
        showIcon: boolean;
        icon: any;
    };
    showSpinner: boolean;
}> = ({
    label,
    placeholder,
    onChange,
    useTimeout,
    timeoutMS,
    icon,
    showSpinner,
}) => {
    let timeout: NodeJS.Timeout;
    const handleChange = (event: { target: { value: string } }) => {
        if (!useTimeout) {
            onChange(event.target.value);
            return;
        }

        clearTimeout(timeout);

        timeout = setTimeout(() => {
            onChange(event.target.value);
        }, timeoutMS || 1000);
    };

    return (
        <div className="mt-2">
            <div>
                <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-50 pl-1"
                >
                    {label}
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="block w-full pr-10 border-gray-800 bg-gray-900 text-gray-200 placeholder-gray-300 focus:outline-none sm:text-sm rounded-md"
                        placeholder={placeholder}
                        onChange={handleChange}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        {icon && icon.showIcon && icon.icon ? (
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <icon.icon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                />
                            </div>
                        ) : (
                            ''
                        )}
                        {showSpinner ? <Spinner /> : ''}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Input;
