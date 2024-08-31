export function validateName(name) {
    let errorMessage = '';

    const nameMinSize = 2;
    const nameMaxSize = 20;
    const allowedAbcName = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    if (typeof name !== 'string') {
        errorMessage = 'Not a name'
    } else if (name.trim().length < nameMinSize) {
        errorMessage = 'First name is too short'
    } else if (name.length > nameMaxSize) {
        errorMessage = 'first name is too long'
    } else if (!nameContainsOnlyAlowedSymbols(name, allowedAbcName)) {
        errorMessage = `not allowed symbol in the first name ${firstNonAllowedSymbol(name, allowedAbcName)}`
    } else if (name[0].toUpperCase() !== name[0]) {
        errorMessage = 'First name needs to start with upper case letter'
    }
    return errorMessage;
}

export function nameContainsOnlyAlowedSymbols(str, abc) {
    return str.split('').map(s => abc.includes(s)).every(x => x === true);
}

export function firstNonAllowedSymbol(str, abc) {
    return str.split('').filter(s => !abc.includes(s))[0] ?? '';
}