import { getAccountIndex } from "./getAccountIndex.js";

export function validateInput(data) {
    console.log(data)
    if (typeof data !== 'object') {
        return [-1, {
            status: "error",
            message: "Type of data needs to be object"
        }];
    }
    if (Object.keys(data).length !== 3) {
        return [-1, {
            status: "error",
            message: "Object needs to contain 3 key/value pairs"
        }];
    }
    if (typeof data.firstName !== 'string') {
        return [-1, {
            status: "error",
            message: "Firstname needs to be a string",
        }];
    }
    if (typeof data.lastName !== 'string') {
        return [-1, {
            status: "error",
            message: "Lastname needs to be a string",
        }];
    }
    if (typeof data.birthday !== 'string') {
        return [-1, {
            status: "error",
            message: "Birthday needs to be a string",
        }];
    }
    if (data.firstName.trim().length <= 0) {
        return [-1, {
            status: "error",
            message: "Firstname can't be an empty string",
        }];
    }
    if (data.lastName.trim().length <= 0) {
        return [-1, {
            status: "error",
            message: "Lastname can't be an empty string",
        }];
    }
    if (data.birthday.trim().length <= 0) {
        return [-1, {
            status: "error",
            message: "Birthday can't be an empty string",
        }];
    }
    const bDay = data.birthday.split('-');
    bDay[0] = parseInt(bDay[0]) + 18 + '';
    if (isNaN(new Date(data.birthday))) {
        return [-1, {
            status: "error",
            message: "Birthday format needs to be: 'YYYY-MM-DD'",
        }];
    }
    if (new Date(bDay) > new Date()) {
        return [-1, {
            status: "error",
            message: "Client needs to be 18 or older",
        }];
    }
    const index = getAccountIndex(data.firstName + '-' + data.lastName)
    if (index !== -1) {
        return [-1, {
            status: "error",
            message: "Account with that name already exist",
        }];
    }
    return [1, '']
}