const { Builder } = require('selenium-webdriver');
const LoginPage = require('../WebComponent/LoginPage');
const DashboardPage = require('../WebComponent/DashboardPage');
const CartPage = require('../WebComponent/CartPage');
const assert = require('assert');
const fs = require('fs');

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

const screenshotDir = './Screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
};


describe('TestCase 3 [Login] #Regression #Smoke', function(){
    this.timeout(40000);
    let driver;

    switch (browser.toLowerCase()) {
        case 'edge':
            const edge = require('selenium-webdriver/edge');
            options = new edge.Options();
            options.addArguments('--headless');
            break;
        case 'firefox':
            const firefox = require('selenium-webdriver/firefox');
            options = new firefox.Options();
            options.addArguments('--headless');
            break;
        default:
            const chrome = require('selenium-webdriver/chrome');
            options = new chrome.Options();
            options.addArguments('--headless');
            break;
    }
    
    // Run Setiap mulai test, satu kali saja paling awal
    // before(async function(){
    //     if(browser== 'edge'){
    //         driver = await new Builder().forBrowser(browser).setEdgeOptions(options).build();
    //     } else if (browser == 'firefox') {
    //         driver = await new Builder().forBrowser(browser).setFirefoxOptions(options).build();
    //     } else {
    //         driver = await new Builder().forBrowser(browser).setChromeOptions(options).build()
    //     }
    // });

    before(async function () {
        if (!browser) {
            throw new Error('BROWSER environment variable is not defined.');
        }
        switch (browser.toLowerCase()) {
            case 'edge':
                driver = await new Builder().forBrowser('edge').setEdgeOptions(options).build();
                break;
            case 'firefox':
                driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
                break;
            default:
                driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
                break;
        }
    });
    
    // Test Suite dimulai dengan apa, setiap melakukan tes
    beforeEach(async function(){
        const loginPage = new LoginPage(driver);
        const dashboardPage = new DashboardPage(driver);
        await loginPage.navigate(baseUrl);
        await loginPage.login(username, password);
        await dashboardPage.addProduct();
    });

    // Assertion atau validasi
    it('Product added to cart', async function(){
        const cartPage = new CartPage(driver);
        const carttitle = await cartPage.isOnCart();
        assert.strictEqual(carttitle, 'Your Cart', 'expected cart title to be Your Cart');
    });
    
    
    afterEach(async function(){
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`;
        fs.writeFileSync(filepath, screenshot, 'base64');
    });

    after(async function(){
        await driver.quit();
    });
});