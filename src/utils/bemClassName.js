export const bemClassNameGenerator = (blockName) => {
    if (!blockName || (typeof blockName !== 'string')) {
        throw new Error('blockName must be a string');
    }

    return (elemName = '', modifiers = []) => {
        if (Array.isArray(elemName)) {
            modifiers = elemName;
            elemName = '';
        }

        const baseClass = (elemName === '') ? blockName : `${blockName}__${elemName}`;
        const classes = [baseClass].concat(modifiers.map((modifier) => `${baseClass}--${modifier}`));

        return classes.join(' ');
    }
};