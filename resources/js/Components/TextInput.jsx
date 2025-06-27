import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            style={{ backgroundColor: 'rgba(31, 41, 55, 0.2)' }} // Style temporaire en ligne
            className={
                'w-full px-16 py-1 bg-gray-800 bg-opacity-30 border-b-2 border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-0 transition duration-200 ' +
                className
            }
            ref={localRef}
        />
    );
});