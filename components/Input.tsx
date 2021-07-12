export default function Input({
    label,
    placeholder,
    onChange,
    useTimeout,
    timeoutMS,
}: {
    label: string;
    placeholder: string;
    onChange: (change: string) => void;
    useTimeout?: boolean;
    timeoutMS?: number;
}) {
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
                    className="block text-sm font-medium text-gray-50"
                >
                    {label}
                </label>
                <div className="mt-1">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm text-base border-gray-300 rounded-md text-gray-900"
                        placeholder={placeholder}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
}
