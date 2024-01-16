"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const scraper_1 = require("./scraper");
const app = (0, express_1.default)();
const port = 8080;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.options('*', (0, cors_1.default)());
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ message: "Hello world!!" });
}));
app.get("/scrape", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const c2cData = yield (0, scraper_1.puppeteerScraper)();
        res.status(200).send({
            message: "success",
            data: c2cData,
        });
    }
    catch (err) {
        res.status(500).json({
            error: `ERROR: an error occurred in the /scrapes endpoint: ${err}`,
        });
    }
}));
app.get("/ping", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.send('pong 🏓');
}));
// listening on port
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
//# sourceMappingURL=index.js.map