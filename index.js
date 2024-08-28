import express from 'express';
const accounts = [
    {
        firstName: 'Jonas',
        lastName: 'Jonaitis',
        birthday: '1900-01-01',
        money: 100000,
    },
    {
        firstName: 'Ona',
        lastName: 'Onaite',
        birthday: '1912-12-12',
        money: 0,
    },
]
function getAccountIndex(fullName) {
    const name = fullName.toLowerCase().split('-');
    if (name.length !== 2) {
        return -1;
    }
    let index = -1;
    accounts.map((a, i) => a.firstName.toLowerCase() === name[0] && a.lastName.toLowerCase() === name[1] ? index = i : '');
    return index;
}

const app = express();
const port = 5018;

app.use(express.json({ type: 'application/json' }));
app.use(express.urlencoded({ extended: true }))

app.listen(port, () => {
    console.log(`server is on: http://localhost:${port}`)
})

app.get('/', (req, res) => {
    console.log(accounts);
    return res.send(`API`)
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
            message: "Account with that name already exis",
        });
    }
    accounts.push({
        firstName: data.firstName,
        lastName: data.lastName,
        birthday: data.birthday,
        money: 0,
    })
    console.log(accounts);

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
    const index = getAccountIndex('?????');
    if (index !== -1) {
        return res.json({
            message: "Account with that name already exis",
            status: "error"
        });
    }
    if (index !== -1) {
        const old = accounts[index];

        return res.json({ oldData: old, newData: 'new' });
    }
    return res.json({ status: "error", message: "No account with that name" });
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