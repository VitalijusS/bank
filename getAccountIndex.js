import { accounts } from "./accounts.js";

export function getAccountIndex(fullName) {
    const name = fullName.toLowerCase().split('-');
    if (name.length !== 2) {
        return -1;
    }
    let index = -1;
    accounts.map((a, i) => a.firstName.toLowerCase() === name[0] && a.lastName.toLowerCase() === name[1] ? index = i : '');
    return index;
}