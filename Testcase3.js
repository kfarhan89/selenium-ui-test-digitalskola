const { Builder } = require('selenium-webdriver');
const LoginPage = require('./WebComponent/LoginPage');
const DashboardPage = require('./WebComponent/DashboardPage');
const CartPage = require('./WebComponent/CartPage');
const assert = require('assert');
const fs = require('fs');

const screenshotDir = './Screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
};


describe('TestCase 3', function(){
    this.timeout(40000);
    let driver;
    
    // Run Setiap mulai test, satu kali saja paling awal
    before(async function(){
        driver = await new Builder().forBrowser('chrome').build();
    });
    
    // Test Suite dimulai dengan apa, setiap melakukan tes
    beforeEach(async function(){
        const loginPage = new LoginPage(driver);
        const dashboardPage = new DashboardPage(driver);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
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