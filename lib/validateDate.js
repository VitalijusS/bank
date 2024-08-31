export function validateDate(date) {
    let errorMessage = '';
    if (typeof date !== 'string') {
        return errorMessage = "Birthday needs to be a string";
    } else if (date.trim().length <= 0) {
        return errorMessage = "Birthday can't be an empty string";
    }
    const bDay = date.split('-');
    if (bDay[0].length !== 4 || bDay[1].length !== 2 || bDay[2].length !== 2) {
        return errorMessage = "Birthday format needs to be: 'YYYY-MM-DD'";
    }
    bDay[0] = parseInt(bDay[0]) + 18 + '';
    if (isNaN(new Date(date))) {
        return errorMessage = "Birthday format needs to be: 'YYYY-MM-DD'";
    } else if (new Date(bDay) > new Date()) {
        return errorMessage = "Client needs to be 18 or older";
    }
    return errorMessage;
}