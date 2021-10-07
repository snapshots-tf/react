import { motion } from 'framer-motion';
import { FC } from 'react';

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
                    style={{
                        height: '50px',
                        background: '#5866D7',
                        width: '50px',
                        borderRadius: '2% 50%',
                    }}
                    animate={{
                        rotate: 360,
                        borderRadius: ['50% 50%', '10% 10%'],
                    }}
                    transition={{
                        flip: Infinity,
                        duration: 1,
                        ease: 'easeInOut',
                    }}
                ></motion.div>
            </div>
        </motion.div>
    );
};

export default FullpageLoader;
