export { express } from 'express';

const app = express();
const port = 5018;

app.listen(port, () => {
    console.log(`server is on: http://localhost:${port}`)
})

app.get('/', (req, res) => {
    return res.send(`<a href="/api"></a>`)
})

app.get('/api', (req, res) => {
    return res.send(`<a href="/api"></a>`)
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