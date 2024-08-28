import express from 'express';
import { validateInput } from './validateInput.js';
import { getAccountIndex } from './getAccountIndex.js';
import { accounts } from './accounts.js';

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
    if (Object.keys(data).length !== 3) {
        return res.json({
            status: "error",
            message: "Object needs to contain 3 key/value pairs"
        });
    }
    if (typeof data.firstName !== 'string') {
        return res.json({
            status: "error",
            message: "Firstname needs to be a string",
        });
    }
    if (typeof data.lastName !== 'string') {
        return res.json({
            status: "error",
            message: "Lastname needs to be a string",
        });
    }
    if (typeof data.birthday !== 'string') {
        return res.json({
            status: "error",
            message: "Birthday needs to be a string",
        });
    }
    if (data.firstName.trim().length <= 0) {
        return res.json({
            status: "error",
            message: "Firstname can't be an empty string",
        });
    }
    if (data.lastName.trim().length <= 0) {
        return res.json({
            status: "error",
            message: "Lastname can't be an empty string",
        });
    }
    if (data.birthday.trim().length <= 0) {
        return res.json({
            status: "error",
            message: "Birthday can't be an empty string",
        });
    }
    const bDay = data.birthday.split('-');
    bDay[0] = parseInt(bDay[0]) + 18 + '';
    if (isNaN(new Date(data.birthday))) {
        return res.json({
            status: "error",
            message: "Birthday format needs to be: 'YYYY-MM-DD'",
        });
    }
    if (new Date(bDay) > new Date()) {
        return res.json({
            status: "error",
            message: "Client needs to be 18 or older",
        });
    }
    const index = getAccountIndex(data.firstName + '-' + data.lastName)
    if (index !== -1) {
        return res.json({
            status: "error",
            message: "Account with that name already exist",
        });
    }
    accounts.push({
        firstName: data.firstName,
        lastName: data.lastName,
        birthday: data.birthday,
        money: 0,
    })
    return res.json({ status: "Success", message: "New account added" });
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