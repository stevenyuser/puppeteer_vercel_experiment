import express, { Request, Response } from 'express'
import { puppeteerScraper } from './scraper'

const app = express()
const port = process.env.PORT || 8080

app.get('/', (_req: Request, res: Response) => {
    return res.send('Hello world!')
})

app.get('/scrape', async (_req: Request, res: Response) => {
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

app.get('/ping', (_req: Request, res: Response) => {
    return res.send('pong 🏓')
})

app.listen(port, () => {
    return console.log(`Server is listening on ${port}`)
})