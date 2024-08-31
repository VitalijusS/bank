export function validateLastName(name) {
    let errorMessage = '';

    const nameMinSize = 2;
    const nameMaxSize = 20;
    const allowedAbcName = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    if (typeof name !== 'string') {
        errorMessage = 'Not a name';
    } else if (name.trim().length < nameMinSize) {
        errorMessage = 'Last name is too short';
    } else if (name.length > nameMaxSize) {
        errorMessage = 'Last name is too long';
    } else if (!nameContainsOnlyAlowedSymbols(name, allowedAbcName)) {
        errorMessage = `not allowed symbol in the last name ${firstNonAllowedSymbol(name, allowedAbcName)}`
    } else if (name[0].toUpperCase() !== name[0]) {
        errorMessage = 'Last name needs to start with upper case letter';
    }
    return errorMessage;
}

export function nameContainsOnlyAlowedSymbols(str, abc) {
    return str.split('').map(s => abc.includes(s)).every(x => x === true);
}

export function firstNonAllowedSymbol(str, abc) {
    return str.split('').filter(s => !abc.includes(s))[0] ?? '';
}