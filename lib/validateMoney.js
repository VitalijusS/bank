export function validateMoney(money) {
    if (typeof money !== 'number') {
        return 'Money needs to be a number';
    } else if (!Number.isFinite(money)) {
        return 'Money needs to be a finite';
    } else if (!Number.isInteger(money)) {
        return 'Money needs to be a integer';
    } else if (money < 1) {
        return 'Money can\'t be less than 1';
    }
    return '';
}