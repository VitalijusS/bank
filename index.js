import express from 'express';
import { validateInput } from './lib/validateInput.js';
import { getAccountIndex } from './lib/getAccountIndex.js';
import { accounts } from './data/accounts.js';
import { validateName } from './lib/validateName.js';
import { validateLastName } from './lib/validateName copy.js';
import { validateDate } from './lib/validateDate.js';
import { validateMoney } from './lib/validateMoney.js';

const app = express();
const port = 5018;

app.use(express.json({ type: 'application/json' }));
app.use(express.urlencoded({ extended: true }))

app.listen(port, () => {
    console.log(`server is on: http://localhost:${port}`)
})

app.get('/', (req, res) => {
    console.log(accounts);
    return res.json(accounts.map(item => item))
})

app.post('/api/account', (req, res) => {
    const data = req.body;
    const validate = validateInput(data)
    if (validate) {
        return res.json({ status: "Error", message: validate });
    }
    accounts.push({
        firstName: data.firstName,
        lastName: data.lastName,
        birthday: data.birthday,
        money: 0,
    })
    return res.json({ status: "Success", message: "New account created" });
})

app.get('/api/account/:name', (req, res) => {
    const index = getAccountIndex(req.params.name)
    if (index !== -1) {
        return res.json(`${accounts[index].firstName} ${accounts[index].lastName} ${accounts[index].birthday}`)
    }
    return res.json({ status: "error", message: "No account with that name" })
})

app.delete('/api/account/:name', (req, res) => {
    const index = getAccountIndex(req.params.name)
    if (index === -1) {
        return res.json({ status: "error", message: "No account with that name" });
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
        return res.json({ status: "error", message: "No account with that name" });
    } else if (index2 !== -1) {
        return res.json({ status: "error", message: "Account with new name already exist" });
    } else {
        const validate = validateInput(req.body)
        if (validate[0] === -1) {
            res.json(validate[1])
        };
        const newData = { ...req.body, money: accounts[index].money }
        const old = accounts[index];
        accounts[index] = newData;
        return res.json({ oldData: old, newData: newData });
    }
})

app.get('/api/account/:name/name', (req, res) => {
    const index = getAccountIndex(req.params.name)
    if (index !== -1) {
        return res.json(`${accounts[index].firstName}`);
    }
    return res.json({ status: "error", message: "No account with that name" });
})

app.put('/api/account/:name/name', (req, res) => {
    const index = getAccountIndex(req.params.name)
    if (index === -1) {
        return res.json({ status: "error", message: "No account with that name" });
    }
    const validate = validateName(req.body.firstName)
    if (validate) {
        return res.json({ status: "error", message: validate });
    }
    accounts[index].firstName = req.body.firstName;
    return res.json({ status: "success", message: "First name updated" });

})

app.get('/api/account/:name/surname', (req, res) => {
    const index = getAccountIndex(req.params.name)
    if (index !== -1) {
        return res.json(`${accounts[index].lastName}`);
    }
    return res.json({ status: "error", message: "No account with that name" });
})

app.put('/api/account/:name/surname', (req, res) => {
    const index = getAccountIndex(req.params.name)
    if (index === -1) {
        return res.json({ status: "error", message: "No account with that name" });
    }
    const validate = validateLastName(req.body.lastName)
    if (validate) {
        return res.json({ status: "error", message: validate });
    }
    accounts[index].lastName = req.body.lastName;
    return res.json({ status: "success", message: "Last name updated" });

})

app.get('/api/account/:name/dob', (req, res) => {
    const index = getAccountIndex(req.params.name)
    if (index !== -1) {
        return res.json(`${accounts[index].birthday}`);
    }
    return res.json({ status: "error", message: "No account with that name" });
})

app.put('/api/account/:name/dob', (req, res) => {
    const index = getAccountIndex(req.params.name)
    if (index === -1) {
        return res.json({ status: "error", message: "No account with that name" });
    }
    const validate = validateDate(req.body.birthday)
    if (validate) {
        return res.json({ status: "error", message: validate });
    }
    accounts[index].birthday = req.body.birthday;
    return res.json({ status: "success", message: "Birthday date updated" });

})
app.post('/api/withdrawal', (req, res) => {
    let validateFN = validateName(req.body.firstName)
    let validateLN = validateLastName(req.body.lastName)
    let validateM = validateMoney(req.body.money)
    if (validateFN) {
        return res.json({ status: "error", message: validateFN });
    } else if (validateLN) {
        return res.json({ status: "error", message: validateLN });
    } else if (validateM) {
        return res.json({ status: "error", message: validateM });
    }

    const index = getAccountIndex(req.body.firstName + '-' + req.body.lastName)
    if (index === -1) {
        return res.json({ status: "error", message: "No account with that name" });
    }
    if (accounts[index].money < req.body.money) {
        return res.json({ status: "error", message: "Not enough money in the bank account" });
    }
    accounts[index].money -= req.body.money;
    return res.json({ status: "Success", message: `${req.body.money / 100}€ is withdrawn` });
})

app.post('/api/deposit', (req, res) => {
    let validateFN = validateName(req.body.firstName)
    let validateLN = validateLastName(req.body.lastName)
    let validateM = validateMoney(req.body.money)
    if (validateFN) {
        return res.json({ status: "error", message: validateFN });
    } else if (validateLN) {
        return res.json({ status: "error", message: validateLN });
    } else if (validateM) {
        return res.json({ status: "error", message: validateM });
    }

    const index = getAccountIndex(req.body.firstName + '-' + req.body.lastName)
    if (index === -1) {
        return res.json({ status: "error", message: "No account with that name" });
    }

    accounts[index].money += req.body.money;
    return res.json({ status: "Success", message: `${req.body.money / 100}€ is deposited` });
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