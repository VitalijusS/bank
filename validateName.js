export function validateName(data) {
    if (typeof data !== 'object') {
        return [false, {
            status: "error",
            message: "Type of data needs to be object"
        }];
    }
    if (Object.keys(data).length !== 1) {
        return [false, {
            status: "error",
            message: "Object needs to contain 3 key/value pairs"
        }];
    }
    if (typeof data.firstName !== 'string') {
        return [false, {
            status: "error",
            message: "Name needs to be a string",
        }];
    }
    if (data.firstName.trim().length <= 0) {
        return [false, {
            status: "error",
            message: "Name can't be an empty string",
        }];
    }
    return [true, 'passed']
}