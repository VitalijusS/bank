import express from 'express';
import { validateInput } from './lib/validateInput.js';
import { getAccountIndex } from './lib/getAccountIndex.js';
import { accounts } from './data/accounts.js';
import { validateName } from './lib/validateName.js';
import { validateLastName } from './lib/validateLastName.js';
import { validateDate } from './lib/validateDate.js';
import { validateMoney } from './lib/validateMoney.js';
import { formatMoney } from './lib/formatMoney.js';

const app = express();
const port = 5018;

app.use(express.json({ type: 'application/json' }));
app.use(express.urlencoded({ extended: true }))

app.listen(port, () => {
    console.log(`server is on: http://localhost:${port}`)
})

app.get('/', (req, res) => {
    console.log(accounts);
    return res.json(accounts.map(item => item));
})

app.post('/api/account', (req, res) => {
    const data = req.body;
    const validate = validateInput(data);
    if (validate) {
        return res.json({ status: "Error", message: validate });
    }
    accounts.push({
        firstName: data.firstName,
        lastName: data.lastName,
        birthday: data.birthday,
        money: 0,
    })
    return res.json({ status: "Success", message: `${data.firstName} ${data.lastName} account created` });
})

app.get('/api/account/:name', (req, res) => {
    const index = getAccountIndex(req.params.name);
    if (index !== -1) {
        return res.json({ status: "Success", message: `${accounts[index].firstName} ${accounts[index].lastName} ${accounts[index].birthday}` });
    }
    return res.json({ status: "error", message: `No account with a name: ${req.params.name}` });
})

app.delete('/api/account/:name', (req, res) => {
    const index = getAccountIndex(req.params.name);
    if (index === -1) {
        return res.json({ status: "error", message: `No account with a name: ${req.params.name}` });
    } else if (accounts[index].money === 0) {
        accounts.splice(index, 1);
        return res.json({ status: "success", message: "Account deleted" });
    } else if (accounts[index].money > 0) {
        return res.json({ status: "error", message: "Account balance needs to be 0" })
    }
})

app.put('/api/account/:name', (req, res) => {
    const index = getAccountIndex(req.params.name);
    const index2 = getAccountIndex(req.body.firstName + '-' + req.body.lastName);
    if (index === -1) {
        return res.json({ status: "error", message: `No account with a name: ${req.params.name}` });
    } else if (index2 !== -1) {
        return res.json({ status: "error", message: "Account with new name already exist" });
    } else {
        const validate = validateInput(req.body)
        if (validate[0] === -1) {
            res.json(validate[1]);
        };
        const newData = { ...req.body, money: accounts[index].money }
        const old = accounts[index];
        accounts[index] = newData;
        return res.json({ status: "success", oldData: old, newData: newData });
    }
})

app.get('/api/account/:name/name', (req, res) => {
    const index = getAccountIndex(req.params.name);
    if (index !== -1) {
        return res.json({ status: "success", message: `${accounts[index].firstName}` });
    }
    return res.json({ status: "error", message: `No account with a name: ${req.params.name}` });
})

app.put('/api/account/:name/name', (req, res) => {
    const index = getAccountIndex(req.params.name);
    if (index === -1) {
        return res.json({ status: "error", message: `No account with a name: ${req.params.name}` });
    }
    const validate = validateName(req.body.firstName);
    if (validate) {
        return res.json({ status: "error", message: validate });
    }
    accounts[index].firstName = req.body.firstName;
    return res.json({ status: "success", message: `First name updated to: ${req.body.firstName}` });

})

app.get('/api/account/:name/surname', (req, res) => {
    const index = getAccountIndex(req.params.name);
    if (index !== -1) {
        return res.json({ status: "success", message: `${accounts[index].lastName}` });
    }
    return res.json({ status: "error", message: `No account with a name: ${req.params.name}` });
})

app.put('/api/account/:name/surname', (req, res) => {
    const index = getAccountIndex(req.params.name)
    if (index === -1) {
        return res.json({ status: "error", message: `No account with a name: ${req.params.name}` });
    }
    const validate = validateLastName(req.body.lastName);
    if (validate) {
        return res.json({ status: "error", message: validate });
    }
    accounts[index].lastName = req.body.lastName;
    return res.json({ status: "success", message: `Last name updated to: ${req.body.lastName}` });

})

app.get('/api/account/:name/dob', (req, res) => {
    const index = getAccountIndex(req.params.name);
    if (index !== -1) {
        return res.json({ status: "success", message: `${accounts[index].birthday}` });
    }
    return res.json({ status: "error", message: `No account with a name: ${req.params.name}` });
})

