const{ Builder, By, Key, until} = require('selenium-webdriver');
const assert = require('assert');

async function sauceDemoLoginTest() {
    // Membuat koneksi dengan Browser Driver
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Buka URL di browser
        await  driver.get("https://www.saucedemo.com");

        // Masukkan Username dan Password
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.xpath("//input[@id='password']")).sendKeys('secret_sauce');
        
        // Click Button Login
        await driver.findElement(By.xpath("//input[@id='login-button']")).click();

        // Memastikan kita di dashboard dengan mencari Judul "Swag Labs"
        let titleText = await driver.findElement(By.xpath("//div[@class='app_logo']")).getText();
        assert.strictEqual(titleText.includes('Swag Labs'), true, "Title does not include 'Swag Labs'");
        
        // Memastikan kita di dashboard dengan mencari "Burger Button"
        let menuButton = await driver.findElement(By.xpath("//button[@id='react-burger-menu-btn']"));
        assert.strictEqual(await menuButton.isDisplayed(), true, 'Menu button is not visible');

        // Tambahkan product ke cart
        await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']")).click();

        // Memastikan product masuk ke cart
        let carticon = await driver.findElement(By.xpath("//span[@class='shopping_cart_badge']")).getText();
        assert.strictEqual(await carticon.includes('1'), true, "Cart icon is not visible");

        // Memastikan kembali bahwa product masuk ke cart
        await driver.findElement(By.css(".shopping_cart_link")).click();
        let productname = await driver.findElement(By.css(".inventory_item_name")).getText();
        assert.strictEqual(productname.includes('Sauce Labs Backpack'), true, "Title does not include 'Sauce Labs Backpack'");

    } finally {
        // Tutup Browser
        await driver.quit();
    }
}

sauceDemoLoginTest();