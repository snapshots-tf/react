import { motion } from 'framer-motion';
import Image from 'next/image';
import { FunctionComponent } from 'react';
import { classNames, getImageStyles } from '../lib/helpers';

const ItemComponent: FunctionComponent<{
    image: { large: string; effect?: string };
    quality?: number;
}> = ({ image, quality }) => {
    return (
        <div
            className={classNames('item', quality ? 'Quality' + quality : '')}
            style={getImageStyles(image.effect)}
        >
            <motion.div
                whileHover={{
                    scale: 1.25,
                }}
                transition={{ type: 'spring', stiffness: 1000 }}
            >
                <Image src={image.large} width="70" height="70" alt="" />
            </motion.div>
        </div>
    );
};

export default ItemComponent;
