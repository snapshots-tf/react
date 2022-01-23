import { motion } from 'framer-motion';
import Logo from '../components/Logo';

const Text = () => {
    return (
        <div className="w-24 h-24">
            <Logo></Logo>

            <motion.div
                animate={{ opacity: 100 }}
                transition={{ duration: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
            >
                <div>
                    <motion.div
                        animate={{
                            rotate: [0, 0, 0, 180, 0, 0, 0],
                            scale: [1, 1, 0.1, 0.4, 0.1, 1, 1],
                        }}
                        transition={{
                            flip: Infinity,
                            duration: 1.8,
                            ease: 'easeInOut',
                        }}
                    >
                        <Logo></Logo>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Text;
