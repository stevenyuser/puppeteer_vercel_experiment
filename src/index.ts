import express, { Express } from "express"
import cors from "cors"

import { puppeteerScraper } from './scraper'

const app: Express = express()
const port = 8080

app.use(express.json())
app.use(cors())
app.options('*', cors());

app.get("/", async (req, res) => {
    res.status(200).json({ message: "Hello world!!!" })
})

app.get("/scrape", async (req, res) => {
    try {
        const c2cData = await puppeteerScraper();

        res.status(200).send({
            message: "success",
            data: c2cData,
        });
    } catch (err) {
        res.status(500).json({
            error: `ERROR: an error occurred in the /scrapes endpoint: ${err}`,
        });
    }
})

app.get("/ping", async (req, res) => {
    return res.send('pong 🏓')
})

// listening on port
app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})