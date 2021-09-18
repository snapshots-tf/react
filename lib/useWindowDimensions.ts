import { useState, useEffect } from 'react';

// Sidebar 256
// 768

function getWindowDimensions() {
    try {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width: width > 768 ? width - 256 : width,
            height,
        };
    } catch (err) {
        return {
            width: 0,
            height: 0,
        };
    }
}

export default function useWindowDimensions(): {
    width: number;
    height: number;
} {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}
