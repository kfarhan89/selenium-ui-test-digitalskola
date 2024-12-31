const { Builder } = require('selenium-webdriver');
const LoginPage = require('../WebComponent/LoginPage');
const DashboardPage = require('../WebComponent/DashboardPage');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config();

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;


const screenshotDir = './Screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
};


describe('TestCase 2 [Login] #Smoke', function(){
    this.timeout(40000);
    let driver;

    switch (browser.toLowerCase()) {
        case 'edge':
            const edge = require('selenium-webdriver/edge');
            options = new edge.Options();
            options.addArguments('--headless');
        case 'firefox':
            const firefox = require('selenium-webdriver/firefox');
            options = new firefox.Options();
            options.addArguments('--headless');
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
        await loginPage.navigate(baseUrl);
        await loginPage.login('haha', 'hihi');
    });

    // Assertion atau validasi
    it('Error message appears for invalid credentials', async function(){
        const dashboardPage = new LoginPage(driver);
        const title = await dashboardPage.getErrorMessage();
        assert.strictEqual(title, 'Epic sadface: Username and password do not match any user in this service', 'Expected error message does not match');
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