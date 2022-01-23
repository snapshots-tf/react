import { motion } from 'framer-motion';
import { FC } from 'react';
import Logo from './Logo';

const FullpageLoader: FC = () => {
    return (
        <motion.div
            className="w-full fixed h-full bg-gray-800 text-white z-50 grid place-items-center"
            animate={{ opacity: 100 }}
            transition={{ duration: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
        >
            <div>
                <motion.div
                    animate={{
                        rotate: [90, -90, 90, -90, 90, -90, 90, -90],
                        scale: [1, 1, 0.6, 0.8, 0.6, 1, 1],
                    }}
                    transition={{
                        flip: Infinity,
                        duration: 1.8,
                        ease: 'easeInOut',
                    }}
                >
                    <div className="w-16 h-16">
                        <Logo></Logo>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default FullpageLoader;