app.put('/api/account/:name/dob', (req, res) => {
    const index = getAccountIndex(req.params.name);
    if (index === -1) {
        return res.json({ status: "error", message: `No account with a name: ${req.params.name}` });
    }
    const validate = validateDate(req.body.birthday);
    if (validate) {
        return res.json({ status: "error", message: validate });
    }
    accounts[index].birthday = req.body.birthday;
    return res.json({ status: "success", message: `Birthday date updated to: ${req.body.birthday}` });

})

app.post('/api/withdrawal', (req, res) => {
    let validateFN = validateName(req.body.firstName);
    let validateLN = validateLastName(req.body.lastName);
    let validateM = validateMoney(req.body.money);
    if (validateFN) {
        return res.json({ status: "error", message: validateFN });
    } else if (validateLN) {
        return res.json({ status: "error", message: validateLN });
    } else if (validateM) {
        return res.json({ status: "error", message: validateM });
    }

    const index = getAccountIndex(req.body.firstName + '-' + req.body.lastName)
    if (index === -1) {
        return res.json({ status: "error", message: `No account with a name: ${req.body.firstName} ${req.body.lastName}` });
    }
    if (accounts[index].money < req.body.money) {
        return res.json({ status: "error", message: "Not enough money in the bank account" });
    }

    accounts[index].money -= req.body.money;
    return res.json({ status: "Success", message: `${formatMoney(req.body.money)} is withdrawn from ${accounts[index].firstName} ${accounts[index].lastName} account` });
})

app.post('/api/deposit', (req, res) => {
    let validateFN = validateName(req.body.firstName);
    let validateLN = validateLastName(req.body.lastName);
    let validateM = validateMoney(req.body.money);
    if (validateFN) {
        return res.json({ status: "error", message: validateFN });
    } else if (validateLN) {
        return res.json({ status: "error", message: validateLN });
    } else if (validateM) {
        return res.json({ status: "error", message: validateM });
    }

    const index = getAccountIndex(req.body.firstName + '-' + req.body.lastName);
    if (index === -1) {
        return res.json({ status: "error", message: `No account with a name: ${req.body.firstName} ${req.body.lastName}` });
    }

    accounts[index].money += req.body.money;
    return res.json({ status: "Success", message: `${formatMoney(req.body.money)} is deposited to ${accounts[index].firstName} ${accounts[index].lastName} account` });
})
app.post('/api/transfer', (req, res) => {
    let validateSendingFN = validateName(req.body.firstNameSending);
    let validateReceivingFN = validateName(req.body.firstNameReceiving);
    let validateSendingLN = validateLastName(req.body.lastNameSending);
    let validateReceivingLN = validateLastName(req.body.lastNameReceiving);
    let validateM = validateMoney(req.body.money);
    if (validateSendingFN) {
        return res.json({ status: "error", message: validateSendingFN });
    } else if (validateSendingLN) {
        return res.json({ status: "error", message: validateSendingLN });
    } else if (validateReceivingFN) {
        return res.json({ status: "error", message: validateReceivingFN });
    } else if (validateReceivingLN) {
        return res.json({ status: "error", message: validateReceivingLN });
    } else if (validateM) {
        return res.json({ status: "error", message: validateM });
    }
    if (req.body.firstNameSending + '-' + req.body.lastNameSending === req.body.firstNameReceiving + '-' + req.body.lastNameReceiving) {
        return res.json({ status: "error", message: "Can't transfer money to yourself" });
    }

    const index = getAccountIndex(req.body.firstNameSending + '-' + req.body.lastNameSending);
    if (index === -1) {
        return res.json({ status: "error", message: `No account with a name: ${req.body.firstNameSending} ${req.body.lastNameSending}` });
    }
    const index2 = getAccountIndex(req.body.firstNameReceiving + '-' + req.body.lastNameReceiving);
    if (index2 === -1) {
        return res.json({ status: "error", message: `No account with a name: ${req.body.firstNameReceiving} ${req.body.lastNameReceiving}` });
    }
    if (accounts[index].money < req.body.money) {
        return res.json({ status: "error", message: "Not enough money in the bank account" });
    }

    accounts[index].money -= req.body.money;
    accounts[index2].money += req.body.money;
    return res.json({ status: "Success", message: `${formatMoney(req.body.money)} is transfered from ${accounts[index].firstName} ${accounts[index].lastName} account to ${accounts[index2].firstName} ${accounts[index2].lastName} account` });
})

app.get('*', (req, res) => {
    console.log('404');
    return res.json({ status: 'error', message: "404 page not found" });
})
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
})
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
})