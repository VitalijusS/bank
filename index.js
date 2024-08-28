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

app.listen(port, () => {
    console.log(`server is on: http://localhost:${port}`)
})

app.get('/', (req, res) => {
    return res.send(`<a href="/api">API</a>`)
})

app.get('/api', (req, res) => {
    return res.send(`<a href="/api/account">Accounts</a>`)
})

app.post('/api', (req, res) => {


    return res.send(`Success`)
})

app.get('*', (req, res) => {
    console.log('404');
    return res.send(`404`)
})
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
})
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})