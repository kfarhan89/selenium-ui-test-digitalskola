const { Builder } = require('selenium-webdriver');
const LoginPage = require('../WebComponent/LoginPage');
const CartPage = require('../WebComponent/CartPage');
const CheckoutPage = require('../WebComponent/CheckoutPage');
const CheckoutFormPage = require('../WebComponent/CheckoutFormPage');
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


describe('TestCase 5 [Login] #Regression #Smoke', function(){
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
    before(async function(){
        if(browser== 'edge'){
            driver = await new Builder().forBrowser(browser).setEdgeOptions(options).build();
        } else if (browser == 'firefox') {
            driver = await new Builder().forBrowser(browser).setFirefoxOptions(options).build();
        } else {
            driver = await new Builder().forBrowser(browser).setChromeOptions(options).build()
        }
    });
    
    // Test Suite dimulai dengan apa, setiap melakukan tes
    beforeEach(async function(){
        const loginPage = new LoginPage(driver);
        const checkoutPage = new CheckoutPage(driver);
        const cartPage = new CartPage(driver);
        await loginPage.navigate(baseUrl);
        await loginPage.login(username, password);
        await cartPage.navigatetoCartPage();
        await cartPage.checkout();
        await checkoutPage.checkoutInfo('Farhan', 'Hadiansyah', '40551');
    });

    // Assertion atau validasi
    it('Continue Checkout, Fill The Filed Input and Verify CheckoutPage Step 2', async function(){
        const checkoutFormPage = new CheckoutFormPage(driver);
        const checkouttitle = await checkoutFormPage.isOnCheckoutPageStep2();
        assert.strictEqual(checkouttitle, 'Checkout: Overview', 'expected cart title to be Checkout: Overview');
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