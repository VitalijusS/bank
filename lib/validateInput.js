import { getAccountIndex } from "./getAccountIndex.js";
import { validateDate } from "./validateDate.js";
import { validateLastName } from "./validateLastName.js";
import { validateName } from "./validateName.js";

export function validateInput(data) {
    let errorMessage = '';
    if (typeof data !== 'object' || Array.isArray(data) || data === null) {
        errorMessage = "Type of data needs to be object";
    } else if (Object.keys(data).length !== 3) {
        errorMessage = "Object needs to contain 3 key/value pairs";
    }
    const validateFN = validateName(data.firstName);
    const validateLN = validateLastName(data.lastName);
    const validateBD = validateDate(data.birthday);
    if (validateFN) {
        errorMessage = validateFN;
    } else if (validateLN) {
        errorMessage = validateLN;
    } else if (validateBD) {
        errorMessage = validateBD;
    } else if (getAccountIndex((data.firstName + '-' + data.lastName)) !== -1) {
        errorMessage = "Account with that name already exist";
    }
    return errorMessage
}