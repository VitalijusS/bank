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

const app = express();
const port = 5018;

app.use(express.json({ type: 'application/json' }));
app.use(express.urlencoded({ extended: true }))

app.listen(port, () => {
    console.log(`server is on: http://localhost:${port}`)
})

app.get('/', (req, res) => {
    return res.send(`<a href="/api">API</a>`)
})

app.get('/api', (req, res) => {
    console.log(accounts);
    return res.send(`API`);
})

app.put('/api/account', (req, res) => {
    const data = req.body;
    if (typeof data.firstName !== 'string') {
        return res.send(`Firstname needs to be a string`);
    }
    if (typeof data.lastName !== 'string') {
        return res.send(`Lastname needs to be a string`);
    }
    if (typeof data.birthday !== 'string') {
        return res.send(`Birthday needs to be a string`);
    }
    if (data.firstName.trim().length <= 0) {
        return res.send(`Firstname can't be an empty string`);
    }
    if (data.lastName.trim().length <= 0) {
        return res.send(`Lastname can't be an empty string`);
    }
    if (data.birthday.trim().length <= 0) {
        return res.send(`Birthday can't be an empty string`);
    }
    const bDay = data.birthday.split('-');
    bDay[0] = parseInt(bDay[0]) + 18 + '';
    if (isNaN(new Date(data.birthday))) {
        return res.send(`Birthday format needs to be: "YYYY-MM-DD"`);
    }
    if (new Date(bDay) > new Date()) {
        return res.send(`Client needs to be 18 or older`);

    }

    return res.send(`Success`);
})

app.get('/api/account/:name', (req, res) => {
    const name = req.params.name.toLowerCase().split('-');
    const account = accounts.filter(a => a.firstName.toLowerCase() === name[0] && a.lastName.toLowerCase() === name[1]);
    if (account[0]) {
        return res.send(`${account[0].firstName} ${account[0].lastName} ${account[0].birthday}`)
    }
    return res.send(`No account with that name`)
})

app.delete('/api/account/:name', (req, res) => {
    const name = req.params.name.toLowerCase().split('-');
    let index = -1;
    accounts.map((a, i) => a.firstName.toLowerCase() === name[0] && a.lastName.toLowerCase() === name[1] ? index = i : '');
    if (index === -1) {
        return res.send(`No account with that name`);
    } else if (accounts[index].money === 0) {
        accounts.splice(index, 1);
        return res.send(`Account deleted`);
    } else if (accounts[index].money > 0) {
        return res.send(`Account balance needs to be 0`);
    }
})
app.put('/api/account/:name', (req, res) => {

})//TODO

app.get('/api/account/:name/name', (req, res) => {
    const name = req.params.name.toLowerCase().split('-');
    const account = accounts.filter(a => a.firstName.toLowerCase() === name[0] && a.lastName.toLowerCase() === name[1]);
    if (account[0]) {
        return res.send(`${account[0].firstName}`);
    }
    return res.send(`No account with that name`);
})

app.get('*', (req, res) => {
    console.log('404');
    return res.send(`404`);
})
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
})
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
})