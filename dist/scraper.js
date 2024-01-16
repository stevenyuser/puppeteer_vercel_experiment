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
exports.puppeteerScraper = void 0;
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
const chromium_min_1 = __importDefault(require("@sparticuz/chromium-min"));
// code from: https://github.com/stefanjudis/tiny-helpers/blob/primary/api/screenshot.js
function getBrowser() {
    return __awaiter(this, void 0, void 0, function* () {
        return puppeteer_core_1.default.launch({
            args: [...chromium_min_1.default.args, '--hide-scrollbars', '--disable-web-security', "--disable-extensions"],
            defaultViewport: chromium_min_1.default.defaultViewport,
            executablePath: yield chromium_min_1.default.executablePath(`https://github.com/Sparticuz/chromium/releases/download/v116.0.0/chromium-v116.0.0-pack.tar`),
            headless: chromium_min_1.default.headless,
            ignoreHTTPSErrors: true,
        });
    });
}
const puppeteerScraper = () => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield getBrowser();
    const page = yield browser.newPage();
    yield page.goto('https://c2cbus.ipp.cornell.edu/mobile/?a=mobile');
    // Selects travelers
    yield page.select('#ctl00_cph_ddlQty', '1');
    // Selects one way
    yield page.select('#ctl00_cph_ddlTripType', 'One Way');
    // Selects pickup location as Ithaca, North Campus
    yield page.select('#ctl00_cph_ddlDepPickLocation', '7,16');
    // // Selects dropoff location as New York City, Cornell Club
    yield page.waitForSelector('#ctl00_cph_ddlDepDropLocation');
    yield page.select('#ctl00_cph_ddlDepDropLocation', '8,19');
    // Closes popup message if there is one
    try {
        yield page.waitForSelector('#msgClose.btn', { timeout: 1000, visible: true });
        yield page.click('#msgClose.btn');
    }
    catch (e) {
        console.log("No popup");
    }
    // Clicks date picker
    yield page.click('#ctl00_cph_txtDepDate');
    // Selects date (tomorrow for testing)
    // Increases day by one
    yield page.waitForXPath('/html/body/form/div[5]/div[3]/div[4]/div[2]/div[2]/table/tr[4]/td[2]');
    yield page.click('xpath//html/body/form/div[5]/div[3]/div[4]/div[2]/div[2]/table/tr[4]/td[2]');
    // // Selects set button
    yield page.click("xpath//html/body/form/div[5]/div[3]/div[4]/div[2]/div[2]/table/tr[5]/td[3]");
    // Prints out the possible tickets for the date
    const date = new Date();
    date.setDate(date.getDate() + 1);
    console.log(date.toDateString() + ":");
    yield page.waitForSelector('label.radio');
    const elements = yield page.$$('label.radio');
    const tripData = [];
    for (const element of elements) {
        const text = yield element.$eval('span', el => el.textContent);
        tripData.push(text);
    }
    console.log(tripData);
    yield browser.close();
    return tripData;
});
exports.puppeteerScraper = puppeteerScraper;
//# sourceMappingURL=scraper.js.map