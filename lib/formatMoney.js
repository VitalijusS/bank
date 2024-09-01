export function formatMoney(money) {
    money = (money / 100 + '');
    if (money.includes('.')) {
        money = money.split('.');
        money[1] = money[1].padEnd(2, '0');
        return money.join(',') + ' Eur';
    }
    return money + ',00 Eur'
}