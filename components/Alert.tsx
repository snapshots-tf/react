import { InformationCircleIcon } from '@heroicons/react/solid';
import { ReactNode } from 'react';
import { classNames } from '../lib/helpers';

export default function Alert({
    alert,
    children,
}: {
    alert: { icon: any; type: 'error' | 'success' | 'info' };
    children: ReactNode;
}) {
    return (
        <div
            className={classNames(
                'rounded-md p-4',
                alert.type === 'info' ? 'bg-blue-50' : '',
                alert.type === 'error' ? 'bg-red-50' : '',
                alert.type === 'success' ? 'bg-green-50' : ''
            )}
        >
            <div className="flex">
                {alert.icon ? (
                    <div className="flex-shrink-0">
                        <alert.icon
                            className={classNames(
                                'h-5 w-5',
                                alert.type === 'info' ? 'text-blue-400' : '',
                                alert.type === 'error' ? 'text-red-400' : '',
                                alert.type === 'success' ? 'text-green-500' : ''
                            )}
                            aria-hidden="true"
                        />
                    </div>
                ) : (
                    <span></span>
                )}
                <div className="ml-3 flex-1 md:flex md:justify-between">
                    <p
                        className={classNames(
                            'text-sm',
                            alert.type === 'info' ? 'text-blue-700' : '',
                            alert.type === 'success' ? 'text-green-600' : '',
                            alert.type === 'error' ? 'text-red-500' : ''
                        )}
                    >
                        {children}
                    </p>
                </div>
            </div>
        </div>
    );
}
