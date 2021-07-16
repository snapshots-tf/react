import { CSSProperties } from 'react';

export function getImageStyles(effect?: string): CSSProperties {
    const ImageStyles: CSSProperties = {
        backgroundImage: 'url("' + effect + '")',
        backgroundSize: '81px 81px',
        backgroundRepeat: 'no-repeat',
    };

    const EmptyStyle: CSSProperties = {};

    return effect ? ImageStyles : EmptyStyle;
}

export function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}
